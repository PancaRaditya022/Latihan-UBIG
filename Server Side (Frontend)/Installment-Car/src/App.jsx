import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import RequestValidationPage from './pages/RequestValidationPage';
import CarsListPage from './pages/CarsListPage';
import CarDetailPage from './pages/CarDetailPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/validation/request" element={<RequestValidationPage />} />
          <Route path="/instalment-cars" element={<CarsListPage />} />
          <Route path="/instalment-cars/:id" element={<CarDetailPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;