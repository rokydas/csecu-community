import React from 'react';
import styles from './Navbar.module.scss'

const Navbar = () => {
    return (
        <nav>
            <ul className={`${styles['address-bar']} container d-flex justify-content-between align-items-center`}>
                <div>
                    <h3>CSE CU Community</h3>
                </div>
                <div className="d-flex justify-content-center align-items-center">
                    <div className={`${styles['nav-elements']}`}>
                        <h5 className="me-4 d-inline">Home</h5>
                        <h5 className="me-4 d-inline">Research</h5>
                        <h5 className="me-4 d-inline">Features</h5>
                        <h5 className="me-4 d-inline">Blog</h5>
                        <h5 className="me-4 d-inline">Contact</h5>
                    </div>
                </div>
                <button className={`${styles['login-btn']} ${styles['nav-elements']}`}>Login / Sign up</button>

                <div className={styles['hamburger']} data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample"
                    aria-controls="offcanvasExample">
                    <i className="fas fa-bars"></i>
                </div>
            </ul>
        </nav>
    );
};

export default Navbar;