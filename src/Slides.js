import React, { Component, PropTypes, Children, cloneElement } from 'react';

class Page extends Component {
  static propTypes = {
    children: PropTypes.any,
    vertical: PropTypes.bool.isRequired,
    count: PropTypes.number.isRequired,
    className: PropTypes.string.isRequired
  }

  render() {
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
    vertical: PropTypes.bool.isRequired,
    currentSlide: PropTypes.number.isRequired,
    pageClass: PropTypes.string.isRequired
  }

  render() {
    const { vertical, currentSlide, pageClass } = this.props;
    const count = Children.count(this.props.children);

    const trackWidth = vertical ? '100%' : `${100 * count}%`;
    const trackHeight = vertical ? `${100 * count}%` : '100%';
    const translateX = vertical ? 0 : (100 * currentSlide) / count;
    const translateY = vertical ? (100 * currentSlide) / count : 0;
    const trackTransform = `translate3d(${-translateX}%, ${-translateY}%, 0)`;
    const flexDirection = vertical ? ' column' : 'row';

    const trackStyle = {
      width: trackWidth,
      height: trackHeight,
      display: 'flex',
      flexDirection,
      flexShrink: 0,
      transform: trackTransform,
      transition: `all 1000ms ease`
    };

    const slides = Children.map(this.props.children, (child, i) =>
      <Page count={count} vertical={vertical} pageClass={pageClass} >
        {cloneElement(child, { key: i})}
      </Page>
    );

    return (
      <div style={trackStyle}>
        {slides}
      </div>
    );
  }
}

class Slides extends Component {
  static propTypes = {
    children: PropTypes.any,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    vertical: PropTypes.bool.isRequired,
    currentSlide: PropTypes.number.isRequired,
    pageClass: PropTypes.string.isRequired
  }

  static defaultProps = {
    width: 0,
    height: 0,
    vertical: false,
    currentSlide: 0,
    pageClass: ''
  }

  render() {
    const { width, height, vertical, currentSlide, pageClass } = this.props;

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
        <Track vertical={vertical} currentSlide={currentSlide} pageClass={pageClass} >
          {this.props.children}
        </Track>
      </div>
    );
  }
}

export default Slides;
