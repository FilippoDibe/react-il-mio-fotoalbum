import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import './Nav.css';

const urlPages = [
    {
        label: 'Home',
        href: '/'
    },
    {
        label: 'Dashboard',
        href: '/dashboard'
    },
    {
        label: 'Login',
        href: '/login'
    },
]

const Nav = () => {
     const { isLoggedIn, logout } = useAuth();

     return (
        <header>
            <nav className="navbar">
                <ul className="navbar-menu">
                    {urlPages.map(({ label, href }, i) => (
                        <li key={`urlPage${i}`} className="navbar-item">
                            <NavLink to={href} className="navbar-link">{label}</NavLink>
                        </li>
                    ))}
                    {isLoggedIn && (
                        <li className="navbar-item">
                            <button onClick={logout} className="navbar-button">Logout</button>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Nav;
