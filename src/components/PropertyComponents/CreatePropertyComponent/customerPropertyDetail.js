import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import propertyService from '../../../services/propertyService';
import roomService from '../../../services/roomService';
import BaseLayout from '../../layoutComponents/BaseLayout';
import back_icon from '../../../assets/images/go_back_icon.png'
import add_icon from '../../../assets/images/icon_add.svg.png'
import RoomCardOwner from '../../DataDisplayComponents/Cards/RoomCardOwner'
import { data } from 'jquery';
import PropertyCreation from './PropertyCreation';
import RoomCreation from '../../RoomComponents/CreateRoomComponents/RoomCreation'

const CustomerPropertyDetail = () => {
    const { requestId } = useParams();
    const [rooms, setRooms] = useState([]);
    const [property, setProperty] = useState(null);

    const [isCreationVisible, setIsCreationVisible] = useState(false);
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

    const handleCreateNewRoom = async () => {
        setIsCreationVisible(true);
    };
    const handleHideCreation = () => {
        setIsCreationVisible(false);
    };
    const handleOverlayClick = () => {
        if (isCreationVisible) {
            handleHideCreation();
        }
    };

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
                            <p>Địa chỉ: {property.address}</p>
                            <p>Số lượng phòng cho thuê: {property.unitForRent}</p>

                        </div>
                        <div className='col-md-5'>
                            <p>Tên BĐS: {property.propertyName}</p>
                            <p>Loại tài sản: {property.propertyRole}</p>
                            <p>Trạng thái: {property.status}</p>
                        </div>
                        <div className="col-md-2 text-right">
                            <button className="btn btn-success" onClick={handleClickEdit}>Chỉnh sửa thông tin</button>
                        </div>
                    </div>

                    <div className='row'>
                        <h3>Danh sách phòng</h3>
                    </div>
                    <div className='row'>
                        <div className="card hover-effect" style={{ width: "18rem", margin: "20px" }}>
                            <img
                                className="card-img-top "
                                src={add_icon}
                                alt="Card image cap"
                                onClick={handleCreateNewRoom}
                            />
                        </div>

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

                    <div className="row">
                        <div className="col-8">
                            <button className="btn btn-secondary" onClick={handleBackClick}>
                                <img src={back_icon} alt="Safamo admin Logo" style={{ height: '35px' }} />Quay lại
                            </button>
                        </div>
                    </div>

                    {isCreationVisible && (
                        <>
                            <div className="overlay" onClick={handleOverlayClick}></div>
                            <div className="property-creation">
                                <button className="btn btn-danger" onClick={handleHideCreation}>Đóng</button>
                                <RoomCreation 
                                    propertyId={property.property_id}
                                />
                            </div>
                        </>
                    )}
                </div>

            )}
        </BaseLayout>
    );
};

export default CustomerPropertyDetail;
