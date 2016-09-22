class AarCarousel {
  constructor(elementReference, { height = '88vh', slideTransitionDuration = 576, imagePanning = false } = {}) {
    this.elementReference = elementReference;
    this.ol = this.elementReference.querySelector('ol');
    this.chariots = this.ol.querySelectorAll('li');
    this.length = this.chariots.length;
    this.chariotWidth = 100 / this.length;

    this.height = height;
    this.slideTransitionDuration = slideTransitionDuration;
    this.imagePanning = imagePanning;

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

  panAfterTransition() {
    this.chariots[this.prevImageNumber].querySelector('img').classList.remove('pan');
    this.chariots[this.imageNumber].querySelector('img').classList.add('pan');
  }

  attachControls() {
    this.elementReference.insertAdjacentHTML('beforeend', `
      <div class='aar-carousel__controls'>
        <div class='aar-carousel__prev'>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>
            <path d='M56.3 17.5l10 10L43.5 50l22.6 22.6-10 10L24 50'/>
          </svg>
        </div>
        <div class='aar-carousel__next'>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>
            <path d='M43.7 17.5l-10 10L56.5 50 33.8 72.6l10 10L76 50'/>
          </svg>
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

    if (this.imagePanning) {
      this.elementReference.classList.add('aar--image-panning');
      this.ol.addEventListener('transitionend', () => this.panAfterTransition());
    }

    for (const chariot of this.chariots) {
      chariot.style.width = `${this.chariotWidth}%`;
    }

    this.attachControls();
    this.goToImage(0);
  }
}

export default AarCarousel;
