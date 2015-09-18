import React, { Component, PropTypes, cloneElement, Children } from 'react';

class Slider extends Component {
  static propTypes = {
    children: PropTypes.any,
    initialSlide: PropTypes.number,
    currentSlide: PropTypes.number,
    infinite: PropTypes.bool,
    vertical: PropTypes.bool,
    transitionSpeed: PropTypes.number,
    transitionTimingFn: PropTypes.string
  }

  static defaultProps = {
    initialSlide: 0,
    vertical: false,
    transitionSpeed: 500,
    transitionTimingFn: 'ease',
    infinite: false
  }

  /**
    * @constructor
    */
  constructor(props, context) {
    super(props, context);
    this.state = {
      currentSlide: props.currentSlide !== undefined ? props.currentSlide : props.initialSlide,
      animating: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentSlide !== undefined && nextProps.currentSlide !== this.state.currentSlide) {
      this.setState({
        currentSlide: nextProps.currentSlide
      });
    }
  }

  componentWillUnmount() {
    if (this.transitionEndCallback) {
      clearTimeout(this.transitionEndCallback);
    }
  }

  /**
   * Change the position of a slider by `delta`
   * @method
   * @private
   * @param {number} delta - Move forward the slide by delta (delta can be negative)
   */
  handleSlideShift(delta) {
    const { currentSlide, animating } = this.state;
    const { transitionSpeed, infinite } = this.props;
    if (animating === true || delta === 0) {
      return;
    }

    const slides = this.props.children[1];
    const slideCount = Children.count(slides.props.children);

    let newNextSlide;
    if (infinite === true) {
      if (currentSlide + 1 === slideCount && delta > 0) {
        newNextSlide = 0;
      } else if (currentSlide === 0 && delta < 0) {
        newNextSlide = slideCount - 1;
      }
    }

    // EndEventListeners are not reliable. So,we use setTimeout
    // See react 0.14.0-rc1 blog post.
    this.transitionEndCallback = () => {
      this.setState({
        currentSlide: newNextSlide === undefined ? currentSlide + delta : newNextSlide,
        animating: false
      });
      delete this.transitionEndCallback;
    };

    const nonInfiniteCondition =
      infinite === false &&
      ((delta < 0 && currentSlide > 0) || (delta > 0 && currentSlide + 1 < slideCount));

    if (nonInfiniteCondition || infinite === true) {
      this.setState({
        currentSlide: currentSlide + delta,
        animating: true
      }, () => {
        setTimeout(this.transitionEndCallback, transitionSpeed);
      });
    }
  }

  render() {
    const { children, transitionSpeed, transitionTimingFn, vertical, infinite } = this.props;
    const [ leftArrow, slides, rightArrow ] = children;
    const { currentSlide } = this.state;

    const newLeftArrow = cloneElement(leftArrow, {
      key: 0,
      handleClick: () => { this.handleSlideShift(-1); },
      currentSlide
    });

    const newRightArrow = cloneElement(rightArrow, {
      key: 2,
      handleClick: () => { this.handleSlideShift(1); },
      currentSlide
    });

    // TODO Show a warning if transitionSpeed prop is declared on Slides.
    const newSlides = cloneElement(slides, {
      key: 1,
      currentSlide,
      infinite,
      transitionSpeed,
      transitionTimingFn,
      vertical
    });

    return (
      <div style={{ display: 'flex', alignItems: 'center'}} ref="slider">
        {newLeftArrow}
        {newSlides}
        {newRightArrow}
      </div>
    );
  }
}

export default Slider;
