import './MainContent.css'
import { PreNavBar } from '../Pre-nav-bar-src/Pre-nav-bar.tsx';
import { useEffect, useState } from 'react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate.tsx';
import Loading from '../../../components/Loading/Loading.tsx';

interface MainConProps {
  id?: string,
}

interface docFormType {
  id: string,
  docName: string,
  eventDate: string,
  description: string,
  link: string,
  exampleImage: string
}

export function MainContent ({ id }: MainConProps) {
  const axiosPrivate = useAxiosPrivate();
  const [doc, setDoc] = useState<docFormType>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPrivate(`/api/documents/${id}`);
        setDoc(response.data);
        setIsLoading(false);
      } catch (err) {
        console.error(err instanceof Error ? err.message : 'Unkown error');
      }
    };
    fetchData();
  }, [id, axiosPrivate])
  
  return (
    <main className='main-content'>
      <div className='focus-content-padding' >
        <PreNavBar id={id}/>

        <div className='focus-content doc'>
          <div className='left-content'>
            <div className='page-header'>
              <h1>documents</h1>
            </div>
            <div className='post-list'>
              <div className='post-top-header'>
                <h2>资源汇总</h2>
              </div>
              { isLoading 
                ?
                <Loading />
                :
              <div className='doc-display'>
                <article className='doc-content'>
                  <h2>{doc?.docName}</h2>
                  <h4>时间：{doc?.eventDate}</h4>
                  <h4>{doc?.description}</h4>
                  <h4>参考制作：
                    <a
                    href={doc?.link}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='resource-link'
                    >
                      百度网盘链接
                    </a>
                  </h4>
                </article>
                <img src={doc?.exampleImage} alt='reference img'/>
              </div>
              }
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}