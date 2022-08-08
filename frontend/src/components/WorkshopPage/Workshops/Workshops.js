import React, { useEffect, useState } from 'react';
import Workshop from '../../CommonComponents/Workshop/Workshop';

const Workshops = () => {

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
                if (data.success) {
                    setWorkshops(data.workshops)
                }
            })
            .catch(error => console.log(error))
    }, [])

    if (workshops.length == 0) {
        return (
            <div className='d-flex justify-content-center mt-5 pt-5'>
                <div className="spinner-border spinner-border-sm" role="status"></div>
            </div>
        )
    }

    return (
        <div>
            <h1 className='text-center my-2'>Our Workshops</h1>
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