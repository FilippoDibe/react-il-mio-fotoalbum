import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import ShowPage from './pages/ShowPage';
import MainLayout from './layouts/MainLayout';
import PrivatePage from './middlewares/PrivatePage';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <BrowserRouter>
        <AuthProvider>
            <MainLayout>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<PrivatePage><Dashboard /></PrivatePage>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/photo/:slug" element={<ShowPage />} />
                  </Routes>
          </MainLayout>
        </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
