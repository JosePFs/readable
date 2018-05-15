import React, { Component } from 'react';
import { connect } from 'react-redux';

import Datetime from './Datetime';
import Vote from './Vote';
import Comment from './Comment';
import * as actions from '../actions/commentActions';

export class CommentsList extends Component {

  render() {
    const { comments, upVoteComment, downVoteComment } = this.props;

    return (
      <ul className='comments-list'>
      {comments && comments.map((comment) => (
        <li key={comment.id}>
          <hr className='comment-separator' />
          <Comment comment={comment} />
          <p>{comment.author} -
            <Datetime timestamp={comment.timestamp} />
          </p>          
          <Vote 
            item={comment}
            onIncrease={() => upVoteComment(comment)}
            onDecrease={() => downVoteComment(comment)}
          />
        </li>
      ))}
      </ul>
    )
  }
}

function mapStateToProps ({ comment }) {
  return {
    comments: comment.comments
  }
}

export default connect(
  mapStateToProps,
  actions
)(CommentsList);