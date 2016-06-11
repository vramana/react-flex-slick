import { default as React, Component, PropTypes } from 'react';

class PrevArrow extends Component {
  static propTypes = {
    className: PropTypes.string,
    handleClick: PropTypes.func,
    currentSlide: PropTypes.number,
    activeClassName: PropTypes.string,
    inactiveClassName: PropTypes.string,
    infinite: PropTypes.bool,
    style: PropTypes.object
  };

  static defaultProps = {
    activeClassName: '',
    inactiveClassName: ''
  };

  render() {
    const {
      activeClassName,
      inactiveClassName,
      currentSlide,
      infinite,
      className,
      style,
      ...props
    } = this.props;

    const adjustedClassName = currentSlide === 0 && infinite === false ? inactiveClassName : activeClassName;

    const adjustedStyle = {
      ...style,
      ...(adjustedClassName !== '' ? {} : {
        width: 0,
        height: 0,
        borderBottom: 'solid 30px transparent',
        borderTop: 'solid 30px transparent',
        borderRight: 'solid 40px #795548'
      })
    };

    return (
      <div
        {...props}
        className={`${adjustedClassName}${className ? ` ${className}` : '' }`}
        style={adjustedStyle}
        onClick={::this.props.handleClick}
      />
    );
  }
}

class NextArrow extends Component {
  static propTypes = {
    className: PropTypes.string,
    handleClick: PropTypes.func,
    currentSlide: PropTypes.number,
    activeClassName: PropTypes.string,
    inactiveClassName: PropTypes.string,
    infinite: PropTypes.bool,
    slideCount: PropTypes.number,
    style: PropTypes.object
  };

  static defaultProps = {
    activeClassName: '',
    inactiveClassName: ''
  };

  render() {
    const {
      infinite,
      slideCount,
      activeClassName,
      inactiveClassName,
      currentSlide,
      className,
      style,
      ...props
    } = this.props;

    const adjustedClassName = (currentSlide + 1) === slideCount && infinite === false ? inactiveClassName : activeClassName;

    const adjustedStyle = {
      ...style,
      ...(adjustedClassName !== '' ? {} : {
        width: 0,
        height: 0,
        borderBottom: 'solid 30px transparent',
        borderTop: 'solid 30px transparent',
        borderLeft: 'solid 40px #795548'
      })
    };

    return (
      <div
        {...props}
        className={adjustedClassName}
        style={adjustedStyle}
        onClick={::this.props.handleClick}
      />
    );
  }
}

export { PrevArrow, NextArrow };
