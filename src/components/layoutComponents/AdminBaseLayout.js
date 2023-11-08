import React from 'react';
import AdminHeader from './AdminHeader';
import Sidebar from './Sidebar';
import Footer from './Footer'

const AdminBaseLayout = ({ children }) => {
    return (
        <div>
            <div className='page-header'><AdminHeader /></div>
            <div className='grid-container'>


                <Sidebar />

                <div className="main-container">
                    {children}
                </div>

            </div>
            <div className='page-footer'><Footer /></div>
        </div>
    );
};

export default AdminBaseLayout;
