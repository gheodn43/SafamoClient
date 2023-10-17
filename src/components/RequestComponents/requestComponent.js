import React, { useState, useEffect } from 'react';
import requestDetailService from '../../services/requestDetailService';
import RequestTable from '../DataDisplayComponents/Tables/requestTable';
const RequestComponent = () => {
    const [requests, setRequests] = useState([]);
    useEffect(() => {
        requestDetailService.requestsForSender()
            .then(data => {
                setRequests(data);
            })
            .catch(error => {
                console.error('Lỗi khi lấy danh sách BĐS:', error);
            });
    }, []);

    return (
        <div className='container'>
            <RequestTable
            requests={requests}
            />
        </div>

    );
};

export default RequestComponent;
