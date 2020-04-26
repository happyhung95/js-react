import _ from "lodash";
import jsonPlaceholder from "../apis/jsonPlaceholder";

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts());

  /* 
  // explanation of ._chain() ...
  const userIds = _.uniq(_.map(getState().posts, "userId")); // _.uniq and _.map are in lodash library
  userIds.forEach((id) => dispatch(fetchUser(id))); 
  */

  _.chain(getState().posts)
    .map("userId")
    .uniq()
    .forEach((id) => dispatch(fetchUser(id)))
    .value();
};

//Bad approach! Need to use middleware (Redux Thunk) instead
/*
export const fetchPosts = async () => {
  const response = await jsonPlaceholder.get('/posts');

  return {
    type: 'FETCH_POSTS',
    payload: response
  };
};
*/

export const fetchPosts = () => async (dispatch) => {
  const response = await jsonPlaceholder.get("/posts");

  dispatch({ type: "FETCH_POSTS", payload: response.data });
};

export const fetchUser = (id) => async (dispatch) => {
  const response = await jsonPlaceholder.get(`/users/${id}`);

  dispatch({ type: "FETCH_USER", payload: response.data });
};

/* ._memoize approach 
export const fetchUser = (id) => (dispatch) => _fetchUser(id, dispatch);

const _fetchUser = _.memoize(async (id, dispatch) => {
  const response = await jsonPlaceholder.get(`/users/${id}`);

  dispatch({ type: "FETCH_USER", payload: response.data });
});

 
//_.memoize used to fetch data on every id only once
const _fetchUser = _.memoize(async (id, dispatch) => {
  const response = await jsonPlaceholder.get(`/users/${id}`);

  dispatch({ type: "FETCH_USER", payload: response.data });
}); */




// EXTRA! I do this myself

/* export const fetchAlbum; */

export const fetchAlbums = () => async (dispatch) => {
  const response = await jsonPlaceholder.get("/albums");

  dispatch({ type: "FETCH_ALBUMS", payload: response.data });
};

export const fetchPhotos = (albumId) => async (dispatch,getState) => {
  const response = await jsonPlaceholder.get("/photos", {
    params: {
      albumId: `${albumId}`,
    },
  });
  const album = {};
  album[albumId] = response.data;
  dispatch({ type: "FETCH_PHOTOS", payload: album});
};
