import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import propertyService from '../../../services/propertyService';
import roomService from '../../../services/roomService';
import BaseLayout from '../../layoutComponents/BaseLayout';
import back_icon from '../../../assets/images/go_back_icon.png'
import RoomCardOwner from '../../DataDisplayComponents/Cards/RoomCardOwner'
import { data } from 'jquery';

const CustomerPropertyDetail = () => {
    const { requestId } = useParams();
    const [rooms, setRooms] = useState([]);
    const [property, setProperty] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        propertyService.CustomerGetOneProperty(requestId)
            .then(data => {
                setProperty(data);
                fetchRooms(data.property_id);
            })
            .catch(error => {
                console.error('Lỗi khi lấy BĐS:', error);
            });

        async function fetchRooms(propertyId) {
            try {
                roomService.getAllRoomOfMyProperty(propertyId)
                    .then(data => {
                        setRooms(data);
                    })
                console.log(rooms);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách phòng:', error);
            }
        }
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
                        <img src={property.pictureUrl} alt="Ảnh tài sản" style={{ height: "200px" }} />
                    </div>
                    <div className='row'>
                        <div className='col-md-5'>
                            <p>ID BĐS: {property.property_id}</p>
                            <p>Tên BĐS: {property.propertyName}</p>
                            <p>Địa chỉ: {property.address}</p>
                            <p>Số lượng phòng cho thuê: {property.unitForRent}</p>

                        </div>
                        <div className='col-md-5'>
                            <p>Loại tài sản: {property.propertyRole}</p>
                            <p>Trạng thái: {property.status}</p>
                        </div>
                        <div className="col-md-2 text-right">
                            <button className="btn btn-success" onClick={handleClickEdit}>Chỉnh sửa thông tin</button>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-8">
                            <button className="btn btn-secondary" onClick={handleBackClick}>
                                <img src={back_icon} alt="Safamo admin Logo" style={{ height: '35px' }} />Quay lại
                            </button>
                        </div>
                    </div>
                    <h3>Danh sách phòng</h3>
                    {rooms.length > 0 ? (
    rooms.map((room, index) => (
        <RoomCardOwner
            key={index}
            imageUrls={room.picturesURL}
            roomName={room.roomName}
            roomStatus={room.status}
            tags={room.tags}
            roomPrice={room.price}
        />
    ))
) : (
    <p>Không có phòng nào được tìm thấy.</p>
)}
                </div>
            )}
        </BaseLayout>
    );
};

export default CustomerPropertyDetail;
