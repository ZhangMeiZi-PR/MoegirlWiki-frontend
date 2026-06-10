import './App.css';
import { Routes, Route } from 'react-router';
import { HomePage } from './pages/HomePage/HomePage';
import { DocumentPage } from './pages/DocumentPage/DocumentPage';
import { SrcPage } from './pages/SrcPage/SrcPage';
import { BlogCreate } from './pages/BlogCreatePage/BlogCreate';
import { BlogDetailPage } from './pages/BlogDetailPage/BlogDetailPage';
import { DocumentCreatePage } from './pages/DocumentCreatePage/DocumentCreatePage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { RegisterPage } from './pages/RegisterPage/RegisterPage';
import { UnauthorizedPage } from './pages/UnauthorizedPage/UnauthorizedPage';
import { Layout } from './layout/layout';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';
import RequireAuth from './components/RequireAuth';
import PersistLogin from './components/PersistLogin';


const Roles = {
  'User': 2007,
  'Editor': 2006,
  'Admin': 2005
}


function App() {

  return (
    <Routes>
      {/* public routes */}
      <Route element={<PersistLogin />}>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path='/documents' element={<DocumentPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/login/register' element={<RegisterPage />} />
          <Route path='/blogs/:id' element={<BlogDetailPage />} />
          <Route path='/unauthorized' element={<UnauthorizedPage />} />

          {/* protected routes: All */}
          <Route element={<RequireAuth allowedRoles={[Roles.Admin, Roles.Editor, Roles.User]} />} >
            <Route path='/blog/create' element={<BlogCreate />} />
            <Route path='/documents/:id' element={<SrcPage />} />
            <Route path='/login/:userId' element={<ProfilePage />} />
          </Route>

          {/* protected routes: Editor & Admin */}
          <Route element={<RequireAuth allowedRoles={[Roles.Admin, Roles.Editor]} />} >
            <Route path='/document/create' element={<DocumentCreatePage />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  )
}

export default App
