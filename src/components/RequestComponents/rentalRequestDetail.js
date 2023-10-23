import React, { useState, useEffect} from 'react';
import BaseLayout from '../layoutComponents/BaseLayout';
const RentalRequestDetail = () => {

    // lấy thông tin user
    // lấy thông tin thuê


    const handleGoBack = () => {
        window.history.back();
    };

    const handleAcceptRequest = () => {
        // Xử lý logic khi chấp nhận yêu cầu thuê
    };

    const handleRejectRequest = () => {
        // Xử lý logic khi từ chối yêu cầu thuê
    };
    return (
        <BaseLayout>
            <div className='container'>
                <div className='row'>
                    <h2>Chi tiết yêu cầu thuê</h2>
                </div>
                <div className='row'>
                    <div className='col-md-8'>
                        // thông tin user
                    </div>
                    <div className='col-md-4'>
                        // thông tin yêu cầu
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
