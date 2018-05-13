import React, { Component} from 'react';
import { Link } from "react-router-dom";

class NotFound extends Component {
  render() {
    return (
      <div className='container'>
        <div className='content not-found-content'>
          <div className='not-found'>
            <h1 className='not-found-title'>Not Found</h1>
            <Link to='/' className='text-btn'>Back</Link>
          </div>
        </div> 
      </div>
    )
  }
}

export default NotFound;