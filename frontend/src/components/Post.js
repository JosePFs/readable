import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import ArrowLeftIcon from 'react-icons/lib/fa/arrow-circle-left';

import CommentsList from './CommentsList';
import Vote from './Vote';
import Datetime from './Datetime';
import Actions from './Actions';
import { upVotePost, downVotePost, deletePost } from '../actions';
import CommentForm from './CommentForm';
import { capitalize } from '../utils/helpers';

class Post extends Component {

  state = {
    addingComment: false
  }

  showAddComment = () => this.setState({ addingComment: true });
  hideAddComment = () => this.setState({ addingComment: false });

  deletePost = (post) => {
    this.props.deletePost(post);
    this.props.history.push('/');
  }

  editPost = (post) => {
    this.props.history.push(`/edit/post/${post.id}`);
  }

  render() {
    const { selectedPost, increaseVote, decreaseVote } = this.props;
    const { addingComment } = this.state;

    if (!selectedPost) {
      return <Redirect to='/'/>
    }

    return (
      <div className='container'>
        <div className='nav'>
          <Link to='/' className='back-btn'><ArrowLeftIcon size={25}/> Back</Link>
        </div>
        <div className='content-post'>
          <Actions 
            onEdit={() => this.editPost(selectedPost)}
            onDelete={() => this.deletePost(selectedPost)} 
          />
          {!selectedPost
            ? <div>No post selected</div> 
            : <div>
                <h3 className='post-category'>{selectedPost.title}</h3><small>[{capitalize(selectedPost.category)}]</small>
                <p>{selectedPost.body}</p>
                <p>{selectedPost.author} -
                <Datetime timestamp={selectedPost.timestamp} />
                </p>
                <Vote 
                  item={selectedPost}
                  onIncrease={() => increaseVote(selectedPost)}
                  onDecrease={() => decreaseVote(selectedPost)}
                />
                <div className='text-btn-wrapper'>
                  <button disabled={addingComment}
                    className='text-btn'
                    onClick={this.showAddComment}>
                      Add comment
                  </button>
                </div>
                {addingComment && (
                  <CommentForm onClose={this.hideAddComment} />
                )}
                <CommentsList />
              </div>}
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ posts, categories }) {
  const post = posts.posts.find(post => post.id === posts.selected.id);
  return {
    selectedPost: post,
    category: categories.selected
  }
}

function mapDispatchToProps (dispatch) {
  return {
    increaseVote: post => dispatch(upVotePost(post)),
    decreaseVote: post => dispatch(downVotePost(post)),
    deletePost: post => dispatch(deletePost(post))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Post));