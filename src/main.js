'use strict';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import {createGallery, clearGallery, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton, smoothScroll, } from './js/render-functions.js';
import getImagesByQuery from './js/pixabay-api';

let page = 1;
let totalHits = 0;
let perPage = 0;
let userQuery = '';

const form = document.querySelector('.form');
const searchBtn = document.querySelector('.button');
const loadMoreBtn = document.querySelector('.load-more');

form.addEventListener('submit', async event => {
  event.preventDefault();
  searchBtn.disabled = true;

  page = 1;
  totalHits = 0;

  clearGallery();
  showLoader();

  const totalHitsElement = document.querySelector('.total-hits span');
  const query = document.querySelector('[name="search-text"]').value.trim();
  if (!query) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search query.',
      position: 'topRight',
    });
    hideLoader();
    searchBtn.disabled = false;
    return;
  }
  perPage = Number(document.querySelector('[name="per-page"]').value);
  if (!perPage || perPage <= 0) {
    perPage = 6;
  }

  try {
    const { hits, totalHits: match } = await getImagesByQuery(query, perPage, page);
    totalHits = match;
    userQuery = query;
    totalHitsElement.textContent = totalHits;

    createGallery(hits);

    if (totalHits > perPage) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: `An error occurred: ${error.message}`,
      position: 'topRight',
    });
  } finally {
    hideLoader();
    searchBtn.disabled = false;
    form.reset();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  loadMoreBtn.disabled = true;
  page += 1;

  showLoader();

  try {
    const { hits } = await getImagesByQuery(userQuery, perPage, page);
    createGallery(hits);

    if (page * perPage >= totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
    smoothScroll();
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: `An error occurred: ${error.message}`,
      position: 'topRight',
    });
  } finally {
    hideLoader();
    loadMoreBtn.disabled = false;
  }
});
