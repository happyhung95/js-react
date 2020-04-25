import {combineReducers} from 'redux';
import postsReducer from './postsReducer';
import usersReducer from './usersReducer';
import albumsReducer from './albumsReducer';
import photosReducer from './photosReducer';

export default combineReducers({
  posts: postsReducer,
  users: usersReducer,
  albums: albumsReducer,
  photos: photosReducer
});