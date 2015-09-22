import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Slider, Slides, PrevArrow, NextArrow } from '../src';

import './index.css';

class App extends Component {

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
        <div>
          <h2>Non Infinite</h2>
          <NonInfinite width={580} height={150} />
        </div>
        <div>
          <h2>Infinite</h2>
          <Infinite width={580} height={150} />
        </div>
        <div>
          <h2>Custom Arrow</h2>
          <CustomArrows width={580} height={150} />
        </div>
      </div>
    );
  }
}

const slideStyle = {
  width: 540,
  height: 125,
  backgroundColor: 'slateblue',
  color: 'white',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};

class NonInfinite extends Component {

  render() {
    return (
      <Slider currentSlide={2}>
        <PrevArrow activeClassName="non-infinite-left--active"
                   inactiveClassName="non-infinite-left--inactive" />
        <Slides {...this.props}>
          <div style={slideStyle}><h1>1</h1></div>
          <div style={slideStyle}><h1>2</h1></div>
          <div style={slideStyle}><h1>3</h1></div>
          <div style={slideStyle}><h1>4</h1></div>
          <div style={slideStyle}><h1>5</h1></div>
          <div style={slideStyle}><h1>6</h1></div>
        </Slides>
        <NextArrow activeClassName="non-infinite-right--active"
                    inactiveClassName="non-infinite-right--inactive" />
      </Slider>
    );
  }
}

class Infinite extends Component {

  render() {
    return (
      <Slider infinite swipe draggable >
        <PrevArrow />
        <Slides {...this.props}  >
          <div style={slideStyle}><h1>1</h1></div>
          <div style={slideStyle}><h1>2</h1></div>
          <div style={slideStyle}><h1>3</h1></div>
          <div style={slideStyle}><h1>4</h1></div>
          <div style={slideStyle}><h1>5</h1></div>
          <div style={slideStyle}><h1>6</h1></div>
        </Slides>
        <NextArrow />
      </Slider>
    );
  }
}

class CustomArrows extends Component {

  render() {
    return (
      <Slider infinite swipe draggable >
        <button>Prev</button>
        <Slides {...this.props}>
          <div style={slideStyle}><h1>1</h1></div>
          <div style={slideStyle}><h1>2</h1></div>
          <div style={slideStyle}><h1>3</h1></div>
          <div style={slideStyle}><h1>4</h1></div>
          <div style={slideStyle}><h1>5</h1></div>
          <div style={slideStyle}><h1>6</h1></div>
        </Slides>
        <button>Next</button>
      </Slider>
    );
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById('root'));
