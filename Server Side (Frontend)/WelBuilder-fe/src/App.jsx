import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';

import './App.css'
import Pages from './pages/PagesPage';
import RegisterPage from './pages/RegisterPage';
import BuilderPage from './pages/BuilderPage';
import PreviewPage from './pages/PreviewPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/login' />} />

        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path='/pages' element={<Pages />} />
          <Route path='/pages/:slug/builder' element={<BuilderPage />} />
          <Route path='/pages/:slug/preview' element={<PreviewPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
