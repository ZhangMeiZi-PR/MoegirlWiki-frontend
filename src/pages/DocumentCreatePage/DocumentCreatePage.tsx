import './DocumentCreatePage.css';
import { MainContent } from './Main-content-create/MainContent.tsx';
import { Footer } from '../../components/Footer/Footer.tsx';
import { PreNavBar } from './Pre-nav-bar-create/Pre-nav-bar.tsx';

export function DocumentCreatePage() {
  return (
    <>
      <MainContent />
      <Footer />
      <PreNavBar customClass='bottom' />
    </>
  )
}