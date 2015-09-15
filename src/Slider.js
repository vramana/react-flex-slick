import React, { Component, PropTypes, cloneElement, Children } from 'react';
import { findDOMNode } from 'react-dom';
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

  render() {
    const leftArrow = this.props.children[0];
    const slides = this.props.children[1];
    const rightArrow = this.props.children[2];
    const slideCount = Children.count(slides.props.children);
    const { currentSlide, animating } = this.state;

    const slidesDOMNode = findDOMNode(this.refs.slides);
    const trackDOMNode = slidesDOMNode.children[0];

    const handleArrowClick = (delta) => {
      if (animating) {
        return;
      }

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
    };

    const newLeftArrow = cloneElement(leftArrow, {
      key: 0,
      handleClick: () => { handleArrowClick(-1); }
    });

    const newRightArrow = cloneElement(rightArrow, {
      key: 2,
      handleClick: () => { handleArrowClick(1); }
    });

    const newSlides = cloneElement(slides, {
      key: 1,
      currentSlide,
      ref: 'slides'
    });

    return (
      <div style={{ display: 'flex', alignItems: 'center'}}>
        {newLeftArrow}
        {newSlides}
        {newRightArrow}
      </div>
    );
  }
}

export default Slider;
