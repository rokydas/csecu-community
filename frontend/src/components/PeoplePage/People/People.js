import React from 'react';

const People = ( { people } ) => {
    return (
        <div className='col-md-4'>
            <div className='shadow m-3 p-3'>
                <img className='img-fluid w-100' src={people.img} alt="" />
                <h3>{people.name}</h3>
                <p>{people.designation}</p>
                <p>{people.email}</p>
            </div>
        </div>
    );
};

export default People;