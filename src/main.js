import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import { CONSTANTS } from './js/constants';
import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.form');
const input = document.querySelector('.input');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

const popUpConfig = {
  message: null,
  iconUrl: '/img/error-icon.png',
  messageColor: 'white',
  backgroundColor: '#EF4040',
  position: 'topRight',
};

const searchParams = new URLSearchParams({
  key: CONSTANTS.API_KEY,
  q: null,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
});

form.addEventListener('submit', e => {
  e.preventDefault();
  const galleryLightBox = new SimpleLightbox('.gallery-photo a');

  gallery.innerHTML = '';

  if (!input.value) {
    showErrorPopUp(CONSTANTS.ERROR_MESSAGES.EMPTY_INPUT);
  } else {
    loader.classList.remove('hidden');
    searchParams.set('q', `${input.value}`);

    fetch(`${CONSTANTS.API_URL}?${searchParams}`, {
      headers: {
        Accept: 'application/json',
      },
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          loader.classList.add('hidden');
          throw new Error(response.status);
        }
      })
      .then(data => {
        if (!data.hits.length) {
          showErrorPopUp(CONSTANTS.ERROR_MESSAGES.IMAGES_NOT_FOUND);
        } else {
          gallery.insertAdjacentHTML('beforeend', htmlMarkupCreator(data.hits));
          galleryLightBox.refresh();
        }
        loader.classList.add('hidden');
      })
      .catch(error => {
        console.debug(error);
        showErrorPopUp(CONSTANTS.ERROR_MESSAGES.RESOURSE_ERROR);
      });
  }
});

function htmlMarkupCreator(galleryItems) {
  return galleryItems
    .map(item => {
      const {
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = item;
      return `<li>
      <div class="gallery-photo">
        <a href="${largeImageURL}"
          ><img src="${webformatURL}" alt="${tags}"
        /></a>
      </div>
      <div class="text-wrapper">
        <div class="list-item-container">
          <p class="header-text">likes</p>
          <p>${likes}</p>
        </div>
        <div class="list-item-container">
          <p class="header-text">Views</p>
          <p>${views}</p>
        </div>
        <div class="list-item-container">
          <p class="header-text">Comments</p>
          <p>${comments}</p>
        </div>
        <div class="list-item-container">
          <p class="header-text">Downloads</p>
          <p>${downloads}</p>
        </div>
      </div>
    </li>`;
    })
    .join('');
}

function showErrorPopUp(message) {
  iziToast.show({
    ...popUpConfig,
    message,
  });
}
