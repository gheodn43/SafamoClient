import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BaseLayout from '../layoutComponents/BaseLayout';
import userService from '../../services/userService';
import requestDetailService from '../../services/requestDetailService';
import PrepareContractAndInvoice from '../RoomComponents/prepareContractAndInvoice';

const RentalRequestDetail = () => {
    const { requestId } = useParams();
    const [error, setError] = useState(0);
    const [sender, setSender] = useState(null);
    const [request, setRequest] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const requestData = await requestDetailService.getOneRentalReq(requestId);
                setRequest(requestData);
                const userId = requestData.user_id;
                const senderData = await userService.getUserInfo(userId);
                setSender(senderData);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchData(); 
    }, [requestId]); 

    const handleGoBack = () => {
        window.history.back();
    };

    const handleAcceptRequest = () => {
        const { user_id, room_id } = request;
        navigate(`/rental_manage/contract-prepare?user_id=${user_id}&room_id=${room_id}&requestId=${requestId}`);
    };
    const handleRejectRequest = () => {
    };

    if (!request || !sender) {
        return <div>Loading...</div>;
    }

    return (
        <BaseLayout>
            <div className='container'>
                <div className='row'>
                    <h2>Chi tiết yêu cầu thuê</h2>
                </div>
                <div className='row'>
                    <div className='col-md-8'>
                        <p>Người gửi yêu cầu: {sender.fullname !== null ? sender.fullname : "<Chưa được cập nhật>"}</p>
                        <p>NTNS: {sender.birthdate !== null ? sender.birthdate : "<Chưa được cập nhật>"}</p>
                        <p>Số điện thoại: {sender.phone_number !== null ? sender.phone_number : "<Chưa được cập nhật>"}</p>
                        <p>Email: {sender.email !== null ? sender.email : "<Chưa được cập nhật>"}</p>
                        <p>Địa chỉ: {sender.address !== null ? sender.address : "<Chưa được cập nhật>"}</p>
                    </div>
                    <div className='col-md-4'>
                        <p>Mô tả: {request.description !== null ? request.description : "<Chưa được cập nhật>"}</p>
                        <p>Thời hạn thuê: {request.duarationTime !== null ? request.duarationTime : "<Chưa được cập nhật>"}</p>
                        <p>Yêu cầu được gửi lúc: {request.timeStamp !== null ? request.timeStamp : "<Chưa được cập nhật>"}</p>
                        <p>Trạng thái yêu cầu: {request.requestStatus !== null ? request.requestStatus : "<Chưa được cập nhật>"}</p>
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <button className='btn btn-secondary' onClick={handleGoBack}>Quay lại</button>
                    </div>
                    <div className='col text-right'>
                        <button className='btn btn-success' onClick={handleAcceptRequest}>Chấp nhận yêu cầu thuê</button>
                        <button className='btn btn-danger' onClick={handleRejectRequest}>Từ chối yêu cầu</button>
                    </div>
                </div>
            </div>
        </BaseLayout>
    );
};

export default RentalRequestDetail;
