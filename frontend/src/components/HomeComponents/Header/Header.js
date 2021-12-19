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
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem aut, accusamus itaque laboriosam
                            beatae
                            hic consequuntur repellat minima incidunt adipisci ad labore harum quo, tempora sit vitae est
                            eveniet
                            excepturi!</p>
                        <button className="custom-btn mb-2 me-3">Facebook Group</button>
                        <button className="blank-btn">Mail Us</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Header;