import './MainContent.css'
import { PreNavBar } from '../Pre-nav-bar/Pre-nav-bar';
import dog from '../../assets/Material/image/dog.jpeg';
import { useEffect, useState } from 'react';
// const forumContents = [
//   {
//     id: 1,
//     icon: "💬",
//     title: "入门必看！！",
//     description: "这里是新人导航，入站必知，每个人都要好好看哦！！！！！！！！",
//     details: { author: 'Mz', time: '2026-05-29 at 15:31', avatar: { dog } }
//   },
//   {
//     id: 2,
//     icon: "💬",
//     title: "资源必看！！",
//     description: "这里是新人导航，入站必知，每个人都要好好看哦！！！！！！！！",
//     details: { author: 'Mz', time: '2026-05-29 at 18:13', avatar: { dog } }
//   }
// ]
interface BlogType {
  _id: string,
  title: string,
  description: string,
  details: {
    author: string,
    time: string,
    avatar: string,
  };
};

export function MainContent() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/blogs')
      .then(res => res.json())
      .then(data => setBlogs(data))
      .catch(err => console.error('Error fetching data:', err));
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
              {blogs.map((blog: BlogType) => (
                <div className='post-row'>
                  <div className='row-icon'>
                    💬
                  </div>
                  <div className='row-info'>
                    <h3>{blog.title}</h3>
                    <p>{blog.description}</p>
                  </div>
                  <div className='row-stats'>
                    <img src={blog.details.avatar} alt="avatar" />
                    <div className='stats-details'>
                      <h4>{blog.details.author}</h4>
                      <h5>{blog.details.time}</h5>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className='right-content'>
            <h1>最近更新</h1>
            <div className='rencent-post-list'>
              <div className='recent-row-post'>
                <div className='recent-post-avatar'>
                  <img src={dog} />
                </div>
                <div className='recent-post-details'>
                  <h3>Jensen</h3>
                  <h4>Welcome new guys!!!</h4>
                  <h5>1分钟前</h5>
                </div>
              </div>
            </div>
            <div className='rencent-post-list'>
              <div className='recent-row-post'>
                <div className='recent-post-avatar'>
                  <img src={dog} />
                </div>
                <div className='recent-post-details'>
                  <h3>Jensen</h3>
                  <h4>Welcome new guys!!!欢迎各位来到传媒项目组!!!!!!!我将能够收集到的所有资源存入了这个网站,这一切只是出于兴趣orz
                  </h4>
                  <h5>45分钟前</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

