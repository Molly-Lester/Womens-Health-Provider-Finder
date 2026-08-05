import { NavLink } from "react-router-dom";
import logo from "../assets/images/logo.png";
import styles from "./Navbar.module.css";

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <NavLink to="/">
                <img
                    src={logo}
                    alt="Clinic Finder logo"
                    className={styles.logo}
                />
            </NavLink>

            <div className={styles.links}>
                <NavLink className={styles.link} to="/">Find a Provider</NavLink>
                <NavLink className={styles.link} to="/resources">Resources</NavLink>
                <NavLink className={styles.link} to="/about">About</NavLink>
            </div>
        </nav>
    );
}