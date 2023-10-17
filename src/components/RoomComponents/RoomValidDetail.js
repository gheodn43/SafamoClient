import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import BaseLayout from '../layoutComponents/BaseLayout';
import roomService from '../../services/roomService';
import TagCardIntoRoom from '../DataDisplayComponents/Cards/TagCardIntoRoom';
import CarouselPicture from '../DataDisplayComponents/Carousel';
import DisplayLocation from '../MapComponents/displayRoomLocation';
import AuthService from '../../services/authService';
import DateTimePicker from 'react-datetime-picker';
import { format } from 'date-fns';
const RoomValidDetail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isLoggedIn = AuthService.isLoggedIn();
    const { roomId } = useParams();
    const [room, setRoom] = useState(null);
    const [tags, setTags] = useState([]);
    const [error, setError] = useState(null);
    const [isRentalRequested, setIsRentalRequested] = useState(false);
    const [value, setValue] = useState(new Date());
    const [formattedDate, setFormattedDate] = useState('');

    const handleDateChange = (newValue) => {
        setValue(newValue);
        if (newValue) {
            setFormattedDate(format(newValue, 'yyyy-MM-dd HH:mm'));
        } else {
            setFormattedDate('');
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await roomService.viewDetailRoomIsValid(roomId);
                setRoom(data);
                setTags(data.tags);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchData();
    }, [roomId]);

    const handleGoBack = () => {
        window.history.back();
    };

    const handleScheduleViewing = () => {
        if (isLoggedIn) {
            console.log("đã click");
        } else {
            // Lưu trạng thái hiện tại của trang để có thể quay lại sau khi đăng nhập.
            navigate(`/login?returnTo=${location.pathname}`);
        }
    };

    const handleSendRentalRequest = () => {
        if (isLoggedIn) {
            if (!isRentalRequested) {
                setIsRentalRequested(true);
            }
        } else {
            navigate(`/login?returnTo=${location.pathname}`);
        }
    };

    const handleCancelRentalRequest = () => {
        setIsRentalRequested(false);
    };

    return (
        <BaseLayout>
            <div style={{ margin: "30px" }}>
                <div className='row d-flex justify-content-around'>
                    <div className='map_render_rooms col-md-7'>
                        {error ? (
                            <p>Lỗi: {error}</p>
                        ) : (
                            room && room.gpsAddress !== null ? (
                                <DisplayLocation
                                    lng={room.gpsAddress.lng}
                                    lat={room.gpsAddress.lat}
                                />
                            ) : (
                                <p>Chưa có tọa độ được gán</p>
                            )
                        )}
                    </div>

                    <div className='room_preview col-md-4'>
                        {room ? (
                            <div>
                                <h2>{room.propertyName + '-' + room.roomName}</h2>
                                <CarouselPicture
                                    imageUrls={room.picturesURL}
                                />
                                <div className='row'>
                                    {tags.map((tag, index) => (
                                        <TagCardIntoRoom
                                            key={index}
                                            tagname={tag}
                                        />
                                    ))}
                                </div>
                                <p>Địa chỉ: {room.address}</p>
                                <p>Mô tả: {room.description}</p>
                                <p>Diện tích: {room.acreage} m²</p>
                                <p>Giá thuê: {room.price} VND/tháng</p>
                                <p>Số người tối đa: {room.maxQuantity}</p>
                                <p>Trạng thái: {room.status}</p>
                            </div>
                        ) : (
                            <p>Đang tải thông tin phòng...</p>
                        )}
                    </div>
                </div>

                <div className='row'>
                    <div className='col-md-8'>
                        <button className='btn btn-secondary' onClick={handleGoBack}>
                            <i className="fa fa-arrow-left" aria-hidden="true"></i>
                            Quay lại
                        </button>
                    </div>
                    <div className='col-md-4 d-flex justify-content-around'>
                        <button className='btn btn-info' >
                            <DateTimePicker onChange={handleDateChange} value={value} />
                        </button>
                        {isRentalRequested ? (
                            <button className='btn btn-secondary' onClick={handleCancelRentalRequest}>
                                <i className="fa fa-paper-plane" aria-hidden="true"></i>
                                Hủy yêu cầu thuê
                            </button>
                        ) : (
                            <button className='btn btn-primary' onClick={handleSendRentalRequest}>
                                <i className="fa fa-paper-plane" aria-hidden="true"></i>
                                Gửi yêu cầu thuê
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </BaseLayout>
    );
};

export default RoomValidDetail;
