import React, { Component } from 'react';
import { connect } from 'react-redux';
import Datetime from './Datetime';
import Vote from './Vote';
import { upVoteComment, downVoteComment } from '../actions';

export class CommentsList extends Component {
  render() {
    const { comments, increaseVote, decreaseVote } = this.props;

    return (
      <ul className='comments-list'>
      {comments && comments.map((comment) => (
        <li key={comment.id}>
          <hr className='comment-separator' />
          <p>{comment.body}</p>
          <p>{comment.author}
            <Datetime timestamp={comment.timestamp} />
          </p>          
          <Vote 
            item={comment}
            onIncrease={() => increaseVote(comment)}
            onDecrease={() => decreaseVote(comment)}
          />
        </li>
      ))}
      </ul>
    )
  }
}

function mapStateToProps ({ comments }) {
  return {
    comments: comments.comments
  }
}

function mapDispatchToProps (dispatch) {
  return {
    increaseVote: comment => dispatch(upVoteComment(comment)),
    decreaseVote: comment => dispatch(downVoteComment(comment)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentsList);