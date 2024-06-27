import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import ShowPage from './pages/ShowPage';
import MainLayout from './layouts/MainLayout';

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/photo/:slug" element={<ShowPage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
