import React from 'react';
import AdminBaseLayout from '../layoutComponents/AdminBaseLayout';
import AdminPropertyTable from '../DataDisplayComponents/Tables/AdminPropertyTable';

const AdminProperty = () => {
  return (
    <AdminBaseLayout>
      <AdminPropertyTable />
    </AdminBaseLayout>
  );
};

export default AdminProperty;