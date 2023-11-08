import React, { useState, useEffect } from 'react';
import BaseLayout from '../layoutComponents/BaseLayout';
import RentRoomService from '../../services/rentRoom';
import roomService from '../../services/roomService';
import { useLocation } from 'react-router-dom';
import Switch from "react-switch";
import CarouselPicture from '../DataDisplayComponents/Carousel';

const MyRoomRentedDetail = () => {
    const location = useLocation();
    const [room, setRoom] = useState(null);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    // const [findCompound, setFindCompound] = useState(room.status === "Tìm người ở ghép");
    const queryParams = new URLSearchParams(location.search);
    const room_id = queryParams.get('room_id');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await RentRoomService.getMyRoomRentedDetail(room_id);
                const usersRes = await RentRoomService.getRentRooms(room_id);
                setRoom(response);
                setUsers(usersRes);

            } catch (error) {
                setError(error.message);
            }
        };
        fetchData();
    }, []);

    console.log(users);
    if (!room) {
        return <div>Loading...</div>;
    }

    const handleChange = () => {
        // setFindCompound(!findCompound); 
    };

    const handleGoBack = () => {
        window.history.back();
    };

    return (
        <BaseLayout>
            <div className='container'>

                {room ? (
                    <>
                        <div className='row'>
                            <h2>{room.propertyName + '-' + room.roomName}</h2>
                        </div>
                        <div className='row'>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Họ và tên</th>
                                        <th scope="col">NTNS</th>
                                        <th scope="col">SĐT</th>
                                        <th scope="col">CCCD</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user, index) => (
                                        <tr key={index}>
                                            <td>{user.fullname}</td>
                                            <td>{user.ntns}</td>
                                            <td>{user.phone_number}</td>
                                            <td>{user.cccd}</td>
                                            <td>
                                                {user.dependent ? "chủ phòng": ""}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
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
                                {/* <p>Trạng thái: {room.status}</p> */}
                            </div>
                        </div>
                    </>
                ) : (
                    <p>Đang tải thông tin phòng...</p>
                )}

                <div className='row'>
                    <Switch onChange={handleChange} /> {/* Sử dụng findCompound thay cho checked */}
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
