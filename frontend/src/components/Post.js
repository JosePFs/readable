import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Redirect } from 'react-router'
import { connect } from 'react-redux';
import MinusIcon from 'react-icons/lib/fa/minus';
import EditIcon from 'react-icons/lib/fa/pencil';
import ArrowLeftIcon from 'react-icons/lib/fa/arrow-circle-left';
import CommentsList from './CommentsList';
import Vote from './Vote';
import { upVotePost, downVotePost } from '../actions';

class Post extends Component {

  render() {
    const { selectedPost, increaseVotePost, decreaseVotePost, comments } = this.props;

    if (!selectedPost) {
      return <Redirect to='/'/>
    }

    return (
      <div className='container'>
        <div className='nav'>
          <Link to='/' className='back-btn'><ArrowLeftIcon size={25}/></Link>
          <div className='post-btns'>
            <button
              className='icon-btn'
              onClick={() => {}}>
                <EditIcon size={15}/>
            </button>|
            <button
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
                  <small className='selectedPost-date'>
                    <span className='time-date'>
                      {new Date(Number(selectedPost.timestamp)).getFullYear()}-
                      {("0" + new Date(Number(selectedPost.timestamp)).getMonth()).substr(-2)}-
                      {("0" + new Date(Number(selectedPost.timestamp)).getDay()).substr(-2)}
                    </span>
                    <span className='time-date'>
                      {("0" + new Date(Number(selectedPost.timestamp)).getHours()).substr(-2)}:
                      {("0" + new Date(Number(selectedPost.timestamp)).getMinutes()).substr(-2)}:
                      {("0" + new Date(Number(selectedPost.timestamp)).getSeconds()).substr(-2)}
                    </span>
                  </small>
                </p>
                <Vote 
                  item={selectedPost}
                  onIncrease={() => increaseVotePost(selectedPost)}
                  onDecrease={() => decreaseVotePost(selectedPost)}
                />
                <div className='text-btn-wrapper'>
                  <button
                    className='text-btn'
                    onClick={() => {}}>
                      Add comment
                  </button>
                </div>
                <CommentsList comments={comments.comments} />
              </div>}
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ posts, comments }) {
  const post = posts.posts.find(post => post.id === posts.selected.id);
  return {
    selectedPost: post,
    comments
  }
}

function mapDispatchToProps (dispatch) {
  return {
    increaseVotePost: post => dispatch(upVotePost(post)),
    decreaseVotePost: post => dispatch(downVotePost(post)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);