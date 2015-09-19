React Flex Slick
================

This is library aims to replace [react-slick][react-slick].

Uses **flexbox** exclusively, so no support for older browsers :cry: :cry:

On the bright side, it is extremly flexible. Currently it supports `>=react-0.13`

Any questions?? Join here [![react-flex-slick on slack](https://img.shields.io/badge/slack-react--flex--slick%40reactiflux-61DAFB.svg?style=flat-square)](http://www.reactiflux.com)

## Examples

To run the examples:

1. `git clone http://github.com/vramana/react-flex-slick`
2. `cd react-flex-slick && npm i`
3. `npm start`

## What works

- Infinite and Non-infinite Mode
- Horizontal and Vertical Sliding
- Multiple Slides per page (slidesToScroll = slidesToShow)
- Left and Right Arrows to go back and forth
- Arrows have active and inactive classes.

## TODO

- Feature Parity with [Slick Carousel][slick]
- Examples
- Documentation
- Tests

## Comparision with Slick

### Settings

- cssEase - transitionTimingFn
- arrows - Alternate way: Instead of arrows pass empty `<div>` to the Slider
- appendArrows, appendDots - Not supported due the architecture of component
- mobileFirst - Alternate way: Control the size of Slider just usign css on the parent class
- leftArrow, rightArrow - Alternate way: Just put a ref on leftArrow and rightArrow
- infinite - works as expected
- initialSlide - works as expected
- rows - Alternate way: Pass pages of slides instead of slides.
- speed - transitionSpeed
- vertical - works as expected

**Progress** - Total: 43 Current:

### Events

- beforeChange - `beforeChange(prevSlide, currSlide)` but doesn't have the event handler
- afterChange - `afterChange(prevSlide, currSlide)` but doesn't have the event handler
- destroy - Alternate way: Can be invoke in parent components lifecycle methods when the slider is taken out of the render tree.
- init, reInit - Alternate way: Can be invoke in parent components lifecycle methods.
- setPosition - Not positions are calculated from the DOM. So, doesn't make sense.

### Methods

No slick method will be supported because the encourage anti-patterns in react i.e, changing
the state of child component via a parent component directly or indirectly using setState.
You can add all this by passing props to the Slider component. Detailed examples will be written
showing how.

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
