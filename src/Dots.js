import React, { Component, PropTypes } from 'react';

class Dots extends Component {
  static propTypes = {
    currentSlide: PropTypes.number,
    slideCount: PropTypes.number
  }

  render() {
    let {currentSlide, slideCount} = this.props;
    let dotElements = [];
    for(var i = 0; i < slideCount; i++) {
      let style = {
        opacity: currentSlide === i ? 1 : 0.2,
        display: 'inline',
        paddingLeft: 8,
        paddingRight: 8,
        fontSize: 35
      }
      dotElements.push(<li key={i} style={style}>•</li>);
    }
    return(
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <ul style={{listStyle: 'none', margin: 0, padding: 0}}>
        {dotElements}
      </ul>
      </div>
    )
  }
}

export default Dots;
