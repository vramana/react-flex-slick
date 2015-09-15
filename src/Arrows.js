import React, { Component, PropTypes } from 'react';

class LeftArrow extends Component {
  static propTypes = {
    handleClick: PropTypes.func.isRequired,
    className: PropTypes.string.isRequired
  }

  // HACK for propsTypes handleClick
  static defaultProps = {
    handleClick: () => {},
    className: ''
  }

  render() {
    const { className } = this.props;

    const style = className !== '' ? null : {
      width: 0,
      height: 0,
      borderBottom: 'solid 30px transparent',
      borderTop: 'solid 30px transparent',
      borderRight: 'solid 40px skyblue'
    };

    return (
      <div className={className} style={style} onClick={::this.props.handleClick}>
      </div>
    );
  }
}

class RightArrow extends Component {
  static propTypes = {
    handleClick: PropTypes.func.isRequired,
    className: PropTypes.string.isRequired
  }

  // HACK for propsTypes handleClick
  static defaultProps = {
    handleClick: () => {},
    className: ''
  }

  render() {
    const { className } = this.props;

    const style = className !== '' ? null : {
      width: 0,
      height: 0,
      borderBottom: 'solid 30px transparent',
      borderTop: 'solid 30px transparent',
      borderLeft: 'solid 40px skyblue'
    };

    return (
      <div className={className} style={style} onClick={::this.props.handleClick}></div>
    );
  }
}


export { LeftArrow, RightArrow };
