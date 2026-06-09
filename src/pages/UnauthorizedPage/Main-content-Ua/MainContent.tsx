import './MainContent.css'
import { PreNavBar } from '../Pre-nav-bar-Ua/Pre-nav-bar';


export function MainContent() {

  return (
    <main className='main-content'>
      <div className='focus-content-padding' >
        <PreNavBar />

        <div className='focus-content doc'>
          <div className='left-content'>
            <div className='page-header'>
              <h1>unauthorized</h1>
            </div>
            <div className='post-list'>
              <div className='doc-grid'>
                <h1>
                  这个页面你不能使用哦！
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}