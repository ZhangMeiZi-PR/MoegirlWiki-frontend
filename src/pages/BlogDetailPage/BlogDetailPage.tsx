import './BlogDetailPage.css';
import { MainContent } from './Main-content-create/MainContent.tsx';
import { Footer } from '../../components/Footer/Footer.tsx';
import { PreNavBar } from './Pre-nav-bar-create/Pre-nav-bar.tsx';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';


interface BlogFormType {
  title?: string,
  content?: string,
  createdAt?: string,
  author?: string,
  avatar?: string
  }
type ParamsType = {
  id?: string,
  userId?: string ,
}
export function BlogDetailPage({setProgress}: {setProgress: (value: number) => void}) {
  const { id } = useParams<ParamsType>();
  const [blog, setblog] = useState<BlogFormType>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setProgress(40)
    fetch(`/api/blogs/${id}`)
      .then(res => res.json())
      .then(blog => {
        setblog(blog);
        setIsLoading(false)
      })
      .catch(err => console.error({ error: err }));
      setTimeout(() => setProgress(100), 300);
  }, [id])

  return (
    <>
      <MainContent title={blog?.title} author={blog?.author} avatar={blog?.avatar} time={blog?.createdAt} content={blog?.content} isLoading={isLoading}/>
      <Footer />
      <PreNavBar customClass='bottom' id={id} />
    </>
  )
}