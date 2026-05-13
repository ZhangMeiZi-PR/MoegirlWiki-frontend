import './HomePage.css'
import { Background } from "./Background/Background";
import { FocusHeader } from "./Focus-Header/FocusHeader";
import { NavBar } from "./NavBar/NavBar";
import { MainContent } from "./Main-content/MainContent";
export function HomePage() {
  return (
    <>
    <title>萌媒百科</title>
    
    <Background />
    
    <div className="content-layer">
      <FocusHeader />
      <NavBar />
      <MainContent />
    </div>
    </>
  )
}