import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Nav from '../nav/Nav.jsx';
import Home from '../pages/Home.jsx';
import Blog from '../pages/Home.jsx';
import Post from '../pages/Post.jsx';
import Login from '../pages/Login.jsx';
import { AuthProvider } from '../../contexts/AuthContext.jsx';
import PrivatePage from '../../middlewares/PrivatePage.jsx';

import './Main.css';

const Main = () => {
    return (
        <main className="background">
            <div className="container">
                <AuthProvider>
                    <Nav />
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/" element={<Home />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/photo/:slug" element={<Post />} />
                    </Routes>
                </AuthProvider>
            </div>
        </main>
    );
};

export default Main;
