import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { store } from './store/store';
import DashboardLayout from './components/layout/DashboardLayout';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home/index';
import Dashboard from './pages/Dashboard/index';
import PaperSetters from './pages/PaperSetters/index';
import Guardians from './pages/Guardians/index';
import ExamCenters from './pages/ExamCenters/index';
import './services/axiosConfig';

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <Routes>
                    <Route index element={<Dashboard />} />
                    <Route path="/paper-setters" element={<PaperSetters />} />
                    <Route path="/guardians" element={<Guardians />} />
                    <Route path="/exam-centers" element={<ExamCenters />} />
                  </Routes>
                </DashboardLayout>
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
