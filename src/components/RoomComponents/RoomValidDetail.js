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
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
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
    const [formattedDate, setFormattedDate] = useState('');
    const [duarationTime, setDuarationTime] = useState('');
    const [value, setValue] = useState(dayjs());
    const isRentalRequested = useSelector((state) => state.roomRentalStatus[roomId]);
    const dispatch = useDispatch();

    const handleDateChange = (value) => {
        if (isLoggedIn) {
          const selectedDate = value.toDate();
          const currentDate = new Date();
      
          if (selectedDate >= currentDate) {
            setValue(value);
            setFormattedDate(format(selectedDate, 'MM/dd/yyyy hh:mm'));
          } else {
            setValue(dayjs());
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
    const handleCheckLogin = async () => {
        if (!isLoggedIn) {
            navigate(`/login?returnTo=${location.pathname}`);
        }
    }
    const handleSendRentalRequest = async () => {
        if (isLoggedIn) {
            if (!isRentalRequested) {
                dispatch(setRentalStatus({ roomId, isRentalRequested: true }));
                try {
                    const response = await requestDetailService.sendRentaldReq(user_id, roomId, duarationTime);
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
    const handleCancelRentalRequest = async () => {
        try {
            const response = await requestDetailService.deleteRentalReq(roomId);
            dispatch(setRentalStatus({ roomId, isRentalRequested: false }));
            console.log(response);
        } catch (error) {
            console.error("Error cancel rental request:", error);
        }
    };

    const handleViewRequestStatus = () => {
        navigate('/rental_manage/request');
    }
    const handleRadioChange = (event) => {
        setDuarationTime(event.target.value);
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

                <div className='d-flex justify-content-between'>
                    <button className='btn btn-secondary' onClick={handleGoBack}>
                        <i className="fa fa-arrow-left" aria-hidden="true"></i>
                        Quay lại
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
                                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="3 Tháng"
                                        checked={duarationTime === '3 Tháng'} onChange={handleRadioChange} />
                                    <label class="form-check-label" for="inlineRadio1">3 Tháng </label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="6 Tháng"
                                        checked={duarationTime === '6 Tháng'} onChange={handleRadioChange} />
                                    <label class="form-check-label" for="inlineRadio2">6 Tháng</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="1 Năm"
                                        checked={duarationTime === '1 Năm'} onChange={handleRadioChange} />
                                    <label class="form-check-label" for="inlineRadio3">1 Năm </label>
                                </div>
                            </div>
                            <div className='modal-body container'>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
                                        <DateTimePicker
                                            label="Chọn ngày bạn có thể chuyển đến"
                                            value={value}
                                            onChange={(newValue) => {
                                                handleDateChange(newValue); 
                                            }}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Hủy</button>
                                <button type="button" className="btn btn-primary" onClick={handleSendRentalRequest} data-dismiss="modal">
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
