import axios from 'axios';
import {API_KEY} from './config' //gitignore

export default axios.create({
    baseURL: 'https://api.unsplash.com',
    headers: {Authorization: `Client-ID ${API_KEY}`}, //API_KEY is private
});