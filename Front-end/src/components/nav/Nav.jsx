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
                <menu>
                    {urlPages.map(({ label, href }, i) => (
                        <li key={`urlPage${i}`}>
                            <NavLink to={href}>{label}</NavLink>
                        </li>
                    ))}
                    {isLoggedIn && (
                    <button onClick={logout} >Logout</button>
                )}
                </menu>
            </nav>
        </header>
    );
};

export default Nav;
