import '../../../components/Pre-nav-bar/Pre-nav-bar.css';
import { Link } from 'react-router';

interface PreNavBarProps {
  customClass?: string;
  id?: string
}

export function PreNavBar({ customClass, id }: PreNavBarProps) {
  return (
    <nav className={`pre-nav-bar ${customClass}`}>
      <ul className='pre-nav-left'>
        <li className='nav-left-content'>
          <Link className='link' to='/'>
            Home
          </Link>
        </li>
        <li className='nav-left-content'>
          <Link className='link documents-link' to={`/blog/${id}`}>
            Blog
          </Link>
        </li>
      </ul>
    </nav>
  )
}