import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import ArrowLeftIcon from 'react-icons/lib/fa/arrow-circle-left';

import CommentsList from './CommentsList';
import Vote from './Vote';
import Datetime from './Datetime';
import Actions from './Actions';
import { upVotePost, downVotePost, deletePost, getPost } from '../actions/postActions';
import { fetchComments } from '../actions/commentActions';
import CommentForm from './CommentForm';
import { capitalize } from '../utils/helpers';

class Post extends Component {

  state = {
    addingComment: false
  }

  componentDidMount() {
    const { params, getPost, getComments } = this.props;
    if (params.category && params.postId) {
      getPost(params.postId);
      getComments(params.postId);
    }
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

    if (selectedPost && selectedPost.error) {
      return <Redirect to='/post/was/not/found' />;
    }

    return (
      <div>
      {selectedPost && (
        <div className='container'>
          <div className='nav'>
            <Link to='/' className='back-btn'><ArrowLeftIcon size={25}/> Back</Link>
          </div>
          <div className='content-post'>
            <Actions 
              onEdit={() => this.editPost(selectedPost)}
              onDelete={() => this.deletePost(selectedPost)} 
            />
            <div>
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
              </div>
          </div>
        </div>
      )}
      </div>
    )
  }
}

function mapStateToProps ({ post, category }, { match: { params } }) {
  return {
    selectedPost: post.selected,
    category: category.selected,
    params
  }
}

function mapDispatchToProps (dispatch) {
  return {
    increaseVote: post => dispatch(upVotePost(post)),
    decreaseVote: post => dispatch(downVotePost(post)),
    deletePost: post => dispatch(deletePost(post)),
    getPost: postId => dispatch(getPost(postId)),
    getComments: postId => dispatch(fetchComments(postId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Post));