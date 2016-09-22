// import ins from './insert-css-dep'
// ins();

import AarCarousel from './AarCarousel';

const initCarousels = (opts) => {
  const carousels = document.querySelectorAll('.aar-carousel');

  for (const carousel of carousels) {
    (new AarCarousel(carousel, opts)).buildUI();
  }
};

export default initCarousels;
