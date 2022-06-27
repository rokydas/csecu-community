import { useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { AuthContext } from '../../../App';
import styles from './Navbar.module.scss';

const Navbar = () => {

    const [loggedInUser, setLoggedInUser] = useContext(AuthContext)

    return (
        <div>
            <nav>
                <ul className={`${styles['address-bar']} container d-flex justify-content-between align-items-center`}>
                    <div>
                        <h3>CSE CU Community</h3>
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                        <div className={`${styles['nav-elements']}`}>
                            <h5 className="me-4 d-inline"><Link to="/" className={styles.nav_item}>Home</Link></h5>
                            <Link to="/workshop" className={styles.nav_item}><h5 className="me-4 d-inline">Workshop</h5></Link>
                            <Link to="/blogs" className={styles.nav_item}><h5 className="me-4 d-inline">Blog</h5></Link>
                            <Link to="/career" className={styles.nav_item}><h5 className="me-4 d-inline">Career</h5></Link>
                            <Link to="/people" className={styles.nav_item}><h5 className="me-4 d-inline">People</h5></Link>
                            <Link to="/dashboard" className={styles.nav_item}><h5 className="me-4 d-inline">Dashboard</h5></Link>
                            {
                                loggedInUser.email && 
                                <h5 onClick={() => {
                                    setLoggedInUser({})
                                    localStorage.removeItem("auth-token")
                                }} className="me-4 d-inline" style={{ cursor: "pointer"}}>Logout</h5>
                            }
                        </div>
                    </div>
                    {
                        loggedInUser?.name ? <h5 className={`text-center ${styles['login-btn']} ${styles['nav-elements']}`}><Link to ="/profile" style={{ textDecoration: 'none', color: 'white' }}>
                        {loggedInUser.name}</Link></h5> :
                        <Link to="/login" className={styles.nav_item}><button className={`${styles['login-btn']} ${styles['nav-elements']}`}>Login / Sign up</button></Link>
                    }

                    <div className={styles['hamburger']} data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample"
                        aria-controls="offcanvasExample">
                        <i className="fas fa-bars"></i>
                    </div>
                </ul>
            </nav>
            <div className="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                <div className="offcanvas-header d-flex justify-content-end">
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="text-center">
                    <h5><Link to="/" className={styles.nav_item}>Home</Link></h5>
                    <Link to="/workshop"><h5>Workshop</h5></Link>
                    <Link to="/blogs" className={styles.nav_item}><h5>Blog</h5></Link>
                    <Link to="/career" className={styles.nav_item}><h5>Career</h5></Link>
                    <Link to="/people" className={styles.nav_item}><h5>People</h5></Link>
                    <Link to="/dashboard" className={styles.nav_item}><h5>Dashboard</h5></Link>
                    {loggedInUser?.name ? <h5><Link to ="/profile" style={{ textDecoration: 'none', color: 'white' }}>
                    {loggedInUser.name}</Link></h5> :
                    <Link to="/login" className={styles.nav_item}><button className="login-btn">Login / Sign up</button></Link>}
                </div>
            </div>
        </div>
    );
};

export default Navbar;