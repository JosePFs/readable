import * as ResourcesAPI from '../utils/ResourcesAPI';
import {
  RECEIVE_COMMENTS,
  UP_VOTE_COMMENT,
  DOWN_VOTE_COMMENT,
  SAVE_COMMENT,
  DELETE_COMMENT,
  UPDATE_COMMENT
} from './types';

export const receiveComments = comments => ({
  type: RECEIVE_COMMENTS,
  comments
});

export const fetchComments = (postId) => dispatch => (
    ResourcesAPI.getPostComments(postId)
    .then(comments => dispatch(receiveComments(comments)))
);

export const increaseVoteComment = comment => ({
  type: UP_VOTE_COMMENT,
  comment
});

export const upVoteComment = (comment) => dispatch => (
    ResourcesAPI.upVoteComment(comment)
    .then(comment => dispatch(increaseVoteComment(comment)))
);

export const decreaseVoteComment = comment => ({
  type: DOWN_VOTE_COMMENT,
  comment
});

export const downVoteComment = (comment) => dispatch => (
    ResourcesAPI.downVoteComment(comment)
    .then(comment => dispatch(decreaseVoteComment(comment)))
);

export const persistComment = comment => ({
  type: SAVE_COMMENT,
  comment
});

export const saveComment = (comment) => dispatch => (
  ResourcesAPI.saveComment(comment)
  .then(comment => dispatch(persistComment(comment)))
);

export const removeComment = comment => ({
  type: DELETE_COMMENT,
  comment
});

export const deleteComment = (comment) => dispatch => (
  ResourcesAPI.deleteComment(comment)
  .then(comment => dispatch(removeComment(comment)))
);

export const refreshComment = comment => ({
  type: UPDATE_COMMENT,
  comment
});

export const updateComment = (comment) => dispatch => (
  ResourcesAPI.updateComment(comment)
  .then(comment => dispatch(refreshComment(comment)))
);