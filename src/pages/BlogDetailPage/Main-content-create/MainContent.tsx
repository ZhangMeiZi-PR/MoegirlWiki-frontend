import './MainContent.css'
import { PreNavBar } from '../Pre-nav-bar-create/Pre-nav-bar';
import { TimeFormat } from '../../../utils/TimeFormat';
import { Comments } from '../Comments/Comments';
import ReadOnlyEditor from '@/components/tiptap-templates/simple/read-only-editor';


interface BlogFormType {
  title?: string,
  content?: string,
  time?: string,
  author?: string,
  avatar?: string,
  isLoading: boolean
}

export function MainContent({ title, content, time, author, avatar, isLoading }: BlogFormType) {
  
  return (
    <main className='main-content'>
      <div className='focus-content-padding' >
        <PreNavBar />
        {isLoading ? 
          null : (
        <div className='focus-content blog'>
          <div className='left-content'>
            <article className='post-list detail'>
              <section className='blog-grid'>
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
                  <ReadOnlyEditor key={content} content={content ?? ''}/>
                </div>
              </section>
              <div className='comments-context'>
                <span>评论</span>
                <Comments />
              </div>
            </article>
          </div>
        </div>
          )
        }
      </div>
    </main>
  )
}