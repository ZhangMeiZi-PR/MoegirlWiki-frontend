import './MainContent.css'
import { PreNavBar } from '../Pre-nav-bar-doc/Pre-nav-bar';
import dog from '../../../assets/Material/image/dog.jpeg';
import { Link } from 'react-router';
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
        <PreNavBar />

        <div className='focus-content doc'>
          <div className='left-content'>
            <div className='page-header'>
              <h1>documents</h1>
            </div>
            <div className='post-list'>
              <div className='post-top-header'>
                <h2>资源汇总</h2>
              </div>
              <div className='doc-grid'>
                <div className='post-row doc'>
                  <div className='src-header'>
                    <div className='src-header-background' />
                    <Link to='/documents/迎新晚会' className='src-link'>
                      迎新晚会
                    </Link>
                  </div>
                </div>
                <div className='post-row doc'>
                  <div className='src-header'>
                    <div className='src-header-background' />
                    <Link to='/documents/迎新晚会' className='src-link'>
                      迎新晚会
                    </Link>
                  </div>
                </div>
                <div className='post-row doc'>
                  <div className='src-header'>
                    <div className='src-header-background' />
                    <Link to='/documents/YingXinWanHui' className='src-link'>
                      迎新晚会
                    </Link>
                  </div>
                </div>
                <div className='post-row doc'>
                  <div className='src-header'>
                    <div className='src-header-background' />
                    <Link to='/documents/YingXinWanHui' className='src-link'>
                      迎新晚会
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}