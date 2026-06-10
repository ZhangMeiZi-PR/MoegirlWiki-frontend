import './layout.css';
import { Background } from "../components/Background/Background.tsx";
import { FocusHeader } from "../components/Focus-Header/FocusHeader.tsx";
import { NavBar } from "../components/NavBar/NavBar.tsx";
import { Outlet } from 'react-router';

export function Layout() {

  return (
    <>
      <title>萌媒百科</title>
      <Background />
      <div className="content-layer">
        <FocusHeader />
        <div className='content-mega-layer'>
          <NavBar />
          <Outlet />
        </div>
      </div>
    </>
  )
}