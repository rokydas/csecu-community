import React, { useEffect, useState } from 'react';
import Workshop from '../../CommonComponents/Workshop/Workshop';

const HomeWorkshops = () => {

    const authToken = localStorage.getItem('auth-token')
    const [workshops, setWorkshops] = useState([])

    useEffect(() => {
        fetch("http://localhost:5000/workshop/all", {
            headers: {
                'auth-token': authToken
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if(data.success) {
                    setWorkshops(data.workshops)
                }
                else {
                    alert(data.msg)
                }
            })

            .catch(error => console.log(error))
    }, []) 

    return (
        <div className='container'>
            <div className="row">
                {
                    workshops.map(workshop => <Workshop />)
                }
            </div>
        </div>
    );
};

export default HomeWorkshops;