import axios from 'axios';

import {API_KEY} from './config'; //API_KEY is private

console.log(API_KEY);

export default axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    part: 'snippet',
    maxResults: 5,
    key: API_KEY
  }
});

