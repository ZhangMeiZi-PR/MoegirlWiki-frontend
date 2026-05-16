import './HomePage.css'
import { Background } from "../../components/Background/Background.tsx";
import { FocusHeader } from "../../components/Focus-Header/FocusHeader.tsx";
import { NavBar } from "../../components/NavBar/NavBar.tsx";
import { MainContent } from "../../components/Main-content/MainContent.tsx";
import { Footer } from '../../components/Footer/Footer.tsx';
import { PreNavBar } from '../../components/Pre-nav-bar/Pre-nav-bar.tsx';
export function HomePage() {
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
          <PreNavBar customClass='bottom'/>
        </div>
      </div>
    </>
  )
}