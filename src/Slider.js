import React, { Component, PropTypes, cloneElement, Children } from 'react';

class Slider extends Component {
  static propTypes = {
    children: PropTypes.any,
    initialSlide: PropTypes.number,
    currentSlide: PropTypes.number,
    vertical: PropTypes.bool.isRequired,
    transitionSpeed: PropTypes.number.isRequired,
    transitionTimingFn: PropTypes.string.isRequired
  }

  static defaultProps = {
    initialSlide: 0,
    vertical: false,
    transitionSpeed: 500,
    transitionTimingFn: 'ease'
  }

  /**
    * @constructor
    */
  constructor(props, context) {
    super(props, context);
    this.state = {
      currentSlide: props.currentSlide ? props.currentSlide : props.initialSlide,
      animating: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentSlide !== this.state.currentSlide) {
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
    const { transitionSpeed } = this.props;
    if (animating || delta === 0) {
      return;
    }

    const slides = this.props.children[1];
    const slideCount = Children.count(slides.props.children);

    // EndEventListeners are not reliable. So,we use setTimeout
    // See react 0.14.0-rc1 blog post.
    this.transitionEndCallback = () => {
      this.setState({
        animating: false
      });
      delete this.transitionEndCallback;
    };

    if ((delta < 0 && currentSlide > 0) || (delta > 0 && currentSlide + 1 < slideCount)) {
      this.setState({
        currentSlide: currentSlide + delta,
        animating: true
      }, () => {
        setTimeout(this.transitionEndCallback, transitionSpeed);
      });
    }
  }

  render() {
    const { children, transitionSpeed, transitionTimingFn, vertical } = this.props;
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
