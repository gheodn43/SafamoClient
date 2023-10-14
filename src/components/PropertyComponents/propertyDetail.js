import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminBaseLayout from '../layoutComponents/AdminBaseLayout';
import propertyService from '../../services/propertyService';
import back_icon from '../../assets/images/go_back_icon.png';

const AdminPropertyDetail = () => {
    const { requestId } = useParams();
    const [property, setProperty] = useState(null);
    const [responseData, setResponseData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        propertyService.adminGetOneProperty(requestId)
            .then(data => {
                setProperty(data);
            })
            .catch(error => {
                console.error('Lỗi khi lấy BĐS:', error);
            });
    }, [requestId]);

    const handleBackClick = () => {
        navigate('/admin/property');
    };

    const handleAccept = async () => {
        try {
            await propertyService.adminAcceptProperty(requestId);
            setResponseData("Tài sản đã được chấp nhận thành công.");
            navigate('/admin/property');
        } catch (error) {
            console.error('Lỗi khi chấp nhận BĐS:', error);
        }
    };

    const handleDenie = async () => {
        try {
            await propertyService.adminDenieProperty(requestId);
            setResponseData("Tài sản đã bị từ chối.");
            navigate('/admin/property');
        } catch (error) {
            console.error('Lỗi khi từ chối BĐS:', error);
        }
    };

    const handleBlock = async () => {
        const confirmation = window.confirm("Bạn có chắc chắn muốn khóa tài sản này?");
        if (confirmation) {
            try {
                await propertyService.adminBlockProperty(requestId);
                setResponseData("Tài sản đã bị khóa.");
                navigate('/admin/property');
            } catch (error) {
                console.error('Lỗi khi khóa BĐS:', error);
            }
        }
    };

    const handleUnblock = async () => {
        const confirmation = window.confirm("Bạn có chắc chắn muốn mở khóa tài sản này?");
        if (confirmation) {
            try {
                await propertyService.adminUnblockProperty(requestId);
                setResponseData("Tài sản đã được mở khóa.");
                navigate('/admin/property');
            } catch (error) {
                console.error('Lỗi khi mở khóa BĐS:', error);
            }
        }
    };

    return (
        <AdminBaseLayout>
            {property && (
                <div>
                    <h2>Thông tin chi tiết BĐS</h2>
                    <div className='row'>
                        <div className='col-md-7'>
                            <p>ID: {property.property_id}</p>
                            <p>Tên BĐS: {property.propertyName}</p>
                            <p>Địa chỉ: {property.address}</p>
                            <p>Ngày đăng ký: {property.registrationDate}</p>
                            <p>Số lượng phòng cho thuê: {property.unitForRent}</p>
                            <p>Loại tài sản: {property.propertyRole}</p>
                            <p>Người đăng ký - chủ sở hữu: {property.owner}</p>
                            <p>Email liên hệ : {property.ownerEmail}</p>
                            <p>Trạng thái: {property.status}</p>
                            <p>Tọa độ địa lý: Kinh độ {property.gpsAddress.lat} & Vĩ độ {property.gpsAddress.lng}</p>

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
                            {property.status === "Đang hoạt động" ? (
                                <button className="btn btn-warning" onClick={handleBlock}>Khóa tài sản này</button>
                            ) : property.status === "Bị khóa" ? (
                                <button className="btn btn-success" onClick={handleUnblock}>Mở khóa tài sản</button>
                            ) : (
                                <button className="btn btn-danger" onClick={handleDenie}>Từ chối</button>
                            )}
                        </div>
                        <div className="col-2 text-center">
                            {(property.status === "Đang hoạt động" || property.status === "Bị khóa" )? null : (
                                <button className="btn btn-success" onClick={handleAccept}>Chấp nhận</button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </AdminBaseLayout>
    );
};

export default AdminPropertyDetail;
