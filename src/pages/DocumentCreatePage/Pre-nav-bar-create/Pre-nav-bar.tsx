import '../../../components/Pre-nav-bar/Pre-nav-bar.css';
import { Link } from 'react-router';

interface PreNavBarProps {
  customClass?: string;
}

export function PreNavBar({ customClass }: PreNavBarProps) {
  return (
    <nav className={`pre-nav-bar ${customClass}`}>
      <ul className='pre-nav-left'>
        <li className='nav-left-content'>
          <Link className='link' to='/'>
            Home
          </Link>
        </li>
        <li className='nav-left-content'>
          <Link className='link documents-link' to='/document/create'>
            DocCreate
          </Link>
        </li>
      </ul>
    </nav>
  )
}