import './MainContent.css'
import { PreNavBar } from '../Pre-nav-bar/Pre-nav-bar';
import { useEffect, useState } from 'react';
import { TimeFormat } from '../../utils/TimeFormat';
import { Link } from 'react-router';

interface BlogType {
  _id?: string,
  title: string,
  description: string,
  createdAt: string,
  details: {
    author: string,
    avatar: string,
  };
};

export function MainContent() {
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [recentBlogs, setRecentBlogs] = useState<BlogType[]>([]);


  useEffect(() => {
    fetch('/api/blogs')
      .then(res => res.json())
      .then(data => setBlogs(data))
      .catch(err => console.error('Error fetching blogs data:', err));
    
    fetch('/api/blogs/recent')
      .then(res => res.json())
      .then(data => setRecentBlogs(data))
      .catch(err => console.error('Error fetching recent blogs data:', err));
  }, []);
  

  return (
    <main className='main-content'>
      <div className='focus-content-padding' >
        <PreNavBar customClass='top' />

        <div className='focus-content'>
          <div className='left-content'>
            <div className='page-header'>
              <h1>discover</h1>
            </div>
            <div className='post-list'>
              <div className='post-top-header'>
                <h2>置顶</h2>
              </div>
              {blogs.map((blog) => {
                return(
                <div className='post-row'>
                  <div className='row-icon'>
                    💬
                  </div>
                  <Link to={`/blogs/${blog._id}`} className='post-link'>
                    <div className='row-info'>
                      <h3>{blog.title}</h3>
                      <div className='info-description'>
                        <p>{blog.description}</p>
                      </div>
                    </div>
                  </Link>
                    <div className='row-stats'>
                      <img src={blog.details.avatar} alt="avatar" />
                      <div className='stats-details'>
                        <h4>{blog.details.author}</h4>
                        <h5>{TimeFormat(blog.createdAt)}</h5>
                      </div>
                    </div>
                </div>
                )})}
            </div>
          </div>
          <div className='right-content'>
            <h1>最近更新</h1>
            <div className='rencent-post-list'>
              {recentBlogs.map((recentBlog) => {
                return(
                <div className='recent-row-post'>
                  <div className='recent-post-avatar'>
                    <img src={recentBlog.details.avatar} alt='recentBlog avatar'/>
                  </div>
                  <div className='recent-post-details'>
                    <Link to={`/blogs/${recentBlog._id}`} className='recent-post-link'>
                      <h3>{recentBlog.details.author}</h3>
                      <div className='info-description'>
                        <h4>{recentBlog.description}</h4>
                      </div>
                    </Link>
                    <h5>{TimeFormat(recentBlog.createdAt)}</h5>
                  </div>
                </div>
              )})}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

