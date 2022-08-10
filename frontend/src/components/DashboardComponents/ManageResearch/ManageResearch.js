import React, { useEffect, useState } from 'react';
import { AiFillEye } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
import AppSidebar from '../AppSidebar/AppSidebar';

const ManageResearch = () => {

    const authToken = localStorage.getItem("auth-token");
    const [researches, setResearches] = useState([]);
    const [needUpdate, setNeedUpdate] = useState(false);

    const handleDeleteResearch = (id) => {
        const url = `http://localhost:5000/research/delete/${id}`
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

    useEffect(() => {
        fetch(`http://localhost:5000/research/all`, {
            headers: {
                'Authorization': `Bearer ${authToken}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setResearches(data.researches.reverse());
                } else {
                    alert(data.msg);
                }
            })
            .catch((error) => console.log(error));
    }, [needUpdate]);

    return (
        <div className='container-fluid'>
            <div className="row">
                <div className="col-md-2 border">
                    <AppSidebar />
                </div>
                <div className="col-md-10 border pb-4" >
                    <h3 className="text-center my-4">All Research Papers</h3>
                    {
                        researches.length == 0 ? (
                            <div className='d-flex justify-content-center mt-5 pt-5'>
                                <div className="spinner-border spinner-border-sm" role="status"></div>
                            </div>
                        ) :
                            <div className="table-responsive" style={{ height: "80vh", margin: "0px 200px" }} >
                                <table className='table table-hover'>
                                    <thead>
                                        <tr>
                                            <th scope="col">Serial</th>
                                            <th scope="col">Title</th>
                                            <th scope="col">Description</th>
                                            <th scope="col">Link</th>
                                            <th scope="col">Publisher</th>
                                            <th scope="col">Date</th>
                                            <th scope="col">View</th>
                                            <th scope="col">Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {researches.map((research, index) => (
                                            <tr>
                                                <td scope="row">{index + 1}</td>
                                                <td>{research.title.substring(0, 30)}</td>
                                                <td>{research.description.substring(0, 20)}</td>
                                                <td><a target="_blank" href={research.publishedLink}>Open</a></td>
                                                <td>{research.publisherName}</td>
                                                <td>{research.date}</td>
                                                <td><Link to={`/research/${research._id}`}><AiFillEye size={25} color="#000" /></Link></td>
                                                <td><MdDelete onClick={() => handleDeleteResearch(research._id)} size={25} /></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default ManageResearch;