import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../App';
import AppSidebar from '../AppSidebar/AppSidebar';

const AddAdmin = () => {

    const [email, setEmail] = useState("")
    const authToken = localStorage.getItem("auth-token");
    const [loggedInUser, setLoggedInUser] = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(false)

    const addAdmin = (e) => {
        e.preventDefault()
        setIsLoading(true)

        fetch(`https://csecu-community.herokuapp.com/auth/add-admin/${loggedInUser._id}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setIsLoading(false)
                    alert("Admin added successfully")
                    setEmail("")
                } else {
                    setIsLoading(false)
                    alert(data.msg)
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AppSidebar />
                </div>
                <div className="col-md-10">
                    <div className="row d-flex justify-content-center">
                        <div className="w-75">
                            <h3 className='text-center my-2'>Make an admin</h3>
                            <form onSubmit={addAdmin}>
                                <h6>Enter email</h6>
                                <input onChange={(e) => setEmail(e.target.value)} className='form-control my-2' placeholder='email' value={email} name="email" />
                                {
                                    isLoading ? <div className="spinner-border spinner-border-sm my-3" role="status"></div>
                                        : <button className='custom-btn'>Submit</button>
                                }
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddAdmin;