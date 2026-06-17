import './MainContent.css'
import { useState } from 'react';
import { useNavigate } from 'react-router';

interface accountForm {
  username: string,
  email: string,
  password: string,
  avatar: File | null
}



export function MainContent() {
  const [account, setAccount] = useState<accountForm>({
    username: '',
    email: '',
    password: '',
    avatar: null
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const navigate = useNavigate();

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    //send data
    setStatus('submitting');
    const dataEnvelope = new FormData();

    dataEnvelope.append('username', account.username);
    dataEnvelope.append('email', account.email);
    dataEnvelope.append('password', account.password);
    if (account.avatar) { dataEnvelope.append('avatar', account.avatar) };

    fetch('/api/auth/register', {
      method: 'POST',
      body: dataEnvelope
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to create Account');
        return res.json()
      })
      .then((data) => {
        localStorage.setItem('token', data.token);
        console.log(data);
        setStatus('success');
        setTimeout(() => {
          navigate('/register');
        }, 1500);
      })
      .catch((err) => {
        console.error(err);
        setStatus('error');
        setTimeout(() => {
          setStatus('idle')
        }, 1500);
      })
  }
  const isFormInValid = account.username.trim() === '' || account.email.trim() === '' || account.password.trim() === '';

  return (
    <main className='main-content'>
      <div className='focus-content-padding register' >
        <div className='focus-content register'>
          <div className='left-content register'>
            <div className='post-list register'>
              <div className='doc-grid register'>
                <header className='register-header'>
                  <h2>
                    创建账号
                  </h2>
                  <h4>
                    我们欢迎你的到来！
                  </h4>
                </header>
                <form className='account-create register' onSubmit={handleSubmit}>
                  <div className='create-username'>
                    <label htmlFor='username'>用户名/昵称</label>
                    <input
                      type='username'
                      value={account.username}
                      onChange={(e) => setAccount({ ...account, username: e.target.value })}
                      id='username'
                      autoComplete='off'
                      required
                    />
                  </div>
                  <div className='create-email'>
                    <label htmlFor='email'>邮箱</label>
                    <input
                      type='email'
                      value={account.email}
                      onChange={(e) => setAccount({ ...account, email: e.target.value })}
                      id='email'
                      autoComplete='off'
                      required
                    />
                  </div>
                  <div className='create-password'>
                    <label htmlFor='password'>密码(不少于6位)</label>
                    <input
                      type='password'
                      value={account.password}
                      onChange={(e) => setAccount({ ...account, password: e.target.value })}
                      autoComplete='off'
                      required
                    />
                  </div>
                  <div className='avatar-upload'> 
                    <div> 
                      <label>个人形象</label>
                      <input
                        type='file'
                        accept='image/*'
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setAccount({ ...account, avatar: file });
                            setImagePreview(URL.createObjectURL(file));
                          }
                        }}
                        id='img-file'
                        required
                      />
                    </div>  
                    {imagePreview && (<img src={imagePreview} alt="Preview" className='img-preview' />)}
                  </div>
                  <button
                    type="submit"
                    className={`submit-button ${status === 'idle' && !isFormInValid ? 'active' : status}`}
                    disabled={isFormInValid || status === 'submitting' || status === 'success'}
                  >
                    {status === 'idle' && '创建账户'}
                    {status === 'submitting' && (<span className='spinner-icon' />)}
                    {status === 'success' && <span className='tick-icon' />}
                    {status === 'error' && '创建失败'}
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