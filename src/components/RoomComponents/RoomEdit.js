import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BaseLayout from '../layoutComponents/BaseLayout';
import roomService from '../../services/roomService';
import requestDetailService from '../../services/requestDetailService';
import TagCardIntoRoom from '../DataDisplayComponents/Cards/TagCardIntoRoom';
import CarouselPicture from '../DataDisplayComponents/Carousel';
import { useDispatch } from 'react-redux';



const RoomDetail = () => {
    const { roomId } = useParams();
    const [room, setRoom] = useState(null);
    const [tags, setTags] = useState([]);
    const [rentalReqs, setRentalReqs] = useState([]);
    const [error, setError] = useState(null);
    const [isLocked, setIsLocked] = useState(false);
    const contractLink ="";
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await roomService.viewDetailRoomIsValid(roomId);
                setRoom(data);
                setTags(data.tags);
                requestsForRoom(data.room_id);
            } catch (error) {
                setError(error.message);
            }
        };
        const requestsForRoom = async (room_id) => {
            try {
                const data = await roomService.viewAllRentalRequestForRoom(room_id);
                setRentalReqs(data);
            } catch (error) {
                setError(error.message);
            }
        }

        fetchData();
    }, [roomId]);
    const handleReject = async (requestId) => {
        try {
            const data = await requestDetailService.rejectRentalReq(requestId);
            setRentalReqs(data);
        } catch (error) {
            setError(error.message);
        }
    }
    const handleAccept = async (requestId) => {
        try {
            const data = await requestDetailService.acceptRentalReq(requestId, contractLink);
            setRentalReqs(data);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleGoBack = () => {
        window.history.back();
    };

    const handleLockRoom = () => {
        if (!isLocked) {
            setIsLocked(true);
        }
    };

    const handleUnlockRoom = () => {
        setIsLocked(false);
    };

    return (
        <BaseLayout>
            <div style={{ margin: "30px" }}>
                <div className='row'>
                    {room ? (
                        <>
                            <h2>{room.propertyName + '-' + room.roomName}</h2>
                            <div className='row'>

                                <div className='col-md-5'>
                                    <CarouselPicture
                                        imageUrls={room.picturesURL} />
                                </div>
                                <div className='col-md-7'>
                                    <div className='row'>
                                        {tags.map((tag, index) => (
                                            <TagCardIntoRoom
                                                key={index}
                                                tagname={tag} />
                                        ))}
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-5'>
                                            <p>Địa chỉ: {room.address}</p>
                                            <p>Mô tả: {room.description}</p>
                                            <p>Diện tích: {room.acreage} m²</p>
                                        </div>
                                        <div className='col-md-5'>
                                            <p>Giá thuê: {room.price} VND/tháng</p>
                                            <p>Số người tối đa: {room.maxQuantity}</p>
                                            <p>Trạng thái: {room.status}</p>
                                        </div>
                                    </div>
                                </div>
                            </div></>
                    ) : (
                        <p>Đang tải thông tin phòng...</p>
                    )}
                </div>
                <div className='row'>
                    <h5>Danh sách yêu cầu thuê</h5>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Người gửi</th>
                                <th>Mô tả</th>
                                <th>Trạng thái</th>
                                <th>Thời gian</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>


                            {Array.isArray(rentalReqs) && rentalReqs.length > 0 ? (
                                rentalReqs.map(request => (
                                    <tr key={request.id}>
                                        <td>{request.username}</td>
                                        <td>{request.description}</td>
                                        <td>{request.requestStatus}</td>
                                        <td>{request.timeStamp}</td>
                                        <td>
                                            <button className='btn btn-primary' onClick={() => handleAccept(request.id)}>Chấp nhận</button>
                                            <button className='btn btn-secondary' onClick={() => handleReject(request.id)}>Từ chối</button>
                                        </td>
                                    </tr>

                                ))
                            ) : (
                                <p>Không có yêu cầu thuê nào.</p>
                            )}
                        </tbody>
                    </table>
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
                            <i class="fa fa-pen"></i>
                            Chỉnh sửa thông tin
                        </button>
                        {isLocked ? (
                            <button className='btn btn-secondary' onClick={handleUnlockRoom}>
                                <i class="fa fa-unlock" aria-hidden="true"></i>
                                Mở khóa phòng này
                            </button>
                        ) : (
                            <button className='btn btn-primary' onClick={handleLockRoom}>
                                <i class="fa fa-lock"></i>
                                Tạm khóa phòng này
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </BaseLayout>
    );
};

export default RoomDetail;
