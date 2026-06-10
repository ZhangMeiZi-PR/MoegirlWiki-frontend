import './BlogCreate.css';
import { MainContent } from '../BlogCreatePage/Main-content-create/MainContent.tsx';
import { Footer } from '../../components/Footer/Footer.tsx';
import { PreNavBar } from '../BlogCreatePage/Pre-nav-bar-create/Pre-nav-bar.tsx';

export function BlogCreate() {
  return (
    <>
      <MainContent />
      <Footer />
      <PreNavBar customClass='bottom'/>
    </>
  )
}