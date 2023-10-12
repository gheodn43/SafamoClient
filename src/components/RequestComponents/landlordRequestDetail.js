import React from 'react';
import BaseLayout from '../layoutComponents/BaseLayout';

const LandlordReqDetail = ({ onRequestReject, onRequestAccept }) => {
  return (
    <BaseLayout>
      <div>
        <h2>Chi tiết yêu cầu</h2>
        <button onClick={onRequestReject}>Từ chối</button>
        <button onClick={onRequestAccept}>Chấp nhận</button>
      </div>
    </BaseLayout>
  );
};

export default LandlordReqDetail;
