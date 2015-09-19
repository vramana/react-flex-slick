const SWIPE_UP = 'SWIPE_UP';
const SWIPE_DOWN = 'SWIPE_DOWN';
const SWIPE_LEFT = 'SWIPE_LEFT';
const SWIPE_RIGHT = 'SWIPE_RIGHT';

const swipeDirection = touchOubject => {
  const { startX, startY, currX, currY } = touchOubject;

  const deltaX = currX - startX;
  const deltaY = currY - startY;

  const angle = Math.abs(Math.round((Math.atan2(deltaY, deltaX) * 180) / Math.PI));

  if (angle < 45 && deltaX > 0) {
    return SWIPE_LEFT;
  } else if (angle < 45 && deltaX > 0) {
    return SWIPE_RIGHT;
  } else if (angle > 45 && angle < 90 && deltaY > 0) {
    return SWIPE_UP;
  } else if (angle > 45 && angle < 90 && deltaY < 0) {
    return SWIPE_DOWN;
  }
};

export {
  swipeDirection,
  SWIPE_UP,
  SWIPE_DOWN,
  SWIPE_LEFT,
  SWIPE_RIGHT
};
