import * as ResourcesAPI from '../utils/ResourcesAPI';

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
export const SELECT_CATEGORY = 'SELECT_CATEGORY';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const UP_VOTE_POST = 'UP_VOTE_POST';
export const DOWN_VOTE_POST = 'DOWN_VOTE_POST';
export const SELECT_POST = 'SELECT_POST';
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const UP_VOTE_COMMENT = 'UP_VOTE_COMMENT';
export const DOWN_VOTE_COMMENT = 'DOWN_VOTE_COMMENT';

export const receiveCategories = categories => ({
  type: RECEIVE_CATEGORIES,
  categories
});

export const fetchCategories = () => dispatch => (
    ResourcesAPI.getAllCategories()
    .then(categories => dispatch(receiveCategories(categories)))
);

export const selectCategory = category => ({
  type: SELECT_CATEGORY,
  category
});

export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts
});

export const fetchPosts = () => dispatch => (
    ResourcesAPI.getAllPosts()
    .then(posts => dispatch(receivePosts(posts)))
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

export const receiveComments = comments => ({
  type: RECEIVE_COMMENTS,
  comments
});

export const fetchComments = (post) => dispatch => (
    ResourcesAPI.getPostComments(post)
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