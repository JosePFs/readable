import React from 'react';

export default function CommentsList ({ comments }) {
  return (
    <ul className='comments-list'>
    {comments.map((comment) => (
      <li key={comment.id}>
        <p>{comment.body}</p>
        <p>{comment.voteScore}</p>
      </li>
    ))}
    </ul>
  )
}