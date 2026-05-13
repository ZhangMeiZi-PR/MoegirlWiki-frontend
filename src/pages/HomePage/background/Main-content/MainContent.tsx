import { Link } from 'react-router';
import './MainContent.css';
import dog from '../../../../assets/Material/image/dog.jpeg';
const forumContents = [
  {
    id: 1,
    icon: "💬",
    title: "入门必看！！",
    description: "这里是新人导航，入站必知，每个人都要好好看哦！！！！！！！！",
    latestPost: { author: 'Mz', time: '2026-05-29 at 15:31', avatar: { dog } }
  },
  {
    id: 2,
    icon: "💬",
    title: "资源必看！！",
    description: "这里是新人导航，入站必知，每个人都要好好看哦！！！！！！！！",
    latestPost: { author: 'Mz', time: '2026-05-29 at 18:13', avatar: { dog } }
  }
]



export function MainContent() {
  return (
    <main className='main-content'>
      <div className='focus-content-padding' >
        <nav className='pre-nav-bar'>
          <ul className='pre-nav-left'>
            <li className='nav-left-content'>
              <Link className='home-link'
                to='/'>
                Home
              </Link>
            </li>
          </ul>
        </nav>

        <div className='focus-content'>
          <div className='left-content'>
            <div className='page-header'>
              <h1 className='header-text'>发现</h1>
            </div>
            <div className='post-list'>
              <div className='post-top-header'>
                <h2>Top</h2>
              </div>
              <div className='post-row'>
                <div className='row-icon'>
                  💬
                </div>
                <div className='row-info'>
                  <h3>入站须知！!必看！</h3>
                  <p>这里是关于这个网站的一切与资源与教程，必须要看哦~</p>
                </div>
                <div className='row-stats'>
                  <img src={dog} />
                  <div className='stats-details'>
                    <h4>Mz</h4>
                    <h5>2026-05-29 at 15:31</h5>
                  </div>
                </div>
              </div>
              <div className='post-row'>
                <div className='row-icon'>💬</div>
                <div className='row-info'>
                  <h3>入站须知！!必看！</h3>
                  <p>这里是关于这个网站的一切与资源与教程，必须要看哦~</p>
                </div>
                <div className='row-stats'>
                  <img src={dog} />
                  <div className='stats-details'>
                    <h4>MMMMMzzzzzz</h4>
                    <h5>2026-05-29 at 15:31</h5>
                  </div>
                </div>
              </div>
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
      <div className='focus-mega-footer'>
      </div>
      <nav className='nav-botton'>
      </nav>

    </main>
  )
}