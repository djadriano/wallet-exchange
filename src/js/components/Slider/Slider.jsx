import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import Swiper from 'swiper';

import { CurrencyContext } from 'js/contexts/Currency';

import SliderItem from 'js/components/SliderItem';

class Slider extends Component {
  constructor(props) {
    super(props);

    this.sliderRef = createRef();
    this.sliderPaginationRef = createRef();
  }

  // --------------------------------------------------------------

  static propTypes = {
    className: PropTypes.string,
    type: PropTypes.oneOf(['from', 'to'])
  };

  // --------------------------------------------------------------

  static defaultProps = {
    className: ''
  };

  // --------------------------------------------------------------

  static contextType = CurrencyContext;

  // --------------------------------------------------------------

  componentDidMount() {
    this.initializeSwiper();
  }

  // --------------------------------------------------------------

  initializeSwiper = () => {
    const { type } = this.props;
    const { current: currentSlider } = this.sliderRef;
    const { currenciesSelected, setCurrenciesSelected, setExchangeFromCompareValue, getCurrencyIndex } = this.context;
    const currenciesSelectedIndex = type == 'from' ? 0 : 1;

    const swiper = new Swiper(currentSlider, {
      initialSlide: getCurrencyIndex(currenciesSelected[currenciesSelectedIndex]),
      on: {
        slideChangeTransitionEnd: () => {
          const getCurrentSlide = currentSlider.querySelector(`.swiper-slide-active`);

          if (getCurrentSlide) {
            const getCurrentSlideName = getCurrentSlide.dataset.name;
            const currentSlideInput = document.querySelector(
              '.wexg-slider--from .swiper-slide-active .wexg-slider-item__field'
            );

            // Set slider item selected
            setCurrenciesSelected(currenciesSelectedIndex, getCurrentSlideName);

            // Reset the input file of from slider item
            if (type == 'from') setExchangeFromCompareValue('');

            if (currentSlideInput) currentSlideInput.focus();
          }
        }
      },
      pagination: {
        el: this.sliderPaginationRef.current,
        clickable: true
      }
    });

    swiper.init();
  };

  // --------------------------------------------------------------

  render() {
    const { type } = this.props;

    return (
      <CurrencyContext.Consumer>
        {({ currencies }) => {
          return (
            <div className={`wexg-slider wexg-slider--${type} swiper-container`} ref={this.sliderRef}>
              <div className="wexg-slider__wrapper swiper-wrapper">
                {currencies.map((item, index) => (
                  <SliderItem key={index} data={{ ...item, name: item.name }} slideType={type} />
                ))}
              </div>
              <div className="wexg-slider__pagination swiper-pagination" ref={this.sliderPaginationRef} />
            </div>
          );
        }}
      </CurrencyContext.Consumer>
    );
  }
}

export default Slider;
