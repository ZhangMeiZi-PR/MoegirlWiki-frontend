import './MainContent.css'
import { PreNavBar } from '../Pre-nav-bar-create/Pre-nav-bar';
import { TimeFormat } from '../../../utils/TimeFormat';

interface BlogFormType {
  title?: string,
  description?: string,
  time?: string,
  author?: string,
  avatar?: string
}

export function MainContent({ title, description, time, author, avatar }: BlogFormType) {


  return (
    <main className='main-content'>
      <div className='focus-content-padding' >
        <PreNavBar />

        <div className='focus-content blog'>
          <div className='left-content'>
            <div className='page-header'>
              <h1>blog</h1>
            </div>
            <article className='post-list'>
              <section className='doc-grid blog single'>
                <header className='blog-title'>
                  <h1>{title}</h1>
                </header>
                <div className='blog-details'>
                  <div className='blog-avatar'>
                    <img src={avatar} alt="avatar"/>
                  </div>
                  <div className='blog-author-time'>
                    <h2>{author}</h2>
                    {time && <h3>发布于 {TimeFormat(time)}</h3>}
                  </div>
                </div>
                <div className='blog-context'>
                  <h4>{description}</h4>
                </div>
              </section>
            </article>
          </div>
        </div>
      </div>
    </main>
  )
}