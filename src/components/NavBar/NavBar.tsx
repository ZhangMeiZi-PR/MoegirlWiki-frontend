import { Link } from 'react-router';
import './NavBar.css';
import useAuth from '../../hooks/useAuth';

export function NavBar() {
  const { auth } = useAuth();
  const isLogin = Boolean(auth?.accessToken);
  return (
    <div className='nav-bar-wrap'>
      <nav className='nav-bar'>
        <ul className='nav-left'>
          <li className='nav-left-background discover'>
            <Link className='nav-item1' to='/'>
              发现
            </Link>
          </li>
          <li className='nav-left-background document'>
            <Link to='/documents' className='nav-item2'>
              文档
            </Link>
          </li>
        </ul>
        <ul className='nav-right'>
          <Link to='/document/create' className='nav-right-link nav-document-create'>
            创建文档
          </Link>
          <Link to='/blog/create' className='nav-right-link nav-blog-create'>
            发文
          </Link>
          {isLogin
            ? <Link to={`/login/${auth?.user?.id}`} className='nav-right-link nav-logIn'> 我 </Link>
            : <Link to='/login' className='nav-right-link nav-logIn'> 登录 </Link>
          }
          <li className='nav-customize'>
            <button className='customize-btn' aria-label='Open Customizer' />
          </li>
        </ul>
      </nav>
    </div>
  )
}