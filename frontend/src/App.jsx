import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Show from './pages/Show.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Login from './pages/Login.jsx';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/show" element={<Show />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />


       
      </Routes>
    </Router>
  );
};

export default App;
