import React, { Component, PropTypes, cloneElement, Children } from 'react';
import ReactTransitionEvents from 'react/lib/ReactTransitionEvents';

class Slider extends Component {
  static propTypes = {
    children: PropTypes.any,
    initialSlide: PropTypes.number.isRequired
  }

  static defaultProps = {
    initialSlide: 0,
    vertical: false
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      currentSlide: this.props.initialSlide,
      animating: false
    };
  }

  handleArrowClick(delta) {
    const { currentSlide, animating } = this.state;
    if (animating || delta === 0) {
      return;
    }

    const slides = this.props.children[1];
    const slideCount = Children.count(slides.props.children);
    const sliderDOMNode = this.refs.slider;
    const slidesDOMNode = sliderDOMNode.children[1];
    const trackDOMNode = slidesDOMNode.children[0];

    const callback = () => {
      this.setState({
        animating: false
      });
      ReactTransitionEvents.removeEndEventListener(trackDOMNode, callback);
    };

    if ((delta < 0 && currentSlide > 0) || (delta > 0 && currentSlide + 1 < slideCount)) {
      this.setState({
        currentSlide: currentSlide + delta,
        animating: true
      }, () => {
        ReactTransitionEvents.addEndEventListener(trackDOMNode, callback);
      });
    }
  }

  render() {
    const leftArrow = this.props.children[0];
    const slides = this.props.children[1];
    const rightArrow = this.props.children[2];
    const { currentSlide } = this.state;

    const newLeftArrow = cloneElement(leftArrow, {
      key: 0,
      handleClick: () => { this.handleArrowClick(-1); },
      currentSlide
    });

    const newRightArrow = cloneElement(rightArrow, {
      key: 2,
      handleClick: () => { this.handleArrowClick(1); },
      currentSlide
    });

    const newSlides = cloneElement(slides, {
      key: 1,
      currentSlide
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
