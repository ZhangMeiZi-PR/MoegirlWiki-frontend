import './MainContent.css'
import { PreNavBar } from '../Pre-nav-bar-doc/Pre-nav-bar';
import { Link } from 'react-router';
import { useState, useEffect } from 'react';

interface docFormType {
  _id: string,
  name: string,
  img: string
}


export function MainContent() {
  const [docs, setdocs] = useState<docFormType[]>([]);

  useEffect(() => {
    fetch('/api/documentsNameImg')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setdocs(data);
      })
      .catch(err => console.error({ error: err.message }));
  }, []);

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
                {docs.map((doc) => {
                  return(
                  <div className='post-row doc'>
                    <div className='src-header'>
                      <div 
                        className='src-header-background'
                        style={{backgroundImage:`url(http://localhost:5000${doc.img})`}}
                       />
                      <Link to={`/documents/${doc._id}`} className='src-link'>
                        {doc.name}
                      </Link>
                    </div>
                  </div>
                )})}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}