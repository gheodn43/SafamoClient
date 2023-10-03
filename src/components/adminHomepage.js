import React from 'react';
import AdminBaseLayout from './layoutComponents/AdminBaseLayout';
import RentalRequestTable from './DataDisplayComponents/Table/rentalRequestTable';

const AdminHomePage = () => {
  // Truy xuất thông tin người dùng từ localStorage
  const storedUsername = localStorage.getItem('username');
  const storedRolesJSON = localStorage.getItem('roles');

  let roles = [];
  if (storedRolesJSON) {
    roles = JSON.parse(storedRolesJSON);
  }

  return (
    <AdminBaseLayout>
      <div>
        <h1>Xin chào, {storedUsername}</h1>
        <p>Vai trò: {roles.join(', ')}</p>
      </div>
      <RentalRequestTable />
    </AdminBaseLayout>
  );
};

export default AdminHomePage;