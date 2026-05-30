import './MainContent.css'
import { PreNavBar } from '../Pre-nav-bar-create/Pre-nav-bar';
import { useState } from 'react';
import { useNavigate } from 'react-router';

interface BlogFormType {
  title: string,
  description: string,
  details: {
  author: string,
  avatar: string
  }
}



export function MainContent() {
  const [formData, setFormData] = useState<BlogFormType>({
    title: '',
    description: '',
    details: {
    author: '',
    avatar: '/dog.jpeg'
    }
  })

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const navigate = useNavigate();

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    
    //send data
    setStatus('submitting');

    fetch('/api/blogs/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(formData)
  })
    .then((res) => {
      if (!res.ok) throw new Error('Failed to create Post');
        return res.json()
  })
    .then(() => {
      setStatus('success');
      setTimeout(() => {
        navigate('/');
      }, 1500);
  })
    .catch((err) => {
      console.error(err);
      setStatus('error');
      setTimeout(() => {
        setStatus('idle')
      }, 1500);
    })
  }
  const isFormInValid = formData.title.trim() === '' || formData.details.author.trim() === '' || formData.description.trim() === '';

  return (
    <main className='main-content'>
      <div className='focus-content-padding' >
        <PreNavBar />

        <div className='focus-content blog'>
          <div className='left-content'>
            <div className='page-header'>
              <h1>blog create</h1>
            </div>
            <div className='post-list'>
              <div className='post-top-header'>
                <h2>创建帖子</h2>
              </div>
              <div className='doc-grid blog'>
                <form className='blog-create' onSubmit={handleSubmit}>
                  <div className='create-title'>
                    <label htmlFor='title'>标题</label>
                    <input 
                      type='text' 
                      value={formData.title} 
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      placeholder='请输入标题'
                      id='title'
                      required
                    />
                  </div>
                  <div className='create-author'>
                    <label htmlFor='author'>作者</label>
                    <input
                      type='text'
                      value={formData.details.author}
                      onChange={(e) => setFormData({...formData, details: {...formData.details,author: e.target.value}})}
                      placeholder='请输入作者'
                      id='author'
                      required
                  />
                  </div> 
                  <div className='create-describtion'>
                    <textarea
                      rows={8}
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      placeholder='请输入正文'
                      required
                    />
                  </div>
                  <button 
                  type="submit" 
                  className={`submit-button ${status === 'idle' && !isFormInValid ? 'active' : status}`}
                  disabled={isFormInValid || status === 'submitting' || status === 'success' }
                  >
                    {status === 'idle' && '发布'}
                    {status === 'submitting' && (<span className='spinner-icon' />)}
                    {status === 'success' && <span className='tick-icon' />}
                    {status === 'error' && '发布失败'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}