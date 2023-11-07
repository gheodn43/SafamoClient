import React, { useState, useEffect } from 'react';
import requestDetailService from '../../services/requestDetailService';
import RequestTable from '../DataDisplayComponents/Tables/requestTable';

const RequestComponent = () => {
    const [requests, setRequests] = useState([]);
    useEffect(() => {
        loadRequests(); // Tải danh sách yêu cầu ban đầu
    }, []);

    const loadRequests = () => {
        requestDetailService.requestsForSender()
            .then(data => {
                setRequests(data);
            })
            .catch(error => {
                console.error('Lỗi khi lấy danh sách BĐS:', error);
            });
    };

    const handleCancelRentalRequest = async (room_id) => {
        try {
            await requestDetailService.deleteRentalReq(room_id);
            // Sau khi "Hủy yêu cầu" thành công, tải lại danh sách yêu cầu
            loadRequests();
        } catch (error) {
            console.error("Error cancel rental request:", error);
        }
    };

    return (
        <div className='container'>
            <RequestTable
                requests={requests}
                handleCancelRentalRequest={handleCancelRentalRequest}
            />
        </div>
    );
};

export default RequestComponent;
