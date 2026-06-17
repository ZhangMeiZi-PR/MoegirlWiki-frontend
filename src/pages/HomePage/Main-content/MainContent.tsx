import './MainContent.css'
import { PreNavBar } from '../Pre-nav-bar/Pre-nav-bar';
import { useEffect, useState } from 'react';
import { TimeFormat } from '../../../utils/TimeFormat';
import { Link } from 'react-router';
import Loading from '../../../components/Loading/Loading';

interface BlogType {
  _id?: string,
  title?: string,
  content?: string,
  description?: string,
  createdAt: string,
  details?: {
    author?: string,
    avatar?: string,
  };
};

export function MainContent() {
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [recentBlogs, setRecentBlogs] = useState<BlogType[]>([]);
  const [isLoading, setIsLoading] = useState(true);



  useEffect(() => {
    fetch('/api/blogs')
      .then(res => res.json())
      .then(data => setBlogs(data))
      .catch(err => console.error('Error fetching blogs data:', err));

    fetch('/api/blogs/recent')
      .then(res => res.json())
      .then(data => { setRecentBlogs(data); setIsLoading(false) })
      .catch(err => console.error('Error fetching recent blogs data:', err));
  }, []);


  return (
    <>
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
                <h2>帖子</h2>
              </div>
              {blogs.length > 10
                ? (
                  blogs.map((blog) => {
                    return (
                      <div className='post-row'>
                        <div className='row-icon'>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none"><path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z" /><path fill="#20ffb1d6" d="M17 3a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H3a1 1 0 0 1-1-1V8a5 5 0 0 1 5-5zm0 2H7a3 3 0 0 0-3 3v11h13a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3m-8 5a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 1-1m6 0a1 1 0 0 1 .993.883L16 11v2a1 1 0 0 1-1.993.117L14 13v-2a1 1 0 0 1 1-1" /></g></svg>
                        </div>
                        <Link to={`/blogs/${blog._id}`} className='post-link' >
                          <div className='row-info'>
                            <h3>{blog.title}</h3>
                            <p>{blog.description}</p>
                          </div>
                        </Link>
                        <div className='row-stats'>
                          <img src={`http://localhost:5000${blog?.details?.avatar}`} alt="avatar" />
                          <div className='stats-details'>
                            <h4>{blog?.details?.author}</h4>
                            <h5>{TimeFormat(blog?.createdAt)}</h5>
                          </div>
                        </div>
                      </div>
                    )
                  })
                ) :
                <Loading />
              }
            </div>
          </div>
          <div className='right-content'>
            <h1>最近更新</h1>
            {isLoading
              ?
              <Loading />
              :
              <div className='rencent-post-list'>
                {recentBlogs.map((recentBlog) => {
                  return (
                    <div className='recent-row-post'>
                      <div className='recent-post-avatar'>
                        <img src={`http://localhost:5000${recentBlog?.details?.avatar}`} alt='recentBlog avatar' />
                      </div>
                      <div className='recent-post-details'>
                        <Link to={`/blogs/${recentBlog._id}`} className='recent-post-link'>
                          <h3>{recentBlog?.details?.author}</h3>
                          <div className='info-description'>
                            <h4>{recentBlog.description}</h4>
                          </div>
                        </Link>
                        <h5>{TimeFormat(recentBlog.createdAt)}</h5>
                      </div>
                    </div>
                  )
                })}
              </div>
            }
          </div>
        </div>
      </div>
    </main>
    </>
  )
}

