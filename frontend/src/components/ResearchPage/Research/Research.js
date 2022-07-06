import React from 'react';
import { useNavigate } from 'react-router-dom';

const Research = ({ research }) => {

    const navigate = useNavigate();

    return (
        <div className="col-md-4">
            <div className='shadow p-3'>
                <h3>{research.title}</h3>
                <p>{research.description.substring(0, 100)} </p>
                <h6>{research.publisherName} </h6>
                <h6>{research.date}</h6>
                <button onClick={() => {navigate(`/research/${research._id}`)}} className='custom-btn mt-2'>See More</button>
            </div>
        </div>
    );
};

export default Research;