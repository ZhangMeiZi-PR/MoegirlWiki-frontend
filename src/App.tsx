import './App.css';
import { Routes, Route } from 'react-router';
import { HomePage } from './pages/HomePage/HomePage';
import { DocumentPage } from './pages/DocumentPage/DocumentPage';
import { SrcPage } from './pages/SrcPage/SrcPage';
function App() {
  

  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path='/documents' element={<DocumentPage />} />
      <Route path='/documents/:srcName' element={<SrcPage />} />
    </Routes>
  )
}

export default App
