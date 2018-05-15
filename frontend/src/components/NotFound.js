import React, { Component} from 'react';
import { Link } from "react-router-dom";
import PageNotFound from '../images/404.jpg';

class NotFound extends Component {
  render() {
    return (
      <div className='container'>
        <div className='not-found'>
        <center>
          <img src={PageNotFound} alt='Page not found' className='not-found-image' />
        </center>
        <center>
          <h2 className='not-found-title'>
            Page not found
          </h2>
        </center>
        <center>
          <h3 className='not-found-title'>
            <Link to="/">Return to Posts</Link>
          </h3>
        </center>
        </div>
      </div>
    )
  }
}

export default NotFound;