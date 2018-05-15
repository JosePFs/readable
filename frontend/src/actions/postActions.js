import * as ResourcesAPI from '../utils/ResourcesAPI';
import {
  RECEIVE_POSTS,
  RECEIVE_CATEGORY_POSTS,
  RECEIVE_POST,
  UP_VOTE_POST,
  DOWN_VOTE_POST,
  SELECT_POST,
  SAVE_POST,
  UPDATE_POST,
  DELETE_POST
} from './types';

export const receiveCategoryPosts = posts => ({
  type: RECEIVE_CATEGORY_POSTS,
  posts
});

export const fetchCategoryPosts = (category) => dispatch => (
    ResourcesAPI.getCategoryPosts(category)
    .then(posts => dispatch(receiveCategoryPosts(posts)))
);

export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts
});

export const fetchPosts = () => dispatch => (
    ResourcesAPI.getAllPosts()
    .then(posts => dispatch(receivePosts(posts)))
);

export const receivePost = post => ({
  type: RECEIVE_POST,
  post
});

export const getPost = (postId) => dispatch => (
    ResourcesAPI.getPost(postId)
    .then(post => {
      dispatch(selectPost(post));
    })
);

export const increaseVotePost = post => ({
  type: UP_VOTE_POST,
  post
});

export const upVotePost = (post) => dispatch => (
    ResourcesAPI.upVotePost(post)
    .then(post => dispatch(increaseVotePost(post)))
);

export const decreaseVotePost = post => ({
  type: DOWN_VOTE_POST,
  post
});

export const downVotePost = (post) => dispatch => (
    ResourcesAPI.downVotePost(post)
    .then(post => dispatch(decreaseVotePost(post)))
);

export const selectPost = post => ({
  type: SELECT_POST,
  post
});

export const persistPost = post => ({
  type: SAVE_POST,
  post
});

export const savePost = (post) => dispatch => (
  ResourcesAPI.savePost(post)
  .then(post => dispatch(persistPost(post)))
);

export const removePost = post => ({
  type: DELETE_POST,
  post
});

export const deletePost = (post) => dispatch => (
  ResourcesAPI.deletePost(post)
  .then(post => dispatch(removePost(post)))
);

export const refreshPost = post => ({
  type: UPDATE_POST,
  post
});

export const updatePost = (post) => dispatch => (
  ResourcesAPI.updatePost(post)
  .then(post => dispatch(refreshPost(post)))
);