import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar'

const AdminBaseLayout = ({ children }) => {
    return (
        <div>
            <Header />
            <Sidebar />
            {children}
            {/* footer */}
        </div>
    );
};
export default AdminBaseLayout;