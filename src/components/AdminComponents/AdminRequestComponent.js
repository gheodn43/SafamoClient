import React from 'react';
import AdminBaseLayout from '../layoutComponents/AdminBaseLayout';
import LanlordRequestTable from '../DataDisplayComponents/Tables/landlordRequestTable'

const Requests = () => {
  return (
    <AdminBaseLayout>
      <LanlordRequestTable />
    </AdminBaseLayout>
  );
};

export default Requests;