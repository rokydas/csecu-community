import React, { useEffect, useState } from 'react';

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
            <h1>Our All Workshops</h1>
            {
                <div className="row">
                    {
                        workshops.map(workshop => <Workshop workshop={workshop} />)
                    }
                </div>
            }
        </div>
    );
};

export default Workshops;