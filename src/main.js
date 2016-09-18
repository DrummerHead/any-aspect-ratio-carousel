import { readFileSync } from 'fs';
import insertCss from 'insert-css';
import { join } from 'path';

// TODO: Find a way to not require join codebase
const css = readFileSync(join(__dirname, 'main.css'), 'utf8');
insertCss(css);

const buildCarousel = (element) => {
  console.log(element);
}

const anyResolutionCarousel = (selector) => {
  const carousels = document.querySelectorAll(selector);
  for(const carousel of carousels) {
    buildCarousel(carousel);
  }
};

export default anyResolutionCarousel