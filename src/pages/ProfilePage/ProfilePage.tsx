import './ProfilePage.css';
import { MainContent } from './Main-content-pro/MainContent.tsx';
import { Footer } from '../../components/Footer/Footer.tsx';
import { PreNavBar } from './Pre-nav-bar-pro/Pre-nav-bar.tsx';
import { useParams } from 'react-router';


export function ProfilePage() {
  const { userId } = useParams<{userId: string | undefined}>();
  return (
    <>
      <MainContent userId={userId}/>
      <Footer />
      <PreNavBar customClass='bottom' />
    </>
  )
}