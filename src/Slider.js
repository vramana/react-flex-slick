import React, { Component, PropTypes, cloneElement, Children } from 'react';
import { swipeDirection, swipeDistance } from './util.js';
import { SWIPE_UP, SWIPE_DOWN, SWIPE_RIGHT, SWIPE_LEFT } from './util.js';

class Slider extends Component {
  static propTypes = {
    children: PropTypes.any,
    initialSlide: PropTypes.number,
    currentSlide: PropTypes.number,
    infinite: PropTypes.bool,
    vertical: PropTypes.bool,
    transitionSpeed: PropTypes.number,
    transitionTimingFn: PropTypes.string,
    beforeChange: PropTypes.func,
    afterChange: PropTypes.func,
    swipe: PropTypes.bool,
    draggable: PropTypes.bool,
    edgeFriction: PropTypes.number,
    touchThreshold: PropTypes.number,
    edgeEvent: PropTypes.func,
    swipeEvent: PropTypes.func,
    touchMove: PropTypes.bool,
    autoPlay: PropTypes.bool,
    autoPlaySpeed: PropTypes.number
  }
  // May be move most of the props from here to Slider. and copy them to state while
  // componentWillMount

  static defaultProps = {
    initialSlide: 0,
    vertical: false,
    transitionSpeed: 500,
    transitionTimingFn: 'ease',
    swipe: false,
    draggable: false,
    infinite: false,
    edgeFriction: 0.35,
    touchThreshold: 0.2,
    touchMove: true,
    autoPlay: false,
    autoPlaySpeed: 3000
  }

  /**
    * @constructor
    */
  constructor(props, context) {
    super(props, context);
    const { currentSlide, initialSlide } = props;
    this.state = {
      currentSlide: currentSlide !== undefined ? currentSlide : initialSlide,
      animating: false,
      translateXOffset: 0,
      translateYOffset: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    const { currentSlide } = nextProps;
    if (currentSlide !== undefined && currentSlide !== this.state.currentSlide) {
      this.setState({ currentSlide });
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
        animating: true,
        translateXOffset: 0,
        translateYOffset: 0
      }, () => {
        setTimeout(this.transitionEndCallback, transitionSpeed);
      });
    }
  }

  handleSwipeStart(e) {
    const { swipe, draggable, edgeEvent, swipeEvent, touchThreshold, vertical } = this.props;
    if (swipe === false && (draggable === false && e.type.indexOf('mouse') === -1)) {
      return;
    }

    const posX = (e.touches !== undefined) ? e.touches[0].pageX : e.clientX;
    const posY = (e.touches !== undefined) ? e.touches[0].pageY : e.clientY;

    // FIXME Breaks compatibility with react-0.13 may be use id to this.
    // Doesn't require a style recalc as the actions happens after component is
    // mounted or updated
    const slider = this.refs.slider;
    const sliderRect = slider.getBoundingClientRect();
    const trackRect = slider.children[1].children[0].getBoundingClientRect();
    const maxSwipeLength = vertical === false ? trackRect.width : trackRect.height;
    const minSwipe = (vertical === false ? sliderRect.width : sliderRect.height) * touchThreshold;

    this.setState({
      swiping: true,
      touchObject: {
        startX: posX,
        startY: posY,
        currX: posX,
        currY: posY,
        swipeLength: 0,
        edgeEventFired: edgeEvent === undefined ? true : false,
        swipeEventFired: swipeEvent === undefined ? true : false,
        minSwipe,
        maxSwipeLength
      }
    });
  }

  handleSwipeMove(e) {
    if (this.state.animating === true || this.state.swiping === false) {
      return;
    }

    const { infinite, edgeEvent, children, swipeEvent, vertical, touchMove } = this.props;
    const { touchObject, currentSlide } = this.state;

    touchObject.currY = e.touches !== undefined ? e.touches[0].pageY : e.clientY;
    touchObject.currX = e.touches !== undefined ? e.touches[0].pageX : e.clientX;

    touchObject.swipeLength = swipeDistance(touchObject);

    const direction = swipeDirection(touchObject);
    const horizontalPrev = vertical === false && direction === SWIPE_RIGHT;
    const horizontalNext = vertical === false && direction === SWIPE_LEFT;

    const verticalPrev = vertical === true && direction === SWIPE_DOWN;
    const verticalNext = vertical === true && direction === SWIPE_UP;

    const slideCount = Children.count(children[1].props.children);

    const edgeSwipePrev = currentSlide === 0 &&
      infinite === false && (horizontalPrev || verticalPrev);
    const edgeSwipeNext = (currentSlide + 1) === slideCount &&
      infinite === false && (horizontalNext || verticalNext);

    const edgeFriction = (edgeSwipePrev || edgeSwipeNext) ?
      this.props.edgeFriction : 1;

    // TODO refactor this into a function.
    if (touchObject.edgeEventFired === false) {
      if (edgeSwipePrev || edgeSwipeNext) {
        edgeEvent(direction);
        touchObject.edgeEventFired = true;
      }
    }

    if (touchObject.swipeEventFired === false) {
      swipeEvent(direction);
      touchObject.swipeEventFired = true;
    }

    const translateXOffset = vertical === false && touchMove === true ?
      ((touchObject.currX - touchObject.startX) * 100 * edgeFriction) / touchObject.maxSwipeLength : 0;
    const translateYOffset = vertical === true && touchMove === true ?
      ((touchObject.currY - touchObject.startY) * 100 * edgeFriction) / touchObject.maxSwipeLength : 0;

    this.setState({
      touchObject: {...touchObject},
      translateXOffset,
      translateYOffset
    });

    // Don't cancel scrolling in the cross-axis to the slider
    const verticalScroll = vertical === false && (direction === SWIPE_UP || direction === SWIPE_DOWN);
    const horizontalScroll = vertical === true && (direction === SWIPE_LEFT || direction === SWIPE_RIGHT);
    if (verticalScroll || horizontalScroll) {
      return;
    }

    // Don't preventDefault for small movement helps in clicking links etc.,
    // Refer to react-slick#26
    if (touchObject.swipeLength > 4) {
      e.preventDefault();
    }
  }

  handleSwipeEnd(e) {
    if (!this.state.swiping) {
      return;
    }
    const { touchObject } = this.state;
    const { vertical } = this.props;
    const direction = swipeDirection(touchObject);

    this.setState({
      swiping: false,
      touchObject: {},
      translateXOffset: 0,
      translateYOffset: 0
    });

    const horizontalPrev = vertical === false && direction === SWIPE_RIGHT;
    const horizontalNext = vertical === false && direction === SWIPE_LEFT;

    const verticalPrev = vertical === true && direction === SWIPE_DOWN;
    const verticalNext = vertical === true && direction === SWIPE_UP;

    if (touchObject.swipeLength > touchObject.minSwipe) {
      e.preventDefault();
      if (horizontalPrev || verticalPrev) {
        this.handleSlideShift(-1);
      } else if (horizontalNext || verticalNext) {
        this.handleSlideShift(1);
      }
    }
  }

  render() {
    const { children, vertical, infinite, swipe, draggable } = this.props;
    const { transitionSpeed, transitionTimingFn } = this.props;
    const { beforeChange, afterChange } = this.props;
    const [ leftArrow, slides, rightArrow ] = children;
    const { currentSlide, translateXOffset, translateYOffset } = this.state;
    const slideCount = Children.count(slides.props.children);

    // onClick is passed as a props so that dom elements can be custom arrows

    const newLeftArrow = cloneElement(leftArrow, {
      key: 0,
      handleClick: () => { this.handleSlideShift(-1); },
      onClick: () => { this.handleSlideShift(-1); },
      currentSlide,
      infinite
    });

    // Need to pass slideCount to check if end of slide has been reached.
    const newRightArrow = cloneElement(rightArrow, {
      key: 2,
      handleClick: () => { this.handleSlideShift(1); },
      onClick: () => { this.handleSlideShift(1); },
      currentSlide,
      infinite,
      slideCount
    });

    // TODO Show a warning if transitionSpeed prop is declared on Slides.
    const newSlides = cloneElement(slides, {
      key: 1,
      currentSlide,
      infinite,
      swipe,
      draggable,
      transitionSpeed,
      transitionTimingFn,
      vertical,
      onMouseDown: ::this.handleSwipeStart,
      onMouseMove: this.state.swiping ? ::this.handleSwipeMove : null,
      onMouseUp: ::this.handleSwipeEnd,
      onMouseLeave: this.state.swiping ? ::this.handleSwipeEnd : null,
      onTouchStart: ::this.handleSwipeStart,
      onTouchMove: this.state.swiping ? ::this.handleSwipeMove : null,
      onTouchEnd: ::this.handleSwipeEnd,
      onTouchCancel: this.state.swiping ? ::this.handleSwipeEnd : null,
      beforeChange,
      afterChange,
      translateXOffset,
      translateYOffset
    });

    return (
      <div ref="slider" style={{ display: 'flex', alignItems: 'center'}}>
        {newLeftArrow}
        {newSlides}
        {newRightArrow}
      </div>
    );
  }
}

export default Slider;
