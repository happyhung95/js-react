import React from 'react';
import PostList from './PostList';
import AlbumList from './AlbumList';

const App = () => {
  return ( 
  <div className="ui container">
    <PostList />

    {/* I do this myself */}
    <h2 className="ui header">Album list by user</h2>
    Albums and photos source: https://jsonplaceholder.typicode.com/
    <AlbumList />
  </div>
  )};

export default App;