import React from 'react';
import { useLocation } from 'react-router-dom';
import BaseLayout from '../layoutComponents/BaseLayout';
import GenerateContractDocument from '../ContractComponents/generateContractDocument';

const PrepareContractAndInvoice = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const room_id = queryParams.get('room_id');
  const user_id = queryParams.get('user_id');
  const requestId = queryParams.get('requestId');


  return (
    <BaseLayout>
      <div>
        <p>Room ID: {room_id}</p>
        <p>User ID: {user_id}</p>
        <p>Request ID: {requestId}</p>
        <GenerateContractDocument/>
      </div>
    </BaseLayout>
  );
};

export default PrepareContractAndInvoice;
