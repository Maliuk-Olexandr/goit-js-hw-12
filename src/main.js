'use strict';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
  smoothScroll,
} from './js/render-functions.js';
import getImagesByQuery from './js/pixabay-api';

let page = 1;
let totalHits = 0;
let perPage = 0;
let userQuery = '';

const form = document.querySelector('.form');
const searchBtn = document.querySelector('.button');
const loadMoreBtn = document.querySelector('.load-more');

form.addEventListener('submit', event => {
  searchBtn.disabled = true;
  event.preventDefault();
  page = 1;
  totalHits = 0;

  clearGallery();
  showLoader();

  const totalHitsElement = document.querySelector('.total-hits span');
  const query = document.querySelector('[name="search-text"]').value.trim();
  perPage = Number(document.querySelector('[name="per-page"]').value);
  if (!perPage || perPage <= 0) {
    perPage = 3;
  }

  getImagesByQuery(query, perPage, page)
    .then(({ hits, totalHits: match }) => {
      totalHits = match;
      userQuery = query;
      totalHitsElement.textContent = totalHits;

      createGallery(hits);
      if (totalHits > perPage) {
        showLoadMoreButton();
      } else {
        hideLoadMoreButton();
      }
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
      searchBtn.disabled = false;
    });
});

loadMoreBtn.addEventListener('click', () => {
  loadMoreBtn.disabled = true;
  page += 1;
  showLoader();
  getImagesByQuery(userQuery, perPage, page)
    .then(({ hits }) => {
      createGallery(hits);
      smoothScroll();
      if (page * perPage >= totalHits) {
        hideLoadMoreButton();
        iziToast.info({
          title: 'Info',
          message: "We're sorry, but you've reached the end of search results.",
          position: 'topRight',
        });
      }
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
      loadMoreBtn.disabled = false;
    });
});
