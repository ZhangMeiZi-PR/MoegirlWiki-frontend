import './BlogDetailPage.css';
import { MainContent } from './Main-content-create/MainContent.tsx';
import { Footer } from '../../components/Footer/Footer.tsx';
import { PreNavBar } from './Pre-nav-bar-create/Pre-nav-bar.tsx';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';

interface BlogFormType  {
  title?: string,
  content?: string,
  createdAt?: string,
  details?: {
    author?: string,
    avatar?: string
  }
}
export function BlogDetailPage({setProgress}: {setProgress: (value: number) => void}) {
  const { id } = useParams<{ id: string }>();
  const [blog, setblog] = useState<BlogFormType>();

  useEffect(() => {
    setProgress(40)
    fetch(`/api/blogs/${id}`)
      .then(res => res.json())
      .then(blog => {
        console.log(blog);
        setblog(blog);
      })
      .catch(err => console.error({ error: err }));
      setTimeout(() => setProgress(100), 300);
  }, [id])

  return (
    <>
      <MainContent title={blog?.title} author={blog?.details?.author} avatar={blog?.details?.avatar} time={blog?.createdAt} content={blog?.content}/>
      <Footer />
      <PreNavBar customClass='bottom' id={id} />
    </>
  )
}