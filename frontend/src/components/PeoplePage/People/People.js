import React from 'react';
import { Link } from 'react-router-dom';

const People = ({ people }) => {
    console.log(people)
    return (
        <div className='col-md-4 col-lg-4'>
            <div className='shadow m-3 p-3 text-center'>
                <div className="d-flex justify-content-center mb-3">
                    <img className='image-cropper' src={people.img} alt="" />
                </div>
                <h5>{people.name}</h5>
                <h6>{people.designation}</h6>
                <h6>Email: {people.email}</h6>
                <h6 className='mb-3'>Session: {people.session}</h6>
                <Link to={`/people-profile/${people._id}`}><button className='custom-btn'>Profile</button></Link>
            </div>
        </div>
    );
};

export default People;