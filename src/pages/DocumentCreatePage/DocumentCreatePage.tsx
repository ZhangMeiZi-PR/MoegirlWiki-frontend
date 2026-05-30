import './DocumentCreatePage.css';
import { Background } from "../../components/Background/Background.tsx";
import { FocusHeader } from "../../components/Focus-Header/FocusHeader.tsx";
import { NavBar } from "../../components/NavBar/NavBar.tsx";
import { MainContent } from './Main-content-create/MainContent.tsx';
import { Footer } from '../../components/Footer/Footer.tsx';
import { PreNavBar } from './Pre-nav-bar-create/Pre-nav-bar.tsx';

export function DocumentCreatePage() {
  return (
    <>
      <title>萌媒百科</title>
      <Background />
      <div className="content-layer">
        <FocusHeader />
        <div className='content-mega-layer'>
          <NavBar />
          <MainContent />
          <Footer />
          <PreNavBar customClass='bottom' />
        </div>
      </div>
    </>
  )
}