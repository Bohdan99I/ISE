import { gallery } from '../index';

function scroll() {
  if (!gallery) {
    return;
  }

  const firstGalleryElement = gallery.firstElementChild;

  if (!firstGalleryElement) {
    return;
  }

  const { height: firstElementHeight } =
    firstGalleryElement.getBoundingClientRect();

  window.scrollBy({
    top: firstElementHeight * 2,
    behavior: 'smooth',
  });
}

export { scroll };
