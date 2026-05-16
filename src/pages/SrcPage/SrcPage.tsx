import './SrcPage.css';
import { Background } from "../../components/Background/Background.tsx";
import { FocusHeader } from "../../components/Focus-Header/FocusHeader.tsx";
import { NavBar } from "../../components/NavBar/NavBar.tsx";
import { MainContent } from './Main-content-src/MainContent.tsx';
import { Footer } from '../../components/Footer/Footer.tsx';
import { PreNavBar } from './Pre-nav-bar-src/Pre-nav-bar.tsx';
import { useParams } from 'react-router';

export function SrcPage() {
  const { srcName } = useParams();
  return (
    <>
      <title>萌媒百科</title>
      <Background />
      <div className="content-layer">
        <FocusHeader />
        <div className='content-mega-layer'>
          <NavBar />
          <MainContent srcName={srcName}/>
          <Footer />
          <PreNavBar customClass='bottom' srcName={srcName}/>
        </div>
      </div>
    </>
  )
}