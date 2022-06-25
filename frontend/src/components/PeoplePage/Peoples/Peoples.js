import React, { useEffect, useState } from 'react';
import People from '../People/People';


const Peoples = ({ peoples }) => {

    return (
        <div className='container'>
            <div className="row">
                {
                    peoples.map(people => <People people={people} />)
                }
            </div>
        </div>
    )

};

export default Peoples;