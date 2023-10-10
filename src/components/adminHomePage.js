import React from 'react';
import AdminBaseLayout from './layoutComponents/AdminBaseLayout';
import LanlordRequestTable from './DataDisplayComponents/Tables/landlordRequestTable'

const AdminHomePage = () => {
  return (
    <AdminBaseLayout>
      {/* <LanlordRequestTable /> */}
      <p>Hello đây là admin</p>
    </AdminBaseLayout>
  );
};

export default AdminHomePage;