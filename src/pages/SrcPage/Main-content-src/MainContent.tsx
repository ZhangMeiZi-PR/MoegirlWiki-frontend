import './MainContent.css'
import { PreNavBar } from '../Pre-nav-bar-src/Pre-nav-bar.tsx';
import { useEffect, useState } from 'react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate.tsx';

interface MainConProps {
  id?: string
}

interface docFormType {
  _id: string,
  name: string,
  date: string,
  description: string,
  baiduLink: string,
  img: string
}

export function MainContent ({ id }: MainConProps) {
  const axiosPrivate = useAxiosPrivate();
  const [doc, setDoc] = useState<docFormType>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPrivate(`/api/documents/${id}`);
        console.log(response);
        setDoc(response.data);
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
              <div className='doc-display'>
                <div className='doc-content'>
                  <h2>{doc?.name}</h2>
                  <h4>时间：{doc?.date}</h4>
                  <h4>{doc?.description}</h4>
                  <h4>参考制作：
                    <a
                    href={doc?.baiduLink}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='resource-link'
                    >
                      百度网盘链接
                    </a>
                  </h4>
                </div>
                <img src={`http://localhost:5000${doc?.img}`} alt='reference img'/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}