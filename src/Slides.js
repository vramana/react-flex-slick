import React, { Component, PropTypes, Children, cloneElement } from 'react';

class Page extends Component {
  static propTypes = {
    children: PropTypes.any,
    vertical: PropTypes.bool.isRequired,
    count: PropTypes.number.isRequired,
    className: PropTypes.string.isRequired
  }

  render() {
    // TODO Move this repetive calculation to Track
    const { count, vertical, className } = this.props;
    const pageWidth = vertical ? '100%' : `${100 / count}%`;
    const pageHeight = vertical ? `${100 / count}%` : '100%';
    const pageStyle = {
      width: pageWidth,
      height: pageHeight,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    };

    return (
      <div className={className} style={pageStyle}>
          {this.props.children}
      </div>
    );
  }
}

class Track extends Component {

  static propTypes = {
    children: PropTypes.any,
    infinite: PropTypes.bool.isRequired,
    vertical: PropTypes.bool.isRequired,
    currentSlide: PropTypes.number.isRequired,
    pageClass: PropTypes.string.isRequired,
    transitionSpeed: PropTypes.number.isRequired,
    transitionTimingFn: PropTypes.string.isRequired
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      previousSlide: undefined
    };
  }

  componentWillReceiveProps() {
    // TODO May be move this to Slider
    this.setState({
      previousSlide: this.props.currentSlide
    });
  }

  render() {
    const { vertical, currentSlide, pageClass, infinite,
            transitionSpeed, transitionTimingFn } = this.props;
    const { previousSlide } = this.state;
    const slideCount = Children.count(this.props.children);
    const totalCount = slideCount + (infinite === true ? 2 : 0);
    const preSlideCount = infinite === true ? 1 : 0;

    const trackWidth = vertical ? '100%' : `${100 * totalCount}%`;
    const trackHeight = vertical ? `${100 * totalCount}%` : '100%';
    const translateX = vertical ? 0 : (100 * (currentSlide + preSlideCount)) / totalCount;
    const translateY = vertical ? (100 * (currentSlide + preSlideCount)) / totalCount : 0;
    const trackTransform = `translate3d(${-translateX}%, ${-translateY}%, 0)`;
    const trackTransition =
      (previousSlide === -1 && (currentSlide === slideCount - 1)) ||
      ((previousSlide === slideCount) && currentSlide === 0) ? '' :
      `all ${transitionSpeed}ms ${transitionTimingFn}`;
    const flexDirection = vertical ? 'column' : 'row';

    const trackStyle = {
      width: trackWidth,
      height: trackHeight,
      display: 'flex',
      flexDirection,
      flexShrink: 0,
      transform: trackTransform,
      transition: trackTransition
    };

    const slides = Children.map(this.props.children, (child, i) =>
      <Page count={totalCount} vertical={vertical} className={pageClass} >
        {cloneElement(child, { key: i })}
      </Page>
    );

    const preSlides = slideCount === 1 || infinite === false ? null :
      <Page count={totalCount} vertical={vertical} className={pageClass} pre >
        {cloneElement(this.props.children[slideCount - 1], { key: -1 })}
      </Page>;

    const postSlides = slideCount === 1 || infinite === false ? null :
      <Page count={totalCount} vertical={vertical} className={pageClass} post >
        {cloneElement(this.props.children[0], { key: totalCount })}
      </Page>;

    return (
      <div style={trackStyle}>
        {preSlides}
        {slides}
        {postSlides}
      </div>
    );
  }
}

class Slides extends Component {
  static propTypes = {
    children: PropTypes.any,
    width: PropTypes.number,
    height: PropTypes.number,
    currentSlide: PropTypes.number,
    infinite: PropTypes.bool,
    vertical: PropTypes.bool,
    pageClass: PropTypes.string,
    transitionSpeed: PropTypes.number,
    transitionTimingFn: PropTypes.string
  }

  static defaultProps = {
    width: 0,
    height: 0,
    pageClass: ''
  }

  render() {
    const { width, height, vertical, currentSlide, pageClass,
            infinite, transitionSpeed, transitionTimingFn } = this.props;

    const containerWidth = width === 0 ? '100%' : width;
    const containerHeight = height === 0 ? '100%' : height;
    const containerStyle = {
      width: containerWidth,
      height: containerHeight,
      display: 'flex',
      overflow: 'hidden'
    };

    return (
      <div style={containerStyle}>
        <Track infinite={infinite}
               vertical={vertical}
               currentSlide={currentSlide}
               pageClass={pageClass}
               transitionSpeed={transitionSpeed}
               transitionTimingFn={transitionTimingFn} >
          {this.props.children}
        </Track>
      </div>
    );
  }
}

export default Slides;
