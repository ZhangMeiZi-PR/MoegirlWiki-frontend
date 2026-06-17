import './MainContent.css'
import { useState, useRef, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import useToggle from '../../../hooks/useToggle';

interface accountFormType {
  email: string,
  password: string
}

export function MainContent() {
  const { setAuth } = useAuth();
  const [formData, setFormData] = useState<accountFormType>({
    email: '',
    password: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errMsg, setErrMsg] = useState('');
  const [check, toggleCheck] = useToggle('persist', false);

  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    userRef.current?.focus();
  }, [])

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/"

  //handleSubmit
  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    setErrMsg('');

    //send data
    setStatus('submitting');

    fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
      credentials: 'include'
    })
      .then((res) => {
        if (!res.ok) {
          if (res?.status === 400) {
            setErrMsg('邮箱或密码不正确')
          } else if (res?.status === 401) {
            setErrMsg('未授权');
          } else {
            setErrMsg('呀，服务器出错了！')
          }
          throw new Error('HTTP status ' + res.status);
        }
        return res.json()
      })
      .then((data) => {
        const accessToken = data.accessToken;
        const user = data.user;
        const roles = data.roles;
        setAuth({ user, accessToken, roles });
        setStatus('success');
        setTimeout(() => {
          navigate(from, { replace: true });
        }, 1500);
      })
      .catch((err) => {
        console.log(err.message);
        setStatus('error');
        errRef.current?.focus();
        setTimeout(() => {
          setStatus('idle')
        }, 1500);
      })
  }
  //check blogForm
  const isFormInValid = formData.email.trim() === '' || formData.password.trim() === '';
  //set persist
  // const togglePersist = () => {
  //   setPersist(prev => !prev);
  // };

  // useEffect(() => {
  //   localStorage.setItem("persist", JSON.stringify(persist));
  // }, [persist])

  return (
    <main className='main-content'>
      <div className='focus-content-padding login' >
        <div className='focus-content login'>
          <div className='left-content login'>
            <div className='post-list login'>
              <div className='doc-grid login'>
                <header className='login-header'>
                  <h2>
                    登录
                  </h2>
                  <h4>
                    还没有账号？
                    <Link to='/login/register' className='login-register-link'>
                      创建账号
                    </Link>
                  </h4>
                </header>
                <form className='account-check login' onSubmit={handleSubmit}>
                  <div className='check-email'>
                    <label htmlFor='email'>邮箱</label>
                    <input
                      type='text'
                      ref={userRef}
                      autoComplete='off'
                      value={formData.email}
                      onChange={(e) => { setFormData({ ...formData, email: e.target.value }); setErrMsg(''); }}
                      id='email'
                      required
                    />
                  </div>
                  <div className='check-password'>
                    <label htmlFor='password'>密码</label>
                    <input
                      type='password'
                      value={formData.password}
                      autoComplete='off'
                      onChange={(e) => { setFormData({ ...formData, password: e.target.value }); setErrMsg(''); }}
                      id='password'
                      required
                    />
                  </div>
                  <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>
                    {errMsg}
                  </p>
                  <label className='persist-check'>
                    <input
                      type='checkbox'
                      id='persist'
                      onChange={toggleCheck}
                      checked={check}
                    />
                    <div className="checkmark">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M20 6L9 17L4 12" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span className="label">记住我</span>
                  </label>
                  <button
                    type="submit"
                    className={`submit-button ${status === 'idle' && !isFormInValid ? 'active' : status}`}
                    disabled={isFormInValid || status === 'submitting' || status === 'success'}
                  >
                    {status === 'idle' && '登录'}
                    {status === 'submitting' && (<span className='spinner-icon' />)}
                    {status === 'success' && <span className='tick-icon' />}
                    {status === 'error' && '登录失败'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}