class SwipeEvent {
  constructor(swipeElement) {
    this.swipeElement = swipeElement;
    this.touchstartX = 0;
    this.touchmoveX = 0;
    this.isNewSwipe = true;

    this.swipeRightEvent = new window.Event('swiperight');
    this.swipeLeftEvent = new window.Event('swipeleft');
  }

  determineDirection() {
    if (this.isNewSwipe) {
      if (this.touchstartX < this.touchmoveX) {
        this.swipeElement.dispatchEvent(this.swipeRightEvent);
      } else {
        this.swipeElement.dispatchEvent(this.swipeLeftEvent);
      }
      this.isNewSwipe = false;
    }
  }

  touchHandler(event) {
    event.preventDefault();
    if (typeof event.touches !== 'undefined') {
      const touch = event.touches[0];

      switch (event.type) {
        case 'touchstart':
          this.touchstartX = touch.pageX;
          break;
        case 'touchmove':
          this.touchmoveX = touch.pageX;
          this.determineDirection();
          break;
        case 'touchend':
          this.isNewSwipe = true;

        // no default
      }
    }
  }

  init() {
    this.swipeElement.addEventListener('touchstart', event => this.touchHandler(event), false);
    this.swipeElement.addEventListener('touchmove', event => this.touchHandler(event), false);
    this.swipeElement.addEventListener('touchend', event => this.touchHandler(event), false);
  }
}

export default SwipeEvent;
