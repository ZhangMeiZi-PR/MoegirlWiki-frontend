import './MainContent.css'
import { PreNavBar } from '../Pre-nav-bar/Pre-nav-bar';
import { useEffect, useState } from 'react';
import { TimeFormat } from '../../../utils/TimeFormat';
import { Link } from 'react-router';
import Loading from '../../../components/Loading/Loading';
import axios from '@/api/axios';
import { Pagination } from '@/components/Pagination/Pagination';

interface BlogModelType {
  id?: string,
  title?: string,
  content?: string,
  description?: string,
  createdAt: string,
  author?: string,
  avatar?: string,
  isPinned?: boolean
};

interface BlogsCollectionType {
  isPinned: BlogModelType[],
  daily: BlogModelType[]
}

export function MainContent() {
  const [blogs, setBlogs] = useState<BlogsCollectionType>({ isPinned: [], daily: [] });
  const [recentBlogs, setRecentBlogs] = useState<BlogModelType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalBlogs, setTotalBlogs] = useState<number>(0);
  const [pinnedIsLoading, setPinnedIsLoading] = useState<boolean>(true);
  const [recentIsLoading, setRecentIsLoading] = useState<boolean>(true);
  const [dailyIsLoading, setDailyIsLoading] = useState<boolean>(true);
  const [hasFetchedTotalCount, setHasFetchedTotalCount] = useState<boolean>(false);

  const postPerPage = 10;

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setDailyIsLoading(true);
      const offset = (currentPage - 1) * postPerPage;

      try {
        const needCount = !hasFetchedTotalCount;

        const response = await axios.get(`/api/blogs?limit=${postPerPage}&offset=${offset}&needCount=${needCount}`, {
          signal: controller.signal
        });
        const recentResponse = await axios.get(`/api/blogs/recent`, {
          signal: controller.signal
        });
        setBlogs(response.data);
        setRecentBlogs(recentResponse.data);

        if (response.data.totalCount !== undefined) {
        const totalBlogs = response.data.totalCount;
        setTotalBlogs(totalBlogs);
        setTotalPages(Math.ceil(totalBlogs / postPerPage));
        setHasFetchedTotalCount(true);
        }
      } catch (err: unknown) {
        if (err instanceof Error && err.name === 'AbortError') {
          console.log("Aborted")
        } else {
          console.error(err instanceof Error ? err.message : "Unknown Error");
        }
      } finally {
        setTimeout(() => {
        setDailyIsLoading(false);
        setPinnedIsLoading(false);
        setRecentIsLoading(false);
        },1000)
      }
    };
    fetchData();
    return () => {
      controller.abort();
    }
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  }

  return (
    <>
      <main className='main-content'>
        <div className='focus-content-padding' >
          <PreNavBar customClass='top' />

          <div className='focus-content'>
            <div className='left-content'>
              <div className='page-header'>
                <h1>discover</h1>
              </div>
              <section className='post-list'>
                <div className='post-top-header'>
                  <h2>置顶</h2>
                </div>
                {!pinnedIsLoading
                  ? (
                    blogs.isPinned.map((blog) => {
                      return (
                        <div className='post-row'>
                          <div className='row-icon'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#510a9a">
                              <path fill="#510a9a" d="M7.25 4.5c0-.966.784-1.75 1.75-1.75h6c.967 0 1.75.784 1.75 1.75c0 1.063-.89 1.75-1.89 1.75l.562 4.128c1.835.52 2.951 2.165 3.314 3.975a.758.758 0 0 1-.736.897H6a.758.758 0 0 1-.735-.897c.362-1.81 1.478-3.454 3.313-3.975l.563-4.128c-1.002 0-1.89-.687-1.89-1.75m5.499 12a.75.75 0 0 0-1.5 0v4a.75.75 0 1 0 1.5 0z" />
                            </svg>
                          </div>
                          <Link to={`/blogs/${blog.id}`} className='post-link' >
                            <div className='row-info'>
                              <h3>{blog.title}</h3>
                              <p>{blog.description}</p>
                            </div>
                          </Link>
                          <div className='row-stats'>
                            <img src={blog?.avatar} alt="avatar" />
                            <div className='stats-details'>
                              <h4>{blog?.author}</h4>
                              <h5>{TimeFormat(blog?.createdAt)}</h5>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  ) :
                  <Loading />
                }
              </section>
              <section className='post-list'>
                <div className='post-top-header'>
                  <h2>日常</h2>
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    totalBlogs={totalBlogs}
                  />
                </div>
                {!dailyIsLoading
                  ? (
                    blogs.daily.map((blog) => {
                      return (
                        <div className='post-row'>
                          <div className='row-icon'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                              <g fill="none">
                                <path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z" />
                                <path fill="#20ffb1d6" d="M17 3a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H3a1 1 0 0 1-1-1V8a5 5 0 0 1 5-5zm0 2H7a3 3 0 0 0-3 3v11h13a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3m-8 5a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 1-1m6 0a1 1 0 0 1 .993.883L16 11v2a1 1 0 0 1-1.993.117L14 13v-2a1 1 0 0 1 1-1" />
                              </g>
                            </svg>
                          </div>
                          <Link to={`/blogs/${blog.id}`} className='post-link' >
                            <div className='row-info'>
                              <h3>{blog.title}</h3>
                              <p>{blog.description}</p>
                            </div>
                          </Link>
                          <div className='row-stats'>
                            <img src={blog?.avatar} alt="avatar" />
                            <div className='stats-details'>
                              <h4>{blog?.author}</h4>
                              <h5>{TimeFormat(blog?.createdAt)}</h5>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  ) :
                  <Loading />
                }
              </section>
            </div>
            <div className='right-content'>
              <h1>最近更新</h1>
              {recentIsLoading
                ?
                <Loading />
                :
                <div className='rencent-post-list'>
                  {recentBlogs.map((recentBlog) => {
                    return (
                      <div className='recent-row-post'>
                        <div className='recent-post-avatar'>
                          <img src={recentBlog?.avatar} alt='recentBlog avatar' />
                        </div>
                        <div className='recent-post-details'>
                          <Link to={`/blogs/${recentBlog.id}`} className='recent-post-link'>
                            <h3>{recentBlog?.author}</h3>
                            <div className='info-description'>
                              <h4>{recentBlog.description}</h4>
                            </div>
                          </Link>
                          <h5>{TimeFormat(recentBlog.createdAt)}</h5>
                        </div>
                      </div>
                    )
                  })}
                </div>
              }
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

