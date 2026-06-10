import './DocumentPage.css';
import { MainContent } from './Main-content-doc/MainContent.tsx';
import { Footer } from '../../components/Footer/Footer.tsx';
import { PreNavBar } from './Pre-nav-bar-doc/Pre-nav-bar.tsx';



export function DocumentPage() {

  

  return (
    <>
      <MainContent />
      <Footer />
      <PreNavBar customClass='bottom'/>
    </>
  )
}