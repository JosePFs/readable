
const api = "http://localhost:3001"

let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const getAllCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories);

export const getAllPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json());

export const getPost = (postId) =>
    fetch(`${api}/posts/${postId}`, { headers })
      .then(res => res.json());

export const getPostComments = (post) =>
  fetch(`${api}/posts/${post.id}/comments`, { headers })
    .then(res => res.json());

export const upVotePost = (post) =>
  fetch(`${api}/posts/${post.id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option: "upVote" })
  }).then(res => res.json());

export const downVotePost = (post) =>
  fetch(`${api}/posts/${post.id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option: "downVote" })
  }).then(res => res.json());

export const upVoteComment = (comment) =>
  fetch(`${api}/comments/${comment.id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option: "upVote" })
  }).then(res => res.json());

export const downVoteComment = (comment) =>
  fetch(`${api}/comments/${comment.id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option: "downVote" })
  }).then(res => res.json());

export const savePost = (post) =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  }).then(res => res.json());

export const deletePost = (post) =>
  fetch(`${api}/posts/${post.id}`, { 
      method: 'DELETE',
      headers 
    }).then(res => res.json());

export const updatePost = (post) =>
  fetch(`${api}/posts/${post.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  }).then(res => res.json());

  export const saveComment = (comment) =>
  fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(comment)
  }).then(res => res.json());

export const deleteComment = (comment) =>
  fetch(`${api}/comments/${comment.id}`, { 
      method: 'DELETE',
      headers 
    }).then(res => res.json());

export const updateComment = ({id, body, timestamp}) =>
  fetch(`${api}/comments/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({timestamp, body})
  }).then(res => res.json());