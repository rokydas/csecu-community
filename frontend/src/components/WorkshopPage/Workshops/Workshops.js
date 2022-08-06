import React, { useEffect, useState } from 'react';
import Workshop from '../../CommonComponents/Workshop/Workshop';

const Workshops = () => {

    const authToken = localStorage.getItem('auth-token')
    const [workshops, setWorkshops] = useState([])

    useEffect(() => {
        fetch("http://localhost:5000/workshop/all", {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.success) {
                    setWorkshops(data.workshops)
                }
            })
            .catch(error => console.log(error))
    }, [])

    return (
        <div>
            <h1 className='text-center'>Our All Workshops</h1>
            {
                <div className="container">
                    <div className="row">
                        {
                            workshops.map(workshop => <Workshop workshop={workshop} />)
                        }
                    </div>
                </div>
            }
        </div>
    );
};

export default Workshops;