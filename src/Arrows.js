import React, { Component, PropTypes } from 'react';

class LeftArrow extends Component {
  static propTypes = {
    handleClick: PropTypes.func.isRequired
  }

  // HACK for propsTypes handleClick
  static defaultProps = {
    handleClick: () => {}
  }

  render() {
    const leftArrowAtyle = {
      width: 0,
      height: 0,
      borderBottom: 'solid 30px transparent',
      borderTop: 'solid 30px transparent',
      borderRight: 'solid 40px skyblue'
    };

    return (
      <div style={leftArrowAtyle} onClick={::this.props.handleClick}>
      </div>
    );
  }
}

class RightArrow extends Component {
  static propTypes = {
    handleClick: PropTypes.func.isRequired
  }

  // HACK for propsTypes handleClick
  static defaultProps = {
    handleClick: () => {}
  }

  render() {
    const rightArrowAtyle = {
      width: 0,
      height: 0,
      borderBottom: 'solid 30px transparent',
      borderTop: 'solid 30px transparent',
      borderLeft: 'solid 40px skyblue'
    };

    return (
      <div style={rightArrowAtyle} onClick={::this.props.handleClick}></div>
    );
  }
}


export { LeftArrow, RightArrow };
