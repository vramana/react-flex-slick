import React, { Component, PropTypes, cloneElement, Children } from 'react';

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
      currentSlide: this.props.initialSlide
    };
  }

  render() {
    const leftArrow = this.props.children[0];
    const slides = this.props.children[1];
    const rightArrow = this.props.children[2];
    const slideCount = Children.count(slides.props.children);
    const { currentSlide } = this.state;

    const handleLeftArrowClick = () => {
      if (currentSlide > 0) {
        this.setState({ currentSlide: currentSlide - 1 });
      }
    };
    const handleRightArrowClick = () => {
      if (currentSlide + 1 < slideCount) {
        this.setState({ currentSlide: currentSlide + 1 });
      }
    };

    const newLeftArrow = cloneElement(leftArrow, {
      key: 0,
      handleClick: handleLeftArrowClick
    });

    const newRightArrow = cloneElement(rightArrow, {
      key: 2,
      handleClick: handleRightArrowClick
    });

    const newSlides = cloneElement(slides, {
      key: 1,
      currentSlide
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
