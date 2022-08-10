import React, { useContext, useEffect, useState } from 'react';
import { MdDelete } from 'react-icons/md';
import loader from '.../../../src/Assets/images/loader.gif'

const ManageWorkshopChild = ({ workshop, index, setNeedUpdate, needUpdate }) => {

    const [isLoading, setIsLoading] = useState(false)
    const authToken = localStorage.getItem("auth-token");

    const handleStatusChange = (e) => {
        setIsLoading(true)

        fetch(`http://localhost:5000/workshop/change-status/${workshop._id}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({status: e.target.value})
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setNeedUpdate(!needUpdate)
                    alert("Status updated successfully")
                } else {
                    alert(data.msg)
                }
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }

    // delete method 
    const handleDeleteWorkshop = id => {
        console.log(id);
        const url = `http://localhost:5000/workshop/delete/${id}`
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${authToken}`,
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    alert("Deleted successfully")
                    setNeedUpdate(!needUpdate)
                }
                else {
                    alert(data.msg)
                }
            })
            .catch(error => console.log(error))
    }

    return (
        <tr>
            <td scope="row">{index + 1}</td>
            <td>{workshop.title.substring(0, 10)}</td>
            <td>{workshop.description.substring(0, 20)}</td>
            <td>{workshop.instructorName}</td>
            <td>{workshop.topic.substring(0, 100)}</td>
            <td>{workshop.date}</td>
            <td>{workshop.time}</td>
            {
                isLoading ? (
                    <div className="d-flex justify-content-center">
                        <img className='text-center' width="20px" src={loader} />
                    </div>
                )
                    :
                    <select onChange={handleStatusChange} className="form-select" value={workshop.status}>
                        <option key="Pending" value="Pending">Pending</option>
                        <option key="Done" value="Done">Done</option>
                    </select>
            }
            <td><MdDelete onClick={() => handleDeleteWorkshop(workshop._id)} size={25} /></td>
        </tr>
    );
};

export default ManageWorkshopChild;