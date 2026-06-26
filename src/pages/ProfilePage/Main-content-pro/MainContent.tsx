import './MainContent.css'
import { useState, useEffect } from 'react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import useLogout from '../../../hooks/useLogout';
import LoadingProfile from '../../../components/Loading/Loading-profile';
import { Link } from 'react-router';
import { TimeFormat } from '@/utils/TimeFormat';

interface userIdProp {
  userId: string | undefined
}

interface userType {
  username: string,
  email: string,
  avatar: string,
  roles: object
}

interface blogType {
  id?: string,
  userId: string,
  title?: string,
  content?: string,
  description?: string,
  createdAt: string,
  author?: string,
  avatar?: string,
}


export function MainContent({ userId }: userIdProp) {
  const axiosPrivate = useAxiosPrivate();

  const [user, setUser] = useState<userType>();
  const [blogs, setBlogs] = useState<blogType[]>();
  const [isLoading, setIsLoading] = useState(true);

  const role = Object.keys(user?.roles ?? {});
  const logout = useLogout();


  useEffect(() => {
    const fetchData = async () => {
      try {
        // fetch userData
        const userRes = await axiosPrivate(`/api/auth/${userId}`);
        setUser(userRes.data);

        // fetch blogsData which belongs to user
        const blogsRes = await axiosPrivate(`/api/blogs/profile/${userId}`);
        console.log(blogsRes.data);
        setBlogs(blogsRes.data);


        // loading complete
        setTimeout(() => {
          setIsLoading(false);
        }, 500)
      } catch (err) {
        console.error(err instanceof Error ? err.message : 'Unkonwn Error');
      }
    };
    fetchData();
  }, [userId, axiosPrivate])

  // const handleSubmit = (blogId: string) => async (e: React.SubmitEvent) => {
  //   e.preventDefault();

  //   //send request
  //   setBtnStatus('submitting');
  //   try {
  //     const response = await axiosPrivate.delete(`/api/blogs/delete/${userId}/${blogId}`);
  //     console.log(response.data);
  //     setBtnStatus('success');
  //     setTimeout(() => {
  //       navigate(0);
  //     }, 1500);
  //   } catch (err) {
  //     console.error(err instanceof Error ? err.message : 'Unknown error');
  //     setBtnStatus('error');
  //     //catch expired refreshToken?
  //     setTimeout(() => {
  //       setBtnStatus('idle');
  //     }, 1500);

  //   }
  // }

  return (
    <main className='main-content'>
      <div className='focus-content-padding login' >
        <div className='focus-content login'>
          <div className='left-content login'>
            <div className='post-list login profile'>
              {isLoading
                ?
                <div className='doc-grid profile loading'>
                  <LoadingProfile />
                </div>
                :
                <>
                  <div className='doc-grid profile'>
                    <img src={user?.avatar} />
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
                  <div className='profile-post'>
                    <h2>我的帖子</h2>
                    {blogs && blogs?.length > 0 ? (
                      blogs?.map((blog) => {
                        console.log(blog);
                        return (
                          <div className='post-row'>
                            <div className='row-icon'>
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none"><path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z" /><path fill="#20ffb1d6" d="M17 3a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H3a1 1 0 0 1-1-1V8a5 5 0 0 1 5-5zm0 2H7a3 3 0 0 0-3 3v11h13a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3m-8 5a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 1-1m6 0a1 1 0 0 1 .993.883L16 11v2a1 1 0 0 1-1.993.117L14 13v-2a1 1 0 0 1 1-1" /></g></svg>
                            </div>
                            <Link to={`/blogs/${blog.userId}/${blog.id}`} className='post-link' >
                              <div className='row-info'>
                                <h3>{blog.title}</h3>
                                <p>{blog.description}</p>
                              </div>
                            </Link>
                            <div className='row-stats'>
                              <div className='stats-details'>
                                <h4>{TimeFormat(blog.createdAt)}</h4>
                              </div>
                            </div>
                          </div>
                        )
                      }))
                      : (
                        <div className='no-post'>
                          快发出你的第一个帖子吧!
                        </div>
                      )
                    }
                  </div>
                </>
              }
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}