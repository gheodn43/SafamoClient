import React from 'react';
import BaseLayout from './layoutComponents/BaseLayout';

const HomePage = () => {
  // Truy xuất thông tin người dùng từ localStorage
  const storedUsername = localStorage.getItem('username');
  const storedRolesJSON = localStorage.getItem('roles');

  let roles = [];
  if (storedRolesJSON) {
    roles = JSON.parse(storedRolesJSON);
  }

  return (
    <BaseLayout>
      <div>
        <h1>Xin chào, {storedUsername}</h1>
        <p>Vai trò: {roles.join(', ')}</p>
      </div>
    </BaseLayout>
  );
};

export default HomePage;
