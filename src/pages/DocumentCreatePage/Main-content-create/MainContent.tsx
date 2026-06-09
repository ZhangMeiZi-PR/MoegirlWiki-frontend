import './MainContent.css'
import { PreNavBar } from '../Pre-nav-bar-create/Pre-nav-bar';
import { useState } from 'react';

interface DocFormType {
  name: string,
  description: string,
  date: string,
  img: File | null,
  baiduLink: string
}



export function MainContent() {
  const [formData, setFormData] = useState<DocFormType>({
    name: '',
    description: '',
    date: '',
    img: null,
    baiduLink: ''
  });
const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
const [imagePreview, setImagePreview] = useState<string | null>(null);


const handleSubmit = (e: React.SubmitEvent) => {
  e.preventDefault();

  //send data
  setStatus('submitting');
  const dataEnvelope = new FormData();

  dataEnvelope.append('name', formData.name);
  dataEnvelope.append('date', formData.date);
  dataEnvelope.append('description', formData.description);
  dataEnvelope.append('baiduLink', formData.baiduLink);
  if (formData.img) {dataEnvelope.append('img', formData.img);}

  

  fetch('/api/documents/create', {
    method: 'POST',
    body: dataEnvelope
  })
    .then((res) => {
      if (!res.ok) throw new Error('Failed to create Post');
      return res.json()
    })
    .then(() => {
      setStatus('success');
      setTimeout(() => {
        setFormData({
          name: '',
          date: '',
          description: '',
          baiduLink: '',
          img: null
        })
        setImagePreview(null);

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
const isFormInValid = formData.name.trim() === '' || formData.date.trim() === '' || formData.description.trim() === '' || formData.img === null || formData.baiduLink.trim() === '';

return (
  <main className='main-content'>
    <div className='focus-content-padding' >
      <PreNavBar />

      <div className='focus-content blog'>
        <div className='left-content'>
          <div className='page-header'>
            <h1>document create</h1>
          </div>
          <div className='post-list'>
            <div className='post-top-header'>
              <h2>创建文档</h2>
            </div>
            <div className='doc-grid blog'>
              <form className='blog-create' onSubmit={handleSubmit}>
                <div className='create-title'>
                  <label htmlFor='title'>文档名称</label>
                  <input
                    type='text'
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder='请输入文档名'
                    id='title'
                    required
                  />
                </div>
                <div className='create-author document-create'>
                  <label htmlFor='date'>日期</label>
                  <input
                    type='text'
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    placeholder='请输入工程日期'
                    id='date'
                    required
                  />
                </div>
                <div className='create-author'>
                  <label>示例图</label>
                  <input
                    type='file'
                    accept='image/*'
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setFormData({...formData, img: file });
                        setImagePreview(URL.createObjectURL(file));
                      }
                    }}
                    id='img-file'
                    required
                  />
                  {imagePreview && (<img src={imagePreview} alt="Preview" className='img-preview'/>)}
                </div>
                <div className='create-author'>
                  <label htmlFor='date'>百度云链接</label>
                  <input
                    type='text'
                    value={formData.baiduLink}
                    onChange={(e) => setFormData({ ...formData, baiduLink:  e.target.value })}
                    placeholder='请输入链接'
                    id='date'
                    required
                  />
                </div>
                <div className='create-describtion'>
                  <textarea
                    rows={8}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder='请输入描述'
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
      </div>
    </div>
  </main>
)
}