import axios from 'axios';

import {API_KEY} from './config'; //API_KEY is private

export default axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    part: 'snippet',
    maxResults: 8,
    key: API_KEY
  }
});

