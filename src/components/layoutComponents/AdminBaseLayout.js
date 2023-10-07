import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

const AdminBaseLayout = ({ children }) => {
    return (
        <div className="container-fluid">
            <div className="row">
                <Header />
            </div>
            <div className="row">
                <div className="col-md-2">
                    <Sidebar />
                </div>
                <div className="col-md-10">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AdminBaseLayout;
