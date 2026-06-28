import './Comments.css';
import { useState } from 'react';
import { axiosPrivate } from '@/api/axios';
import useAuth from '@/hooks/useAuth';
import { TimeFormat } from '@/utils/TimeFormat';

interface CommentModelType {
  id: string,
  body: string,
  avatar: string,
  author: string,
  createdAt: string
}

interface CommentsProps {
  id?: string;
  userId?: string;
  comments?: CommentModelType[];
}


export function Comments({ id, userId, comments: initialComments }: CommentsProps) {
  const { auth } = useAuth();
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [localComments, setLocalComments] = useState<CommentModelType[]>(initialComments || []);
  const [commentPost, setCommentPost] = useState({
    body: '',
    avatar: auth.user?.avatar,
    author: auth.user?.username
  });

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const response = await axiosPrivate.post(`/api/blogs/update/comment?id=${id}&userId=${userId}`, commentPost);
      const updatedBlog = response.data;
      const newlyAddedComment = updatedBlog.comments[updatedBlog.comments.length - 1];
      setLocalComments((prevComments) => [...prevComments, newlyAddedComment]);
      setCommentPost(prev => ({ ...prev, body: '' }));
      setStatus('success');
      setTimeout(() => {
        setStatus('idle');
      }, 1500)
    } catch (err: unknown) {
      setStatus('error');
      console.error(err instanceof Error ? err.message : "Unknown Error");
      setTimeout(() => {
        setStatus('idle');
      }, 1500)
    }
  }
  return (
    <>
      <div className='comment-header'>
        <div className='comment-input-wrapper'>
          <textarea
            className='comment-textarea'
            placeholder='请发表重要指示...'
            rows={2}
            value={commentPost?.body}
            onChange={(e) => setCommentPost({ ...commentPost, body: e.target.value })}
            autoComplete='off'
            required
          />
          <form className='comment-actions' onSubmit={handleSubmit}>
            <button
              type='submit'
              className='submit-comment-btn'
              disabled={status === 'submitting' || status === 'success'}
            >
              {status === 'idle' && '评论'}
              {status === 'submitting' && (<span className='btn-spinner-icon' />)}
              {status === 'success' && <span className='btn-tick-icon' />}
              {status === 'error' && '发布失败'}
            </button>
          </form>
        </div>
      </div>
      {localComments ? (
        [...localComments].reverse().map((comment) => (
          <section className='comment-card'>
            <div className='comment-left'>
              <div className='comment-avatar'>
                <img src={comment.avatar} />
              </div>
            </div>
            <div className='comment-right'>
              <div className='comment-right-header'>
                <span className='comment-username'>{comment.author}</span>
                <span className='comment-date'>{TimeFormat(comment.createdAt)}</span>
              </div>
              <article className='comment-body'>
                {comment.body}
              </article>
            </div>
          </section>
        )))
        : (
          <h1>空空如也...</h1>
        )
      }
    </>
  )
}