import './App.css';
import { Routes, Route } from 'react-router';
import { HomePage } from './pages/HomePage/HomePage';
import { DocumentPage } from './pages/DocumentPage/DocumentPage';
import { SrcPage } from './pages/SrcPage/SrcPage';
import { BlogCreate } from './pages/BlogCreatePage/BlogCreate';
import { BlogDetailPage } from './pages/BlogDetailPage/BlogDetailPage';
import { DocumentCreatePage } from './pages/DocumentCreatePage/DocumentCreatePage';

function App() {

  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path='/documents' element={<DocumentPage />} />
      <Route path='/document/create' element={<DocumentCreatePage />} />
      <Route path='/documents/:id' element={<SrcPage />} />
      <Route path='/blog/create' element={<BlogCreate />} />
      <Route path='/blogs/:id' element={<BlogDetailPage />} />
    </Routes>
  )
}

export default App
