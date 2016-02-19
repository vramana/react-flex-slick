import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Slider, Slides, PrevArrow, NextArrow, Dots } from '../src';

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
          <h2>Custom arrows</h2>
          <CustomArrows width={580} height={150} />
        </div>
        <div>
          <h2>Control Play (will autoPlay after 5s)</h2>
          <ControlPlay width={580} height={150} />
        </div>
        <div>
          <h2>Set slide to show (will show the 6th slide after 5s)</h2>
          <SetSlide width={580} height={150} />
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
      <Slider>
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
        <Dots />
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
        <Dots />
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

class ControlPlay extends Component {

  constructor(props) {
    super(props);
    this.state = { playing: false };
  }

  componentDidMount() {
    this.timeout = setTimeout(() => {
      this.setState({ playing: true });
    }, 5000);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    return (
      <Slider infinite swipe draggable autoPlay={this.state.playing} >
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

class SetSlide extends Component {
  
  constructor(props) {
    super(props);
    this.state = { currentSlide: 0 };
  }

  componentDidMount() {
    this.timeout = setTimeout(() => {
      this.setState({ currentSlide: 5 });
    }, 5000);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    return (
      <Slider {...this.state} infinite swipe draggable >
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
