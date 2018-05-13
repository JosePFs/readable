import { combineReducers } from 'redux';
import { capitalize } from '../utils/helpers';

import {
  RECEIVE_CATEGORIES,
  SELECT_CATEGORY,
  RECEIVE_POSTS,
  RECEIVE_POST,
  UP_VOTE_POST,
  DOWN_VOTE_POST,
  SELECT_POST,
  RECEIVE_COMMENTS,
  UP_VOTE_COMMENT,
  DOWN_VOTE_COMMENT,
  SAVE_POST,
  DELETE_POST,
  UPDATE_POST,
  SAVE_COMMENT,
  DELETE_COMMENT,
  UPDATE_COMMENT
} from '../actions'

function categories (state = {categories: [], selected: ''}, action) {
  const { categories, category } = action;

  switch (action.type) {
    case RECEIVE_CATEGORIES:
      const optionsCategoryFormated = categories.map((category) => (
        {value: category.path, label: capitalize(category.name)}));
      optionsCategoryFormated.unshift({value: 'all', label: 'All'});
      return {
        ...state,
        categories: optionsCategoryFormated,
        selected: optionsCategoryFormated[0]
      };
    case SELECT_CATEGORY:
      return {
        ...state,
        selected: category
      };
    default :
      return state;
  }
}

function posts (state = {posts: []}, action) {
  const { posts, post, comment } = action;

  switch (action.type) {
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

function comments (state = {comments: []}, action) {
  const { comments, comment } = action;

  switch (action.type) {
    case RECEIVE_COMMENTS:
      return {
        ...state,
        comments
      };
    case UP_VOTE_COMMENT:
      return {
        ...state,
        comments: state.comments.map(commentElement => {
          if (commentElement.id === comment.id) {
            return comment;
          }
          return commentElement;
        })
      };
    case DOWN_VOTE_COMMENT:
      return {
        ...state,
        comments: state.comments.map(commentElement => {
          if (commentElement.id === comment.id) {
            return comment;
          }
          return commentElement;
        })
      };
    case SAVE_COMMENT:
      const newComments = [comment].concat(state.comments);
      return {
        ...state,
        comments: newComments
      };
    case UPDATE_COMMENT:
      return {
        ...state,
        comments: state.comments.map(element => {
          if (element.id === comment.id) {
            return comment;
          }
          return element;
        })
      };
    case DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(element => element.id !== comment.id)
      };
    default :
      return state;
  }
}

export default combineReducers({
  categories,
  posts,
  comments
})