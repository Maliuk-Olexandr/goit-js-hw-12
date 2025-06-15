'use strict';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions.js';
import getImagesByQuery from './js/pixabay-api';

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();

  clearGallery();
  showLoader();

  const query = document.querySelector('[name="search-text"]').value.trim();
  const perPage = document.querySelector('[name="per-page"]').value;

  getImagesByQuery(query, perPage)
    
    .then(hits => {
      createGallery(hits);
    })

    .catch(error => {
      iziToast.error({
        title: 'Error',
        message: `An error occurred: ${error.message}`,
        position: 'topRight',
      });
    })

    .finally(() => {
      hideLoader();
      form.reset();
    });
});
