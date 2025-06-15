'use strict';

import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export default function getImagesByQuery(query, perPage = 3) {
  const params = new URLSearchParams({
    key: '50818720-8fed735658e97652981a6ffe2',
    q: query,
    image_type: 'photo',
    per_page: perPage,
    orientation: 'horizontal',
    safesearch: true,
  });
  const api = 'https://pixabay.com/api/';

  return axios(`${api}?${params}`)
    .then(response => {
      const { hits } = response.data;
      if (hits.length === 0) {
        iziToast.error({
          title: 'Error',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
        return [];
      }
      return hits;
    })
    .catch(error => {
      iziToast.error({
        title: 'Error',
        message: `An error occurred: ${error.message}`,
        position: 'topRight',
      });
      return [];
    });
}
