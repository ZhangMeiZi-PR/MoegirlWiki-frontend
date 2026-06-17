import './MainContent.css'
import { useState, useEffect } from 'react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import useLogout from '../../../hooks/useLogout';
import LoadingProfile from '../../../components/Loading/Loading-profile';

interface userIdProp {
  userId: string | undefined
}

interface userType {
  username: string,
  email: string,
  avatar: string,
  roles: object
}

export function MainContent({ userId }: userIdProp) {
  const axiosPrivate = useAxiosPrivate();
  const [user, setUser] = useState<userType>();
  const [isLoading, setIsLoading] = useState(true);
  const role = Object.keys(user?.roles ?? {});
  const logout = useLogout();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPrivate(`/api/auth/${userId}`);
        console.log(response.data);
        setUser(response.data);
        setTimeout(() => {
        setIsLoading(false);
        },500)
      } catch (err) {
        console.error(err instanceof Error ? err.message : 'Unkonwn Error');
      }
    };
    fetchData();
  }, [userId, axiosPrivate])

  return (
    <main className='main-content'>
      <div className='focus-content-padding login' >
        <div className='focus-content login'>
          <div className='left-content login'>
            <div className='post-list login profile'>
              { isLoading 
                ?
                <div className='doc-grid profile loading'>
                <LoadingProfile />
                </div>
                :
              <div className='doc-grid profile'>
                <img src={`http://localhost:5000${user?.avatar}`} />
                <h2>{user?.username}</h2>
                <h2>{user?.email}</h2>
                <h2><span>您的权限等级为: </span>{role}</h2>
                <button onClick={logout} className="logout-btn">
                  <span className="circle" aria-hidden="true">
                    <span className="icon arrow" />
                  </span>
                  <span className="button-text">登出</span>
                </button>
              </div>
              }
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}