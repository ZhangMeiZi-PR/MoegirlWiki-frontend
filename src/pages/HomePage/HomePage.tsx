import './HomePage.css';
import { MainContent } from './Main-content/MainContent.tsx';
import { Footer } from '../../components/Footer/Footer.tsx';
import { PreNavBar } from './Pre-nav-bar/Pre-nav-bar.tsx';
export function HomePage() {
  return (
    <>
      <MainContent />
      <Footer />
      <PreNavBar customClass='bottom'/>
    </>
  )
}