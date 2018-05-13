import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";

import Category from './Category'; 
import Post from './Post'; 
import PostForm from './PostForm';
import NotFound from './NotFound';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/add/new/post' component={PostForm} />
          <Route exact path='/edit/post/:postId' component={PostForm} />
          <Route exact path='/:category/:postId' component={Post} />
          <Route exact path='/:category?' component={Category} />
          <Route component={NotFound} />
        </Switch>
      </div>
    )
  }
}

export default App;