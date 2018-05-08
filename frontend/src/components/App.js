import React, { Component } from 'react';
import { Route } from "react-router-dom";

import Category from './Category'; 
import Post from './Post'; 

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
      </div>
    )
  }
}

export default App;