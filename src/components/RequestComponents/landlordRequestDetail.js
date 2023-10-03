import React from 'react';

const LandlordReqDetail = ({ onRequestReject, onRequestAccept }) => {
  return (
    <div>
      <h2>Chi tiết yêu cầu</h2>


      <button onClick={onRequestReject}>Từ chối</button>
      <button onClick={onRequestAccept}>Chấp nhận</button>
    </div>
  );
};

export default LandlordReqDetail;
