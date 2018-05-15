import {
  RECEIVE_CATEGORY_POSTS,
  RECEIVE_POSTS,
  RECEIVE_POST,
  UP_VOTE_POST,
  DOWN_VOTE_POST,
  SELECT_POST,
  SAVE_POST,
  DELETE_POST,
  UPDATE_POST,
  SAVE_COMMENT,
  DELETE_COMMENT
} from '../actions/types';

function post (state = {posts: []}, action) {
  const { posts, post, comment } = action;

  switch (action.type) {
    case RECEIVE_CATEGORY_POSTS:    
    case RECEIVE_POSTS:
      return {
        ...state,
        posts
      };
    case RECEIVE_POST:
    case UP_VOTE_POST:
    case DOWN_VOTE_POST:
      return {
        ...state,
        posts: state.posts.map(postElement => {
          if (postElement.id === post.id) {
            return post;
          }
          return postElement;
        })
      };
    case SELECT_POST:
      return {
        ...state,
        selected: post
      };
    case SAVE_POST:
      const newPosts = [post].concat(state.posts);
      return {
        ...state,
        posts: newPosts
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(element => element.id !== post.id)
      };
    case UPDATE_POST:
      return {
        ...state,
        posts: state.posts.map(element => {
          if (element.id === post.id) {
            return post;
          }
          return element;
        })
      };
      case SAVE_COMMENT:
        return {
          ...state,
          posts: state.posts.map(post => {
            if (post.id === comment.parentId) {
                post.commentCount++;
            }
            return post;
          })
        };
      case DELETE_COMMENT:
        return {
          ...state,
          posts: state.posts.map(post => {
            if (post.id === comment.parentId) {
              if (post.commentCount > 0) {
                post.commentCount--;
              }
            }
            return post;
          })
        };
    default :
      return state;
  }
}

export default post;