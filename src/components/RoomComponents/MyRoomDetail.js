import React, { useState, useEffect } from 'react';
import BaseLayout from '../layoutComponents/BaseLayout';
import RentRoomService from '../../services/rentRoom';
import roomService from '../../services/roomService';
import { useLocation } from 'react-router-dom';
import Switch from "react-switch";
import CarouselPicture from '../DataDisplayComponents/Carousel';

const MyRoomRentedDetail = () => {
    const location = useLocation();
    const [room, setRoom] = useState([]);
    const [roomId, setRoomId] = useState([]);
    const [error, setError] = useState('');
    const [findCompound, setFindCompound] = useState(room.status === "Tìm người ở ghép");
    const queryParams = new URLSearchParams(location.search);
    const rentRoom_id = queryParams.get('rent_room_Id');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await RentRoomService.getMyRoomRentedDetail(rentRoom_id);
                setRoom(response);
                setRoomId(response.room_id)
            } catch (error) {
                setError(error.message);
            }
        };
        fetchData();
    }, []);
    
    if (!room) {
        return <div>Loading...</div>;
    }
    
    const handleChange = () => {
        setFindCompound(!findCompound); 
    };
    
    const handleGoBack = () => {
        window.history.back();
    };
console.log(findCompound);
    return (
        <BaseLayout>
            <div className='container'>

                {room ? (
                    <>
                        <div className='row'>
                            <h2>{room.propertyName + '-' + room.roomName}</h2>
                        </div>

                        <div className='row'>
                            <div className='col-md-6'>
                                <p>Địa chỉ: {room.address}</p>
                                <p>Mô tả: {room.description}</p>
                                <p>Diện tích: {room.acreage} m²</p>
                            </div>
                            <div className='col-md-6'>
                                <p>Giá thuê: {room.price} VND/tháng</p>
                                <p>Số người tối đa: {room.maxQuantity}</p>
                                <p>Trạng thái: {room.status}</p>
                            </div>
                        </div>
                    </>
                ) : (
                    <p>Đang tải thông tin phòng...</p>
                )}

                <div className='row'>
                    <Switch onChange={handleChange} checked={findCompound} /> {/* Sử dụng findCompound thay cho checked */}
                    <h6>Tìm bạn ở ghép</h6>
                </div>
                <div className='row'>
                    <div className='col'>
                        <button className='btn btn-secondary' onClick={handleGoBack}>Quay lại</button>
                    </div>
                </div>
            </div>
        </BaseLayout>
    );
};

export default MyRoomRentedDetail;
