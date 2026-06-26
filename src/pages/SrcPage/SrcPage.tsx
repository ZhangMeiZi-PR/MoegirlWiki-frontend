import './SrcPage.css';
import { MainContent } from './Main-content-src/MainContent.tsx';
import { Footer } from '../../components/Footer/Footer.tsx';
import { PreNavBar } from './Pre-nav-bar-src/Pre-nav-bar.tsx';
import { useParams } from 'react-router';

export function SrcPage() {
  
  const { id } = useParams< {id: string} >();
  return (
    <>
      <MainContent id={id}/>
      <Footer />
      <PreNavBar customClass='bottom' id={id}/>
    </>
  )
}