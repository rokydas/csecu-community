import React from 'react';
import styles from './Workshop.module.scss'

const Workshop = ({ workshop }) => {
    return (
        <div className={`col-md-4 col-sm-6 col-12`}>
            <div className={`${styles.workshop}`}>
                <img className={`img-fluid w-100`} src={workshop.thumbnail} alt="" />
                <div className={`${styles['workshop-text']}`}>
                    <div className='d-flex justify-content-between'>
                        <p>{workshop.instructorName}</p>
                        <p><i className="fa fa-calendar" aria-hidden="true"></i> {workshop.date}</p>
                    </div>
                    <h3>{workshop.title}</h3>
                    <p>
                        {workshop.description.substring(0, 100)}
                    </p>
                    <button className='custom-btn'>Recorded video</button>
                </div>
            </div>
        </div>
    );
};

export default Workshop;

{/* <div className='col-md-3'>
            <div className="shadow m-2">
                <img className="img-fluid mb-3" src={workshop.thumbnail} alt="" />
                <h4>{workshop.title}</h4>
                <h4>Instructor: {workshop.instructorName}</h4>
                <p>{workshop.description}</p>
                <div className="text-center">
                    <button className="custom-large-btn">See Details</button>
                </div>
            </div>
        </div> */}