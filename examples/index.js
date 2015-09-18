import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Slider, Slides, LeftArrow, RightArrow } from '../src';

import './index.css';

class App extends Component {
  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div>
          <h2>Non Infinite</h2>
          <NonInfinite width={450} height={150} />
        </div>
        <div>
          <h2>Infinite</h2>
          <Infinite width={450} height={150} />
        </div>
      </div>
    );
  }
}

const slideStyle = {
  width: 400,
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
      <Slider>
        <LeftArrow activeClassName="non-infinite-left--active"
                   inactiveClassName="non-infinite-left--inactice" />
        <Slides {...this.props}>
          <div style={slideStyle}><h1>1</h1></div>
          <div style={slideStyle}><h1>2</h1></div>
          <div style={slideStyle}><h1>3</h1></div>
          <div style={slideStyle}><h1>4</h1></div>
          <div style={slideStyle}><h1>5</h1></div>
          <div style={slideStyle}><h1>6</h1></div>
        </Slides>
        <RightArrow activeClassName="non-infinite-right--active"
                    inactiveClassName="non-infinite-right--inactice" />
      </Slider>
    );
  }
}

class Infinite extends Component {

  render() {
    return (
      <Slider infinite >
        <LeftArrow />
        <Slides {...this.props}>
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
