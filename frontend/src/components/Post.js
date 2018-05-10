import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Redirect } from 'react-router'
import { connect } from 'react-redux';
import MinusIcon from 'react-icons/lib/fa/minus';
import EditIcon from 'react-icons/lib/fa/pencil';
import ArrowLeftIcon from 'react-icons/lib/fa/arrow-circle-left';
import CommentsList from './CommentsList';
import Vote from './Vote';
import Datetime from './Datetime';
import { upVotePost, downVotePost } from '../actions';
import { CommentForm } from './CommentForm';

class Post extends Component {

  state = {
    addingComment: false
  }

  showAddComment = () => this.setState({ addingComment: true });
  hideAddComment = () => this.setState({ addingComment: false });

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
          <div className='post-btns'>
            <button title='Edit'
              className='icon-btn'
              onClick={() => {}}>
                <EditIcon size={15}/>
            </button>|
            <button title='Delete'
              className='icon-btn'
              onClick={() => {}}>
                <MinusIcon size={15}/>
            </button>
          </div>
        </div>
        <div className='content-post'>
          {!selectedPost
            ? <div>No post selected</div> 
            : <div>
                <h3>{selectedPost.title}</h3>
                <p>{selectedPost.body}</p>
                <p>{selectedPost.author}
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
                  <CommentForm onCancel={this.hideAddComment} />
                )}
                <CommentsList />
              </div>}
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ posts }) {
  const post = posts.posts.find(post => post.id === posts.selected.id);
  return {
    selectedPost: post
  }
}

function mapDispatchToProps (dispatch) {
  return {
    increaseVote: post => dispatch(upVotePost(post)),
    decreaseVote: post => dispatch(downVotePost(post)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);