import React from 'react';

import { CurrencyContext } from 'js/contexts/Currency';

const SelectCurrency = () => (
  <CurrencyContext.Consumer>
    {({ getExchangeData }) => {
      const { symbol: exchangeFromSymbol, value: exchangeFromValue } = getExchangeData();
      const { symbol: exchangeToSymbol, value } = getExchangeData(1);

      return (
        <select className="wexg-select-currency">
          <option value="">
            {exchangeFromSymbol}1 = {exchangeToSymbol}
            {(exchangeFromValue / value || 0).toFixed(2)}
          </option>
        </select>
      );
    }}
  </CurrencyContext.Consumer>
);

export default SelectCurrency;
