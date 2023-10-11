import React, { useState, useEffect } from 'react';
import { useParams , useNavigate} from 'react-router-dom';
import AdminBaseLayout from '../layoutComponents/AdminBaseLayout';
import propertyService from '../../services/propertyService';
import back_icon from '../../assets/images/go_back_icon.png';
const AdminPropertyDetail = () => {
    const { requestId } = useParams();
    const [property, setProperty] = useState(null); // Khởi tạo với giá trị null
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
    return (
        <AdminBaseLayout>
            {/* Kiểm tra property có dữ liệu hay không trước khi hiển thị */}
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
                            <img src={back_icon} alt="Safamo admin Logo" style={{ height: '35px' }} />Quay lại</button>
                        </div>
                        <div className="col-2 text-right">
                            <button className="btn btn-danger" >Từ chối</button>
                        </div>
                        <div className="col-2 text-center">
                            <button className="btn btn-success">Chấp nhận</button>
                        </div>
                        
                    </div>


                </div>
            )}
        </AdminBaseLayout>
    );
};

export default AdminPropertyDetail;
