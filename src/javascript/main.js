// import ins from './insert-css-dep'
// ins();

const buildCarousel = (element) => {
  console.log(element);
  console.log(5);
}

const anyResolutionCarousel = () => {
  const carousels = document.querySelectorAll('.aar-carousel');
  for(const carousel of carousels) {
    buildCarousel(carousel);
  }
};

export default anyResolutionCarousel