import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.form');
const input = document.querySelector('.input');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

const searchParams = new URLSearchParams({
  key: '42384910-73277182c896d015737fb8e33',
  q: null,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
});

form.addEventListener('submit', e => {
  const galleryLightBox = new SimpleLightbox('.gallery-photo a');
  e.preventDefault();

  gallery.innerHTML = '';

  if (input.value === '') {
    iziToast.show({
      message: 'Input must not be empty. Please try again!',
      iconUrl: '/img/error-icon.png',
      messageColor: 'white',
      backgroundColor: '#EF4040',
      position: 'topRight',
    });
  } else {
    loader.classList.remove('hidden');
    searchParams.set('q', `${input.value}`);

    fetch(`https://pixabay.com/api?${searchParams}`, {
      headers: {
        Accept: 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then(data => {
        if (data.hits.length < 1) {
          loader.classList.add('hidden');
          iziToast.show({
            message:
              'Sorry, there are no images matching your search query. Please try again!',
            iconUrl: '/img/error-icon.png',
            messageColor: 'white',
            backgroundColor: '#EF4040',
            position: 'topRight',
          });
        } else {
          const markup = data.hits
            .map(
              hit => `<li>
      <div class="gallery-photo">
        <a href="${hit.largeImageURL}"
          ><img src="${hit.webformatURL}" alt="${hit.tags}"
        /></a>
      </div>
      <div class="text-wrapper">
        <div class="list-item-container">
          <p class="header-text">likes</p>
          <p>${hit.likes}</p>
        </div>
        <div class="list-item-container">
          <p class="header-text">Views</p>
          <p>${hit.views}</p>
        </div>
        <div class="list-item-container">
          <p class="header-text">Comments</p>
          <p>${hit.comments}</p>
        </div>
        <div class="list-item-container">
          <p class="header-text">Downloads</p>
          <p>${hit.downloads}</p>
        </div>
      </div>
    </li>`
            )
            .join('');
          loader.classList.add('hidden');
          gallery.insertAdjacentHTML('beforeend', markup);
          galleryLightBox.refresh();
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
});
