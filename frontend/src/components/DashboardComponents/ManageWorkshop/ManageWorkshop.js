import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../App';
import AppSidebar from '../AppSidebar/AppSidebar';
import loader from '.../../../src/Assets/images/loader.gif'
import ManageWorkshopChild from '../ManageWorkshopChild/ManageWorkshopChild';

const ManageWorkshop = () => {

    const authToken = localStorage.getItem("auth-token");
    const [workshops, setWorkshops] = useState([]);
    const [needUpdate, setNeedUpdate] = useState(false);
    const [loggedInUser, setLoggedInUser] = useContext(AuthContext)

    console.log(workshops)

    useEffect(() => {
        fetch(`https://csecu-community.herokuapp.com/workshop/all`, {
            headers: {
                'Authorization': `Bearer ${authToken}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setWorkshops(data.workshops.reverse());
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
                    <h3 className="text-center my-3">All Workshops</h3>
                    {
                        workshops.length == 0 ? (
                            <div className="d-flex justify-content-center mt-5 pt-5">
                                <img className='text-center' width="100px" src={loader} />
                            </div>
                        ) :
                            <div className="table-responsive" style={{ height: "80vh", margin: "0px 200px" }} >
                                <table className='table table-hover'>
                                    <thead>
                                        <tr>
                                            <th scope="col">Serial</th>
                                            <th scope="col">Title</th>
                                            <th scope="col">Description</th>
                                            <th scope="col">Instructor</th>
                                            <th scope="col">Topic</th>
                                            <th scope="col">Date</th>
                                            <th scope="col">Time</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {workshops.map((workshop, index) => (
                                            <ManageWorkshopChild
                                                workshop={workshop}
                                                index={index} 
                                                setNeedUpdate={setNeedUpdate}
                                                needUpdate={needUpdate}
                                            />
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default ManageWorkshop;