'use strict';

import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export default async function getImagesByQuery(query, perPage = 3, page = 1) {
  const API_URL = 'https://pixabay.com/api/';
  const API_KEY = '50818720-8fed735658e97652981a6ffe2';

    const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    per_page: perPage,
    page,
    orientation: 'horizontal',
    safesearch: true,
  };

  try {
    const response = await axios(API_URL, { params });
    const { hits, totalHits } = response.data;
    if (hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return { hits: [], totalHits: 0 };
    }
    return { hits, totalHits };
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: `An error occurred: ${error.message}`,
      position: 'topRight',
    });
    return { hits: [], totalHits: 0 };
  }
}
