import { Link } from 'react-router';
import './NavBar.css';

export function NavBar () {
  return (
    <div className='nav-bar-wrap'>
      <nav className='nav-bar'>
        <ul className='nav-left'>
          <Link className='nav-item1' to='/'>
            发现 
          </Link>
          <Link to='/documents' className='nav-item2'>
            文档
          </Link>
        </ul>
        <ul className='nav-right'>
          <Link to='/admin' className='nav-logIn'>
            登录           
          </Link>
          <li className='nav-customize'>
          <button className='customize-btn' aria-label='Open Customizer' />
          </li>
        </ul>
      </nav>
    </div>
  )
}