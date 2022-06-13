import { useContext } from 'react';
import { Link } from 'react-router-dom';
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
                            <h5 className="me-4 d-inline">Home</h5>
                            <Link to="/research"><h5 className="me-4 d-inline">Research</h5></Link>
                            <h5 className="me-4 d-inline">Features</h5>
                            <Link to="/blogs"><h5 className="me-4 d-inline">Blog</h5></Link>
                            <Link to="/career"><h5 className="me-4 d-inline">Career</h5></Link>
                            <h5 className="me-4 d-inline">Contact</h5>
                        </div>
                    </div>
                    {
                        loggedInUser?.name ? <h5 className={`text-center ${styles['login-btn']} ${styles['nav-elements']}`}><Link to ="/profile">
                        {loggedInUser.name}</Link></h5> :
                        <Link to="/login"><button className={`${styles['login-btn']} ${styles['nav-elements']}`}>Login / Sign up</button></Link>
                    }

                    <div className={styles['hamburger']} data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample"
                        aria-controls="offcanvasExample">
                        <i className="fas fa-bars"></i>
                    </div>
                </ul>
            </nav>
            <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                <div class="offcanvas-header d-flex justify-content-end">
                    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="text-center">
                    <h5>Home</h5>
                    <h5>Research</h5>
                    <h5>Features</h5>
                    <Link to="/blogs"><h5>Blog</h5></Link>
                    <h5>Contact</h5>
                    {loggedInUser?.name ? <h5><Link to ="/profile">
                    {loggedInUser.name}</Link></h5> :
                    <Link to="/login"><button class="login-btn">Login / Sign up</button></Link>}
                </div>
            </div>
        </div>
    );
};

export default Navbar;