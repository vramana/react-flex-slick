import React, { Component, PropTypes } from 'react';

class LeftArrow extends Component {
  static propTypes = {
    handleClick: PropTypes.func,
    currentSlide: PropTypes.number,
    activeClassName: PropTypes.string,
    inactiveClassName: PropTypes.string,
    infinite: PropTypes.bool
  }

  static defaultProps = {
    activeClassName: '',
    inactiveClassName: ''
  }

  render() {
    const { activeClassName, inactiveClassName, currentSlide, infinite } = this.props;

    const className = currentSlide === 0 && infinite === false ? inactiveClassName : activeClassName;
    const style = className !== '' ? null : {
      width: 0,
      height: 0,
      borderBottom: 'solid 30px transparent',
      borderTop: 'solid 30px transparent',
      borderRight: 'solid 40px #795548'
    };

    return (
      <div className={className} style={style} onClick={::this.props.handleClick}>
      </div>
    );
  }
}

class RightArrow extends Component {
  static propTypes = {
    handleClick: PropTypes.func,
    currentSlide: PropTypes.number,
    activeClassName: PropTypes.string,
    inactiveClassName: PropTypes.string,
    infinite: PropTypes.bool,
    slideCount: PropTypes.number
  }

  static defaultProps = {
    activeClassName: '',
    inactiveClassName: ''
  }

  render() {
    const { activeClassName, inactiveClassName, currentSlide } = this.props;
    const { infinite, slideCount } = this.props;

    const className = (currentSlide + 1) === slideCount && infinite === false ? inactiveClassName : activeClassName;
    const style = className !== '' ? null : {
      width: 0,
      height: 0,
      borderBottom: 'solid 30px transparent',
      borderTop: 'solid 30px transparent',
      borderLeft: 'solid 40px #795548'
    };

    return (
      <div className={className} style={style} onClick={::this.props.handleClick}></div>
    );
  }
}


export { LeftArrow, RightArrow };
