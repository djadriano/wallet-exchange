/* eslint-disable compat/compat */
import React, { PureComponent, createContext } from 'react';
import PropTypes from 'prop-types';

const CurrencyContext = createContext();

class CurrencyProvider extends PureComponent {
  constructor(props) {
    super(props);

    this.pollEndpointInterval = null;
  }

  // --------------------------------------------------------------

  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
  };

  // --------------------------------------------------------------

  state = {
    currencies: [
      {
        name: 'EUR',
        symbol: '€',
        value: 0,
        wallet: 116.33
      },
      {
        name: 'GBP',
        symbol: '£',
        value: 0,
        wallet: 58.33
      },
      {
        name: 'USD',
        symbol: '$',
        value: 0,
        wallet: 25.5
      },
      {
        name: 'BRL',
        symbol: 'R$',
        value: 0,
        wallet: 1
      }
    ],
    exchangeFromCompareValue: '',
    currenciesSelected: ['GBP', 'USD']
  };

  // --------------------------------------------------------------

  async componentDidMount() {
    await this.setCurrencyValues();
    this.initPollEndpointInterval();
  }

  // --------------------------------------------------------------

  componentWillUnmount() {
    clearInterval(this.pollEndpointInterval);
  }

  // --------------------------------------------------------------

  initPollEndpointInterval = () => {
    if (!this.pollEndpointInterval) setInterval(this.setCurrencyValues, 10000);
  };

  // --------------------------------------------------------------

  getExchangeData = (index = 0) => {
    const { currencies, currenciesSelected } = this.state;

    return currencies.find(item => item.name == currenciesSelected[index]);
  };

  // --------------------------------------------------------------

  getCurrencyIndex = name => {
    const { currencies } = this.state;

    return currencies.findIndex(item => item.name == name);
  };

  // --------------------------------------------------------------

  setExchangeFromCompareValue = valueOfBaseField => {
    this.setState({
      exchangeFromCompareValue: valueOfBaseField
    });
  };

  // --------------------------------------------------------------

  setCurrenciesSelected = (index = 0, currency = 'USD') => {
    const { currenciesSelected } = this.state;

    this.setState(
      {
        currenciesSelected: Object.assign([...currenciesSelected], { [index]: currency })
      },
      index == 0 ? this.setCurrencyValues : null
    );
  };

  // --------------------------------------------------------------

  async fetchExchangeRates() {
    const { currencies, currenciesSelected } = this.state;
    const fetchBase = currenciesSelected[0];
    const fetchSymbols = currencies
      .filter(item => item.name != fetchBase)
      .map(item => item.name)
      .join(',');

    try {
      return await (await fetch(
        `https://api.exchangeratesapi.io/latest?base=${fetchBase}&symbols=${fetchSymbols}`
      )).json();
    } catch (error) {
      console.log(error);
    }
  }

  // --------------------------------------------------------------

  setCurrencyValues = async () => {
    const { currencies } = this.state;
    const fetchResponse = await this.fetchExchangeRates();
    let currenciesCopy = [...currencies];

    return new Promise((resolve, reject) => {
      if (fetchResponse.rates) {
        currenciesCopy.map(item => {
          item.value = fetchResponse.rates[item.name] || 1;
        });

        this.setState(
          {
            currencies: currenciesCopy
          },
          resolve
        );
      } else {
        reject();
      }
    });
  };

  // --------------------------------------------------------------

  render() {
    const { children } = this.props;
    const { currencies, currenciesSelected, exchangeFromCompareValue } = this.state;

    return (
      <CurrencyContext.Provider
        value={{
          currencies: currencies,
          currenciesSelected: currenciesSelected,
          exchangeFromCompareValue: exchangeFromCompareValue,
          getExchangeData: this.getExchangeData,
          setExchangeFromCompareValue: this.setExchangeFromCompareValue,
          setCurrencyValues: this.setCurrencyValues,
          setCurrenciesSelected: this.setCurrenciesSelected,
          getCurrencyIndex: this.getCurrencyIndex
        }}
      >
        {children}
      </CurrencyContext.Provider>
    );
  }
}

export { CurrencyContext, CurrencyProvider };
