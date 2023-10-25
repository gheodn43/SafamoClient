import React, { useState, useEffect } from 'react';
import requestDetailService from '../../services/requestDetailService';
import RequestTableForLandlord from '../DataDisplayComponents/Tables/requestTableForLandlord';
const RequestForLandlordComponent = () => {
    const [requests, setRequests] = useState([]);
    useEffect(() => {
        requestDetailService.requestsForLandlord()
            .then(data => {
                setRequests(data);
            })
            .catch(error => {
                console.error('Lỗi khi lấy danh sách yêu cầu:', error);
            });
    }, []);

    return (
        <div className='container'>
            <RequestTableForLandlord
            requests={requests}
            />
        </div>

    );
};

export default RequestForLandlordComponent;
