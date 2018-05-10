import React, { Component } from 'react';
import { Route } from "react-router-dom";

import Category from './Category'; 
import Post from './Post'; 
import PostForm from './PostForm';

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path='/' render={() => (
          <Category />
        )}/>
        <Route path='/post' render={() => (
          <Post />
        )}/>
        <Route path='/addpost' render={() => (
          <PostForm />
        )}/>
      </div>
    )
  }
}

export default App;