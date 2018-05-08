import React, { Component } from 'react';
import { connect } from 'react-redux';

export class CommentsList extends Component {
  render() {
    const { comments } = this.props;

    return (
      <ul className='comments-list'>
      {comments && comments.map((comment) => (
        <li key={comment.id}>
          <p>{comment.body}</p>
          <p>{comment.voteScore}</p>
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
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentsList);