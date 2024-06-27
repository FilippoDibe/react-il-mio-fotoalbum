import "./Nav.css";
import {Link, NavLink} from "react-router-dom";


const urlPage = [
    {
        label: "Home",
        href: "/"
    },
    {
        label: "Show",
        href: "/show"
    },
    {
        label: "Dashboard",
        href: "/dashboard"
    },
    {
        label: "Login",
        href: "/login"
    }

]

const Nav = () => {
    return (
        <header>
            <nav>
                <menu>
                    {urlPage.map(({label, href}, i) =>(
                        <li key={`urlPages${i}`}>
                            <NavLink to={href}>{label}</NavLink>
                        </li>
                    ))}
                </menu>
            </nav>
        </header>
    )
}

export default Nav;