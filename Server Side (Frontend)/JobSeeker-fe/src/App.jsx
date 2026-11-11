import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ProtectRoute from './components/ProtectedRoute';
import DashboardPage from './pages/DashboardPage';
import RequestValidationPage from './pages/RequestValidation';
import JobVacanciesPage from './pages/JobVacanciesPage';
import JobVacancyDetailPage from './pages/JobVacancyDetailPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />} />

        <Route element={<ProtectRoute />}>
          <Route path='/dashboard' element={<DashboardPage />} />
          <Route path='/job-vacancies' element={<JobVacanciesPage />} />
          <Route path='/job-vacancies/:id' element={<JobVacancyDetailPage />} />
          <Route path='/request-validation' element={<RequestValidationPage />} />
        </Route>

        <Route path='*' element={<Navigate to="/dashboard" replace />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
