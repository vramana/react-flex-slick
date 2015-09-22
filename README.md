React Flex Slick
================

This is library aims to replace [react-slick][react-slick].

Uses **flexbox** exclusively, so no support for older browsers :cry: :cry:

On the bright side, it is extremly flexible. Currently it supports `>=react-0.14` including rc's

Any questions?? Join here [![react-flex-slick on slack](https://img.shields.io/badge/slack-react--flex--slick%40reactiflux-61DAFB.svg?style=flat-square)](http://www.reactiflux.com)

## Examples

To run the examples:

1. `git clone http://github.com/vramana/react-flex-slick`
2. `cd react-flex-slick && npm i`
3. `npm start`

## What works

- Infinite and Non-infinite Mode
- Pages
- Horizontal and Vertical Sliding
- Multiple Slides per page (slidesToScroll = slidesToShow)
- Left and Right Arrows to go back and forth
- Arrows have active and inactive classes.
- Custom Arrows
- **Touch Scrolling/Mouse Dragging**
- Edge Friction

## TODO

- Feature Parity with [Slick Carousel][slick]
- Examples
- Documentation
- Tests

## Comparision with Slick

### Settings

- cssEase - renamed to transitionTimingFn
- speed - renamed to transitionSpeed
- easing - Not supported: Minimum browser support ensure CSS Transistions are present.
- arrows - Alternate way: Instead of arrows pass empty `<div>` to the Slider
- appendArrows, appendDots - Not supported due the architecture of component
- mobileFirst - Alternate way: Control the size of Slider just usign css on the parent class
- prevArrow, nextArrow - Alternate way: Just put a ref on prevArrow and nextArrow
- infinite - works as expected
- initialSlide - works as expected
- rows - Alternate way: Pass pages of slides instead of slides
- slidesPerRow - Alternate Way: Pass pages of slides instead of slides
- vertical - works as expected
- swipe, verticalSwiping - merged into swipe - works as expected
- touchMove - works as expected
- draggable - works as expected
- edgeFriction - works as expected
- touchThreshold - fraction by which you should slide for slide to change - lies between 0 and 1
- autoPlay, autoPlaySpeed - works as expected. *Bonus*: If the mounted component with `autoPlay` recieve
  `autoPlay={false}` then it will pause the slider.
- zIndex - Not supported: No support for IE 9 itself requires atleast IE11
- centerPadding - Alternate way: Use css on pages to manipulate this
- customPaging - Alternate way: Just pass your slides in pages whatever way you want
- waitForAnimate - This is the default behaviour of current slider. Otherwise behaviour
  is not implemented yet.
- useCSS - Not supported: We don't have to fallback for jQuery animations for ancient browsers
  because we dont support them in first place.

**Remaining**: slidesToShow, slidesToScroll, accessibility, rtl, dots, dotClass,
pauseOnHover, pauseOnDotsHover, responsive, swipeToSlide, slide, variableWidth,
centerMode, fade, lazyLoad, respondTo

**Progress** - Total: 43 Current: 27

### Events

- beforeChange - `beforeChange(prevSlide, currSlide)` but doesn't have the event handler
- afterChange - `afterChange(prevSlide, currSlide)` but doesn't have the event handler
- swipeEvent - `swipeEvent(direction)` but doesn't have the event handler
- edgeEvent - `edgeEvent(direction)` but doesn't have the event handler
- init, reInit - Alternate way: Can be invoke in parent components lifecycle methods.
- destroy - Alternate way: Can be invoke in parent components lifecycle methods when the slider is taken out of the render tree.
- setPosition - Not positions are calculated from the DOM. So, doesn't make sense.
- breakpoint - Not implemented yet

**Progress** - Total: 9 Current: 8

### Methods

No slick method will be supported because they encourage anti-patterns in react i.e, changing
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
