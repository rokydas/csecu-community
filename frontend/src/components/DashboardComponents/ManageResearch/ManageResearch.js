import React, { useEffect, useState } from 'react';
import AppSidebar from '../AppSidebar/AppSidebar';

const ManageResearch = () => {

    const authToken = localStorage.getItem("auth-token");
    const [researches, setResearches] = useState([]);
    const [needUpdate, setNeedUpdate] = useState(false);

    useEffect(() => {
        fetch(`https://csecu-community.herokuapp.com/research/all`, {
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
                    <h3 className="text-center my-3">All Researches</h3>
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
                                            <th scope="col">Published Link</th>
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
                                                <td>{research.title.substring(0, 100)}</td>
                                                <td>{research.description.substring(0, 100)}</td>
                                                <td>{research.publishedLink}</td>
                                                <td>{research.author}</td>
                                                <td>{research.date}</td>
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