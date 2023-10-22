import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setRentalStatus } from '../../redux/slices/roomRentalStatusSlice';
import BaseLayout from '../layoutComponents/BaseLayout';
import roomService from '../../services/roomService';
import TagCardIntoRoom from '../DataDisplayComponents/Cards/TagCardIntoRoom';
import CarouselPicture from '../DataDisplayComponents/Carousel';
import DisplayLocation from '../MapComponents/displayRoomLocation';
import AuthService from '../../services/authService';
import DateTimePicker from 'react-datetime-picker';
import requestDetailService from '../../services/requestDetailService';
import { format } from 'date-fns';

const RoomValidDetail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isLoggedIn = AuthService.isLoggedIn();
    const user_id = localStorage.getItem('user_id');
    const { roomId } = useParams();
    const [room, setRoom] = useState(null);
    const [tags, setTags] = useState([]);
    const [error, setError] = useState(null);
    const [value, setValue] = useState(new Date());
    const [formattedDate, setFormattedDate] = useState('');
    const isRentalRequested = useSelector((state) => state.roomRentalStatus[roomId]);
    const dispatch = useDispatch();

    const handleDateChange = (newValue) => {
        if (isLoggedIn) {
            if (newValue >= new Date()) {
                setValue(newValue);
                setFormattedDate(format(newValue, 'yyyy-MM-dd HH:mm'));
            } else {
                alert('Vui lòng chọn ngày hiện tại hoặc trong tương lai.');
            }
        } else {
            navigate(`/login?returnTo=${location.pathname}`);
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
    const handleCheckLogin = async () =>{
        if (!isLoggedIn) {
            navigate(`/login?returnTo=${location.pathname}`);
        }
    }
    const handleSendRentalRequest = async () => {
        if (isLoggedIn) {
            if (!isRentalRequested) {
                dispatch(setRentalStatus({ roomId, isRentalRequested: true }));
                try {
                    const response = await requestDetailService.sendRentaldReq(user_id, roomId);
                    console.log(response);
                } catch (error) {
                    console.error("Error sending rental request:", error);
                    dispatch(setRentalStatus({ roomId, isRentalRequested: false }));
                }
            }
        } else {
            navigate(`/login?returnTo=${location.pathname}`);
        }
    };
    const handleCancelRentalRequest = () => {
        dispatch(setRentalStatus({ roomId, isRentalRequested: false }));
    };
    const handleViewRequestStatus = () => {
        navigate('/rental_manage/request');
    }
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
                        <button className='btn btn-info'>
                            <DateTimePicker onChange={handleDateChange} value={value} />
                        </button>
                        {isRentalRequested ? (
                            <button className='btn btn-secondary' onClick={handleCancelRentalRequest}>
                                <i className="fa fa-paper-plane" aria-hidden="true"></i>
                                Hủy yêu cầu thuê
                            </button>
                        ) : (
                            <button className='btn btn-primary' data-toggle="modal" data-target="#durationTimeModal"
                            onClick={handleCheckLogin}>
                                <i className="fa fa-paper-plane" aria-hidden="true"></i>
                                Gửi yêu cầu thuê
                            </button>
                        )}

                    </div>
                </div>
                {isRentalRequested ? (
                    <div class="alert alert-info row" role="alert" style={{ position: "absolute", width: "30%", right: 0 }}>
                        <span>Yêu cầu đã được gửi đến chủ trọ</span>
                        <button type="button" className="btn btn-outline-secondary"
                            onClick={handleViewRequestStatus} >Xem trạng thái y/c !</button>
                    </div>
                ) : (
                    <div></div>
                )}

                <div className="modal fade" id="durationTimeModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Vui lòng chọn thời hạn thuê</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"/>
                                        <label class="form-check-label" for="inlineRadio1">3 Tháng </label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"/>
                                        <label class="form-check-label" for="inlineRadio2">6 Tháng</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" />
                                        <label class="form-check-label" for="inlineRadio3">1 Năm </label>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Hủy</button>
                                <button type="button" className="btn btn-primary" onClick={handleSendRentalRequest}>
                                    Xác nhận & gửi</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BaseLayout>
    );
};

export default RoomValidDetail;
