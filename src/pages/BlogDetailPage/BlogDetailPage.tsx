import './BlogDetailPage.css';
import { MainContent } from './Main-content-create/MainContent.tsx';
import { Footer } from '../../components/Footer/Footer.tsx';
import { PreNavBar } from './Pre-nav-bar-create/Pre-nav-bar.tsx';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';

interface BlogFormType  {
  title?: string,
  description?: string,
  createdAt?: string,
  details: {
    author?: string,
    avatar?: string
  }
}
export function BlogDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [blog, setblog] = useState<BlogFormType>();

  useEffect(() => {
    fetch(`/api/blogs/${id}`)
      .then(res => res.json())
      .then(blog => {
        console.log(blog);
        setblog(blog);
      })
      .catch(err => console.error({ error: err }));
  }, [id])

  return (
    <>
      <MainContent title={blog?.title} author={blog?.details.author} description={blog?.description} avatar={blog?.details.avatar} time={blog?.createdAt} />
      <Footer />
      <PreNavBar customClass='bottom' id={id} />
    </>
  )
}