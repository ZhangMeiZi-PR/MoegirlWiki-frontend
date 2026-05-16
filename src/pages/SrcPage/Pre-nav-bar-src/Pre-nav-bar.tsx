import './Pre-nav-bar.css';
import { Link } from 'react-router';

interface PreNavBarProps {
  customClass?: string;
  srcName?: string;
}

export function PreNavBar({ customClass, srcName }: PreNavBarProps) {
  return (
    <nav className={`pre-nav-bar ${customClass}`}>
      <ul className='pre-nav-left'>
        <li className='nav-left-content'>
          <Link className='link' to='/'>
            Home
          </Link>
        </li>
        <li className='nav-left-content'>
          <Link className='link documents-link' to='/documents'>
            Documents
          </Link>
        </li>
        <li className='nav-left-content'>
          <Link className='link documents-link' to={`/documents/${srcName}`}>
            {srcName}
          </Link>
        </li>
      </ul>
    </nav>
  )
}