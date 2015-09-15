React Flex Slick
================

This is library aims to replace [react-slick][react-slick]   

Uses **flexbox** exclusively, so no support for older browsers :cry: :cry:

On the bright side, it is extremly flexible. Currently only supports `react-0.14`

## Examples

To run the examples:

1. `git clone http://github.com/vramana/react-flex-slick`
2. `cd react-flex-slick && npm i`
3. `npm start`

## Usage

```javascript
import React from 'react';
import { Slides, Slider,
         LeftArrow, RightArrow } from 'react-flex-slick';

class App extends React.Component {

  render() {
    return (
      <Slider>
        <LeftArrow />
        <Slides>
          <MySlide1 />
          <MySlide2 />
          <MySlide3 />
          <MySlide4 />
        </Slides>
        <RightArrow />
      </Slider>
    );
  }
}
```

## What works

- Horizontal and Vertical Sliding
- One Slide per page
- Left and Right Arrows to go back and forth

## TODO

- Feature Parity with [Slick Carousel][slick]
- Examples
- Documentation
- Tests

## Inspiration

- [Slick Carousel][slick]
- [React Slick][react-slick]
- [React SoundPlayer][react-soundplayer]
- [Smart and Dumb Componenst][smart-dumb]


## License

MIT


[react-slick]: https://github.com/akiran/react-slick
[react-soundplayer]: https://github.com/soundblogs/react-soundplayer
[smart-dumb]: https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0
[slick]: https://github.com/kenwheeler/slick
