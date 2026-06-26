import './MainContent.css'
import { PreNavBar } from '../Pre-nav-bar-create/Pre-nav-bar';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import useAuth from '../../../hooks/useAuth';
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor';
import { Editor } from '@tiptap/core';


// interface BlogFormType {
//   title: string,
//   content: string,
//   details: {
//     author: string,
//     avatar: string
//   }
// };


export function MainContent() {
  const { auth } = useAuth();
  const [title, setTitle] = useState("");
  const [editor, setEditor] = useState<Editor | null>(null);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    //send data
    setStatus('submitting');
    setSaving(true);
    if (!title.trim() || !editor) {
      alert("Please fill in title and content");
      return;
    }
    const plainText = editor.getText();
    const wordsArray = plainText.trim().split(/\s+/).filter(Boolean);
    const description = wordsArray.slice(0, 20).join('');

    try {
      const response = await axiosPrivate.post('/api/blogs/create', {
        title,
        content: editor.getHTML(),
        description,
        details: {
          author: auth.user?.username,
          userId: auth.user?.id,
          avatar: auth.user?.avatar
        },
      });
      console.log(response.data);
      setStatus('success');
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (err) {
      console.error(err instanceof Error ? err.message : 'Unknown error');
      setStatus('error');
      //catch expired refreshToken?
      setTimeout(() => {
        setStatus('idle');
        setSaving(false);
      }, 1500);
    }
  }

  return (
    <main className='main-content'>
      <div className='focus-content-padding' >
        <PreNavBar />

        <div className='focus-content blog'>
          <div className='left-content'>
            <form className='header-blog-create' onSubmit={handleSubmit}>
              <div className='title-input'>
                <input type="text" placeholder="起一个标题吧..." name="text" className="input" value={title} onChange={e => setTitle(e.target.value)} autoComplete='off' />
              </div>
              <button
                type="submit"
                className={`submit-button ${status === 'idle' && !saving ? 'active' : status}`}
                disabled={saving || status === 'submitting' || status === 'success'}
              >
                {status === 'idle' && '发布'}
                {status === 'submitting' && (<span className='spinner-icon' />)}
                {status === 'success' && <span className='tick-icon' />}
                {status === 'error' && '发布失败'}
              </button>
            </form>
            <div className='post-list blog'>
              <SimpleEditor onEditorReady={setEditor} />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}