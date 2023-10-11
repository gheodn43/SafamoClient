import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import propertyService from '../../../services/propertyService';
import BaseLayout from '../../layoutComponents/BaseLayout';
import back_icon from '../../../assets/images/go_back_icon.png'

const CustomerPropertyDetail = () => {
    const { requestId } = useParams();
    const [property, setProperty] = useState(null);
    const [responseData, setResponseData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        propertyService.CustomerGetOneProperty(requestId)
            .then(data => {
                setProperty(data);
            })
            .catch(error => {
                console.error('Lỗi khi lấy BĐS:', error);
            });
    }, [requestId]);

    const handleBackClick = () => {
        navigate('/rental_manage/property');
    };
    const handleClickEdit = async () => {
        try {
            await propertyService.customerEditProperty(requestId);
            console.log("chuẩn bị màn hình edit");
        } catch (error) {
            console.error('Lỗi khi chấp nhận BĐS:', error);
        }
    };
    return (
        <BaseLayout>
            {property && (
                <div className='container'>
                    <h2>Thông tin chi tiết BĐS</h2>
                    <div className='row'>
                        <div className='col-md-7'>
                            <p>Tên BĐS: {property.propertyName}</p>
                            <p>Địa chỉ: {property.address}</p>
                            <p>Số lượng phòng cho thuê: {property.unitForRent}</p>
                            <p>Loại tài sản: {property.propertyRole}</p>
                            <p>Trạng thái: {property.status}</p>
                        </div>
                        <div className='col-md-4'>
                            <img src={property.pictureUrl} alt="Ảnh tài sản" style={{ height: "400px" }} />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-8">
                            <button className="btn btn-secondary" onClick={handleBackClick}>
                                <img src={back_icon} alt="Safamo admin Logo" style={{ height: '35px' }} />Quay lại
                            </button>
                        </div>
                        <div className="col-2 text-right">
                            <button className="btn btn-success" onClick={handleClickEdit}>Chỉnh sửa thông tin</button>
                        </div>

                    </div>
                </div>
            )}
        </BaseLayout>
    );
};

export default CustomerPropertyDetail;
