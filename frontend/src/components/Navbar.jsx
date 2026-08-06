import { NavLink } from "react-router-dom";
import logo from "../assets/images/mock.png";
import styles from "./Navbar.module.css";

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <div className={styles.navbarContent}>
                <NavLink to="/">
                    <img
                        src={logo}
                        alt="Clinic Finder logo"
                        className={styles.logo}
                    />
                </NavLink>

                <div className={styles.links}>
                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) =>
                            isActive ? `${styles.link} ${styles.active}` : styles.link
                        }
                    >
                        Find a Provider
                    </NavLink>

                    <NavLink
                        to="/resources"
                        className={({ isActive }) =>
                            isActive ? `${styles.link} ${styles.active}` : styles.link
                        }
                    >
                        Resources
                    </NavLink>

                    <NavLink
                        to="/about"
                        className={({ isActive }) =>
                            isActive ? `${styles.link} ${styles.active}` : styles.link
                        }
                    >
                        About
                    </NavLink>
                </div>
            </div>
        </nav>
    );
}

