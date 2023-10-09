import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer'

const AdminBaseLayout = ({ children }) => {
    return (
        <div>
            <div className='page-header'><Header /></div>
            <div className='container'>
            <div className="row">
                <div className="col-md-2">
                    <Sidebar />
                </div>
                <div className="col-md-10">
                    {children}
                </div>
            </div>
            </div>
            <div className='page-footer'><Footer/></div>
        </div>
    );
};

export default AdminBaseLayout;
