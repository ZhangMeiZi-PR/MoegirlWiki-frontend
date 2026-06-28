import './MainContent.css'
import { PreNavBar } from '../Pre-nav-bar-doc/Pre-nav-bar';
import { Link } from 'react-router';
import { useState, useEffect } from 'react';
import Loading from '../../../components/Loading/Loading';

interface docFormType {
  id: string,
  docName: string,
  exampleImage: string,
}


export function MainContent() {
  const [docs, setdocs] = useState<docFormType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://moegirlwiki-backend.onrender.com/api/documents')
      .then(res => res.json())
      .then(data => {
        setdocs(data);
        setIsLoading(false);
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
                {isLoading
                  ? 
                  <Loading />
                  :
                  docs.map((doc) => {
                    return (
                      <div className='post-row doc'>
                        <div className='src-header'>
                          <div
                            className='src-header-background'
                            style={{ backgroundImage: `url(${doc.exampleImage})` }}
                          />
                          <Link to={`/documents/${doc.id}`} className='src-link'>
                            {doc.docName}
                          </Link>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}