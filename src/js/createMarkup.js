import { gallery } from '../index';

function createGalleryItem(images) {
  if (!Array.isArray(images) || images.length === 0) {
    console.warn('No images provided to createGalleryItem.');
    return;
  }

  const markup = images.map(createImageMarkup).join('');
  gallery.insertAdjacentHTML('beforeend', markup);
}

function createImageMarkup(image) {
  const {
    largeImageURL,
    webformatURL,
    tags,
    likes,
    views,
    comments,
    downloads,
  } = image;

  return `
    <a class="gallery__item" target="_self" href="${largeImageURL}">
      <div class="img-container">
        <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy"/>
      </div>
      <div class="info">
        ${createInfoMarkup('Likes', likes)}
        ${createInfoMarkup('Views', views)}
        ${createInfoMarkup('Comments', comments)}
        ${createInfoMarkup('Downloads', downloads)}
      </div>
    </a>`;
}

function createInfoMarkup(label, value) {
  return `<p class="info-item"><b>${label}</b> <br>${value}</p>`;
}

export { createGalleryItem };
