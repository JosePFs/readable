import {
  RECEIVE_COMMENTS,
  UP_VOTE_COMMENT,
  DOWN_VOTE_COMMENT,
  SAVE_COMMENT,
  DELETE_COMMENT,
  UPDATE_COMMENT
} from '../actions/types';

function comment (state = {comments: []}, action) {
  const { comments, comment } = action;

  switch (action.type) {
    case RECEIVE_COMMENTS:
      return {
        ...state,
        comments
      };
    case UP_VOTE_COMMENT:
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

export default comment;