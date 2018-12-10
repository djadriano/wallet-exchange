import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { CurrencyContext } from 'js/contexts/Currency';

class SliderItem extends Component {
  constructor(props) {
    super(props);
  }

  // --------------------------------------------------------------

  static propTypes = {
    data: PropTypes.object.isRequired,
    slideType: PropTypes.oneOf(['from', 'to']).isRequired
  };

  // --------------------------------------------------------------

  static contextType = CurrencyContext;

  // --------------------------------------------------------------

  setFieldValue = value => {
    const { setExchangeFromCompareValue } = this.context;
    let valueFixedAcceptNumbers = value.replace(/[a-zA-Z!@#$%&*()_|+'=?;:",.<>\{\}\[\]\\\/]/gi, '');

    if (valueFixedAcceptNumbers.length == 1) {
      // Insert hifen in beginning of string
      valueFixedAcceptNumbers =
        valueFixedAcceptNumbers != '-'
          ? `${valueFixedAcceptNumbers.slice(0, 0)}-${valueFixedAcceptNumbers.slice(0)}`
          : '';
    }

    // Set the value of the field in Currency Context
    setExchangeFromCompareValue(valueFixedAcceptNumbers);
  };

  // --------------------------------------------------------------

  normalizeExchangeFromCompareValue = (compareValue, value) => {
    let compareValueFixed = compareValue.replace('-', '');

    return (compareValueFixed * value || 0).toFixed(2);
  };

  // --------------------------------------------------------------

  formatCurrencyToValue = currencyName => {
    return new Intl.NumberFormat(['en-IN'], {
      style: 'decimal',
      currency: currencyName,
      maxmimumFractionDigit: 1
    });
  };

  // --------------------------------------------------------------

  render() {
    const {
      data: { name, symbol, value, wallet },
      slideType
    } = this.props;
    const isSlideExchangeTo = slideType == 'to';

    return (
      <CurrencyContext.Consumer>
        {({ getExchangeData, exchangeFromCompareValue }) => {
          const { value: exchangeFromValue, symbol: exchangeFromSymbol } = getExchangeData();

          return (
            <div className="wexg-slider-item swiper-slide" data-name={name}>
              <dl className="wexg-slider-item-content">
                <dt className="wexg-slider-item__title">
                  {name}{' '}
                  {!isSlideExchangeTo && (
                    <input
                      className="wexg-slider-item__field"
                      type="tel"
                      onChange={e => this.setFieldValue(e.target.value)}
                      value={exchangeFromCompareValue}
                      maxLength="6"
                    />
                  )}
                  {isSlideExchangeTo &&
                    exchangeFromCompareValue != '' && (
                      <span>
                        +
                        {this.formatCurrencyToValue(name).format(
                          this.normalizeExchangeFromCompareValue(exchangeFromCompareValue, value)
                        )}
                      </span>
                    )}
                </dt>
                <dd className="wexg-slider-item__values">
                  You have {symbol}
                  {wallet}
                </dd>
                {isSlideExchangeTo && (
                  <dd className="wexg-slider-item__values">
                    {symbol}1 = {exchangeFromSymbol}
                    {(exchangeFromValue / value || 0).toFixed(2)}
                  </dd>
                )}
              </dl>
            </div>
          );
        }}
      </CurrencyContext.Consumer>
    );
  }
}

export default SliderItem;
