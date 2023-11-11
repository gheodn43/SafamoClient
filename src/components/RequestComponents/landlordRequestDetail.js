import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BaseLayout from '../layoutComponents/BaseLayout';
import requestDetailService from '../../services/requestDetailService';

const LandlordReqDetail = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const requestId = queryParams.get('request_id');
  const userId = queryParams.get('user_id');
  const [request, setRequest] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const requestInfo = await requestDetailService.landlordReqDetail(requestId);
  //       setRequest(requestInfo);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchData();
  // }, [requestId]);
console.log(userId)
  const handleAccept = () => {
    
  };

  const handleReject = () => {

  };

  return (
    <BaseLayout>
      <div>
        <h2>Chi tiết yêu cầu {requestId} và {userId}</h2>
        {request && (
          <div>
            {/* Render request details here */}
            <button onClick={handleReject}>Từ chối</button>
            <button onClick={handleAccept}>Chấp nhận</button>
          </div>
        )}
      </div>
    </BaseLayout>
  );
};

export default LandlordReqDetail;
