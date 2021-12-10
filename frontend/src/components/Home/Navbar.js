import React from 'react';
import styles from './Style/Navbar.module.scss'

const Navbar = () => {
    return (
        <section className={styles.addressContainer}>
            <ul className={`container d-flex justify-content-between align-items-center ${styles.addressBar}`}>
                <ul className={`d-flex flex-column flex-md-column flex-lg-row pt-2 pb-2 ps-0`}>
                    <li className="me-4"><i class="me-2 fas fa-envelope"></i>csecuworkshop@gmail.com</li>
                    <li><i class="me-2 fas fa-map-marker-alt"></i>Chittagong University, Chittagong.</li>
                </ul>
                <ul className={`d-flex justify-content-evenly ${styles.socialIcons} bg-white text-black pt-3 pb-3 ps-0`}>
                    <i className="fab fa-facebook-f"></i>
                    <i className="fab fa-twitter"></i>
                    <i className="fab fa-linkedin-in"></i>
                    <i className="fab fa-youtube"></i>
                </ul>
            </ul>
        </section>
    );
};

export default Navbar;