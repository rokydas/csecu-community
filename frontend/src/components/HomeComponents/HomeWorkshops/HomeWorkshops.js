import React, { useEffect, useState } from 'react';
import Workshop from '../../CommonComponents/Workshop/Workshop';

const HomeWorkshops = () => {

    const authToken = localStorage.getItem('auth-token')
    const [workshops, setWorkshops] = useState([])

    useEffect(() => {
        fetch("https://csecu-community.herokuapp.com/workshop/all", {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if(data.success) {
                    if(data.workshops.length >= 3) {
                        setWorkshops(data.workshops.slice(0, 3))
                    }
                    else {
                        setWorkshops(data.workshops)
                    }
                }
            })

            .catch(error => console.log(error))
    }, []) 

    return (
        <div className='container mt-5 pt-5'>
            <h1 className='text-center mb-3'>Our Upcoming Workshops</h1>
            <div className="row">
                {
                    workshops.map(workshop => <Workshop workshop={workshop} />)
                }
            </div>
        </div>
    );
};

export default HomeWorkshops;