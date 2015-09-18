import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Slider, Slides, LeftArrow, RightArrow } from '../src';

class App extends Component {
  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: 500, height: 200 }}>
          <Simple />
        </div>
      </div>
    );
  }
}


class Simple extends Component {

  render() {
    const slideStyle = {
      width: 400,
      height: 125,
      backgroundColor: 'teal',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    };

    return (
      <Slider currentSlide={0}>
        <LeftArrow />
        <Slides>
          <div style={slideStyle}><h1>1</h1></div>
          <div style={slideStyle}><h1>2</h1></div>
          <div style={slideStyle}><h1>3</h1></div>
          <div style={slideStyle}><h1>4</h1></div>
          <div style={slideStyle}><h1>5</h1></div>
          <div style={slideStyle}><h1>6</h1></div>
        </Slides>
        <RightArrow />
      </Slider>
    );
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById('root'));
