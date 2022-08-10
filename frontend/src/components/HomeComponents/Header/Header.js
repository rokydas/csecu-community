import React from 'react';
import styles from './Header.module.scss'
import '../../../CommonStyles/style.scss'

const Header = () => {
    return (
        <section className={`${styles['banner-container']} d-flex align-items-center`}>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 p-5">
                        <h1>CSE CU Community</h1>
                        <p>CSECU COMMUNITY is a web based system. The category of our system is online communities like as discussion group. The system will be help to benefit the current students of CSECU. Students can improve their skill by content sharing, seminar, workshop, etc by taking advice and contacting with teacher and expertise person from our department by the system.  They can also share innovative idea and development skill through the system. As a result, this approach will grow communication among students and teachers by sharing knowledge via blog and research paper. Students also can keep updated themselves about career opportunities in IT sector.</p>
                        <button className="custom-large-btn mb-2 me-3">Facebook Group</button>
                        <button className="blank-btn">Mail Us</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Header;