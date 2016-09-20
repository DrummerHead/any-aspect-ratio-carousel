class AarCarousel {
  constructor(elementReference, { height = '90vh', slideTransitionDuration = 576 } = {}) {
    this.elementReference = elementReference;
    this.ol = this.elementReference.querySelector('ol');
    this.chariots = this.ol.querySelectorAll('li');
    this.length = this.chariots.length;
    this.chariotWidth = 100 / this.length;

    this.height = height;
    this.slideTransitionDuration = slideTransitionDuration;

    this.imageNumber = 0;
    this.prevImageNumber = 0;

    this.buildUI();
  }

  safeImageNumber(imageNumber) {
    return ((imageNumber % this.length) + this.length) % this.length;
  }

  nextImage() {
    this.goToImage(this.imageNumber + 1);
  }

  previousImage() {
    this.goToImage(this.imageNumber - 1);
  }

  goToImage(imageNumber) {
    this.prevImageNumber = this.imageNumber;
    this.imageNumber = this.safeImageNumber(imageNumber);

    this.ol.style.transform = `translateX(-${this.chariotWidth * this.imageNumber}%)`;
  }

  afterTransition() {
    this.chariots[this.prevImageNumber].querySelector('img').classList.remove('pan');
    this.chariots[this.imageNumber].querySelector('img').classList.add('pan');
  }

  attachControls() {
    this.elementReference.insertAdjacentHTML('beforeend', `
      <div class='aar-carousel__controls'>
        <div class='aar-carousel__prev'>
          prev
        </div>
        <div class='aar-carousel__next'>
          next
        </div>
      </div>
    `);
    const prev = this.elementReference.querySelector('.aar-carousel__prev');
    const next = this.elementReference.querySelector('.aar-carousel__next');
    prev.addEventListener('click', () => this.previousImage());
    next.addEventListener('click', () => this.nextImage());
  }

  buildUI() {
    this.elementReference.style.height = this.height;

    this.ol.style.width = `${this.length * 100}%`;
    this.ol.style.transitionDuration = `${this.slideTransitionDuration}ms`;
    this.ol.addEventListener('transitionend', () => this.afterTransition());

    for (const chariot of this.chariots) {
      chariot.style.width = `${this.chariotWidth}%`;
    }

    this.attachControls();
    this.goToImage(0);
  }
}

export default AarCarousel;
