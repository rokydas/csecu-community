import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SingleAbout.module.scss'

const SingleAbout = ({ aboutElement }) => {

    const navigate = useNavigate()

    return (
        <div className="col-md-6 col-lg-3 mb-5">
            <div className={`${styles['about']} shadow text-center p-5`}>
                <img className={`${styles['about-img']} img-fluid mb-3`} src={aboutElement.img} alt="" />
                <h4>{aboutElement.title}</h4>
                <p>{aboutElement.description}</p>
                <button onClick={() => navigate(aboutElement.redirect)} className="custom-large-btn">See more</button>
            </div>
        </div>
    );
};

export default SingleAbout;