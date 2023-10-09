import React from 'react';
import AdminBaseLayout from './layoutComponents/AdminBaseLayout';
import RentalRequestTable from './DataDisplayComponents/Tables/retalRequestTable'

const AdminHomePage = () => {
  // Truy xuất thông tin người dùng từ localStorage
  // const storedUsername = localStorage.getItem('username');
  // const storedRolesJSON = localStorage.getItem('roles');

  // let roles = [];
  // if (storedRolesJSON) {
  //   roles = JSON.parse(storedRolesJSON);
  // }

  return (
    <AdminBaseLayout>
      <RentalRequestTable />
    </AdminBaseLayout>
  );
};

export default AdminHomePage;