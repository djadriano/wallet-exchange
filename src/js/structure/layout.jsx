import React, { Fragment } from 'react';

import SelectCurrency from 'js/components/SelectCurrency';
import Slider from 'js/components/Slider';

import { CurrencyContext, CurrencyProvider } from 'js/contexts/Currency';

// --------------------------------------------------------------

const Layout = () => {
  return (
    <CurrencyProvider>
      <CurrencyContext.Consumer>
        {({ exchangeFromCompareValue }) => (
          <Fragment>
            <nav className="wexg-nav">
              <ul className="wexg-nav__links">
                <li>
                  <a href="#" className="wexg-nav__link wexg-nav__link--active">
                    Cancel
                  </a>
                </li>
                <li>
                  <SelectCurrency />
                </li>
                <li>
                  <a href="#" className={`wexg-nav__link ${exchangeFromCompareValue ? 'wexg-nav__link--active' : ''}`}>
                    Exchange
                  </a>
                </li>
              </ul>
            </nav>
            <section className="wexg-exchange-comparator">
              <Slider type="from" />
              <Slider type="to" />
            </section>
          </Fragment>
        )}
      </CurrencyContext.Consumer>
    </CurrencyProvider>
  );
};

export default Layout;
