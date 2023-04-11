import axios from 'axios';

const API_KEY = '33742553-8bb04a1a84c196e6fa85b3bbd';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export function fetchImages(search, page) {
  return axios('', {
    params: {
      key: API_KEY,
      page: page,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
      q: search,
    },
  });
}
