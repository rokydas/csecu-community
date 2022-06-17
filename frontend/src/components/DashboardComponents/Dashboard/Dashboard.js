import React from 'react';
import AppSidebar from '../AppSidebar/AppSidebar';

const Dashboard = () => {
    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2 border">
                        <AppSidebar />
                    </div>
                    <div className="col-md-10 border">
                        <div className='d-flex justify-content-center align-items-center' style={{ height: "80vh" }}>
                            <h1>Please select a option from your dashboard</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;