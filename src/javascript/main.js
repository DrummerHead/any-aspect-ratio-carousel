import ins from './insert-css-dep';
import AarCarousel from './AarCarousel';

ins();

const getInlineAttributes = (element) => {
  const data = element.dataset;
  const result = {};

  if ({}.hasOwnProperty.call(data, 'height')) {
    result.height = data.height;
  }
  if ({}.hasOwnProperty.call(data, 'slideTransitionDuration')) {
    result.slideTransitionDuration = parseInt(data.slideTransitionDuration, 10);
  }
  if ({}.hasOwnProperty.call(data, 'imagePanning')) {
    result.imagePanning = true;
  }

  return result;
};

const initCarousels = (options) => {
  const carousels = document.querySelectorAll('.aar-carousel');

  for (const carousel of carousels) {
    const mergedOptions = Object.assign({}, options, getInlineAttributes(carousel));
    (new AarCarousel(carousel, mergedOptions)).buildUI();
  }
};

export default initCarousels;
