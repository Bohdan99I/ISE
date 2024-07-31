import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getGallery, totalPages } from './js/api';
import { scroll } from './js/scroll';
import { createGalleryItem } from './js/createMarkup';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const guard = document.querySelector('.guard');
const lightbox = new SimpleLightbox('.gallery a');

let query = '';
let page = 1;

const options = {
  root: null,
  rootMargin: '100px',
  threshold: 0,
};

const observer = new IntersectionObserver(onPagination, options);

if (form) {
  form.addEventListener('change', onInput);
  form.addEventListener('submit', onSubmit);
}

async function addGallerySubmit() {
  try {
    const response = await getGallery(query, page);
    addImages(response);

    if (page !== totalPages) {
      observer.observe(guard);
    }
  } catch (error) {
    console.error('Error loading gallery:', error);
  }
}

async function addGalleryPag() {
  try {
    scroll();

    const response = await getGallery(query, page);
    const images = response.data.hits;

    createGalleryItem(images);
    lightbox.refresh();

    if (page >= totalPages) {
      Notiflix.Notify.warning(
        "We're sorry, but you've reached the end of search results."
      );
    }
  } catch (error) {
    console.error('Error loading gallery:', error);
  }
}

function onInput(evt) {
  query = evt.target.value?.trim();
  return query;
}

function onSubmit(evt) {
  evt.preventDefault();
  page = 1;
  if (gallery) {
    gallery.innerHTML = '';
  }

  if (!evt.target.elements.searchQuery.value) {
    Notiflix.Notify.failure('Please, enter a search query');
  } else {
    addGallerySubmit();
  }
}

function addImages(response) {
  const images = response.data.hits;

  if (!images.length) {
    if (gallery) {
      gallery.innerHTML = '';
    }
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  } else {
    createGalleryItem(images);
    Notiflix.Notify.success(
      `Hooray! We found ${response.data.totalHits} images.`
    );
    lightbox.refresh();
  }
}

function onPagination(entries, observer) {
  entries.forEach(entry => {
    console.log(entry);

    if (entry.isIntersecting) {
      page += 1;
      addGalleryPag();
      if (page >= totalPages) {
        observer.unobserve(guard);
      }
    }
  });
}

export { gallery };
