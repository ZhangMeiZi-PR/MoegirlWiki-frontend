import './MainContent.css'
import { PreNavBar } from '../Pre-nav-bar-create/Pre-nav-bar';
import { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { useNavigate } from 'react-router';

interface DocFormType {
  name: string,
  author: string | undefined,
  userId: string | undefined,
  description: string,
  date: string,
  img: File | null,
  baiduLink: string
}



export function MainContent() {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { auth } = useAuth();
  const [formData, setFormData] = useState<DocFormType>({
    name: '',
    author: auth.user?.username,
    userId: auth.user?.id,
    description: '',
    date: '',
    img: null,
    baiduLink: ''
  });

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    //send data
    setStatus('submitting');
    const dataEnvelope = new FormData();
    dataEnvelope.append('name', formData.name);
    dataEnvelope.append('date', formData.date);
    dataEnvelope.append('description', formData.description);
    dataEnvelope.append('baiduLink', formData.baiduLink);
    dataEnvelope.append('author', formData.author || '');
    dataEnvelope.append('userId', formData.userId || '');
    if (formData.img) {dataEnvelope.append('img', formData.img )};

    try {
      const response = await axiosPrivate.post('/api/documents/create', dataEnvelope, {
        headers: {
          'Content-Type': 'mutipart/form-data'
        }
      });
      console.log(response.data);
      setStatus('success');
      setTimeout(() => {
        navigate(0);
        setImagePreview(null);
      }, 1500);
    } catch (err) {
      console.error(err instanceof Error ? err.message : 'Unknown error');
      setStatus('error');
      //catch expired refreshToken?
      setTimeout(() => {
        setStatus('idle');
      }, 1500);
    }
  }
    const isFormInValid = formData.name.trim() === '' || formData.date.trim() === '' || formData.description.trim() === '' || formData.img === null || formData.baiduLink.trim() === '';

    return (
      <main className='main-content'>
        <div className='focus-content-padding' >
          <PreNavBar />
          <div className='post-list'>
            <div className='post-top-header'>
              <h2>创建文档</h2>
            </div>
            <div className='create-doc-grid'>
              <form className='doc-create-list' onSubmit={handleSubmit}>
                <div className='create-title'>
                  <label htmlFor='title'>文档名称</label>
                  <input
                    type='text'
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder='请输入文档名'
                    id='title'
                    autoComplete='off'
                    required
                  />
                </div>
                <div className='create-date'>
                  <label htmlFor='date'>日期</label>
                  <input
                    type='text'
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    placeholder='请输入工程日期'
                    id='date'
                    autoComplete='off'
                    required
                  />
                </div>
                <div className='create-example'>
                  <div className='create-example-header'>
                    <h2>示例图</h2>
                    <label htmlFor='img-file'>点击上传图片</label>
                    <input
                      type='file'
                      accept='image/*'
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setFormData({ ...formData, img: file });
                          setImagePreview(URL.createObjectURL(file));
                        }
                      }}
                      id='img-file'
                      required
                      hidden
                    />
                  </div>
                  {imagePreview && (<img src={imagePreview} alt="Preview" className='create-example-preview' />)}
                </div>
                <div className='create-link'>
                  <label htmlFor='date'>百度云链接</label>
                  <input
                    type='text'
                    value={formData.baiduLink}
                    onChange={(e) => setFormData({ ...formData, baiduLink: e.target.value })}
                    placeholder='请输入链接'
                    id='date'
                    autoComplete='off'
                    required
                  />
                </div>
                <div className='create-description'>
                  <textarea
                    rows={8}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder='请输入描述'
                    autoComplete='off'
                    required
                  />
                </div>
                <button
                  type="submit"
                  className={`submit-button ${status === 'idle' && !isFormInValid ? 'active' : status}`}
                  disabled={isFormInValid || status === 'submitting' || status === 'success'}
                >
                  {status === 'idle' && '发布'}
                  {status === 'submitting' && (<span className='spinner-icon' />)}
                  {status === 'success' && <span className='tick-icon' />}
                  {status === 'error' && '发布失败'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    )
  }