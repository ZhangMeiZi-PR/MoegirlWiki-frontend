import './Comments.css'
import { useState } from 'react'

interface CommentType {
  id: string;
  body: string;
}

const dummyComments = [
  {
    id: '1',
    body: 'This is Comment 1'
  },
  {
    id: '2',
    body: 'This is Comment 2'
  }
]

export function Comments() {
  const [comments, setComments] = useState(dummyComments);
  const [commentBody, setCommentBody] = useState('');


  return (
    <>
      <input 
      className='comments-input' 
      value={commentBody}
      onChange={(e) => setCommentBody(e.target.value)}
      placeholder='写下你的想法...' 
      />
      <button type='submit'>评论</button>
      <section>
        {comments.map((comment) => (
          <div>{comment.body}</div>
        ))}
      </section>
    </>
  )
}