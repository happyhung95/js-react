import React from 'react';
import PostList from './PostList';
import AlbumList from './AlbumList';

const App = () => {
  return ( 
  <div className="ui container">
    <AlbumList />
    <PostList />
  </div>
  )};

export default App;