import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardPage from './pages/DashboardPage';
import RequestConsultation from './pages/RequestConsultation';
import SpotDetailPage from './pages/SpotDetailPage';
import VaccinationSpotsPage from './pages/VaccinationSpotPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/request-consultation" element={<RequestConsultation />} />
          <Route path="/register-vaccination" element={<VaccinationSpotsPage />} />
          <Route path="/vaccination-spots/:id" element={<SpotDetailPage />} />
          <Route path="/spot-list" element={<VaccinationSpotsPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;