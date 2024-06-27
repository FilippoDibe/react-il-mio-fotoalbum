import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import ShowPage from './pages/ShowPage';
import Nav from './components/nav/Nav'
import Form from "./components/form/FormPhoto"
function App() {

  return (
   <>
      <BrowserRouter>
        <Nav />
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/show" element={<ShowPage />} />


          </Routes>
      </BrowserRouter>
      <Form/>
   </>
  )
}

export default App
