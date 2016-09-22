class SwipeEvent {
  constructor(swipeElement) {
    this.swipeElement = swipeElement;
    this.touchstart = {
      x: -1,
      y: -1,
    };
    this.touchmove = {
      x: -1,
      y: -1,
    };
    this.swipeRightEvent = new window.Event('swiperight');
    this.swipeLeftEvent = new window.Event('swipeleft');
  }


  touchHandler(event) {
    let touch;
    if (typeof event !== 'undefined') {
      event.preventDefault();
      if (typeof event.touches !== 'undefined') {
        touch = event.touches[0];
        switch (event.type) {
          case 'touchstart':
          case 'touchmove':
            this[event.type].x = touch.pageX;
            this[event.type].y = touch.pageY;
            break;
          case 'touchend':
            if (this.touchstart.x > -1 && this.touchmove.x > -1) {
              if (this.touchstart.x < this.touchmove.x) {
                this.swipeElement.dispatchEvent(this.swipeRightEvent);
              } else {
                this.swipeElement.dispatchEvent(this.swipeLeftEvent);
              }
            }
            break;
          default:
            break;
        }
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
