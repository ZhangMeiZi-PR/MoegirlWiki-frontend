import './UnauthorizedPage.css';
import { MainContent } from './Main-content-Ua/MainContent.tsx';
import { Footer } from '../../components/Footer/Footer.tsx';
import { PreNavBar } from './Pre-nav-bar-Ua/Pre-nav-bar.tsx';



export function UnauthorizedPage() {

  

  return (
    <>
      <MainContent />
      <Footer />
      <PreNavBar customClass='bottom'/>
    </>
  )
}