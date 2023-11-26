import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BaseLayout from '../layoutComponents/BaseLayout';
import roomService from '../../services/roomService';
import requestDetailService from '../../services/requestDetailService';
import TagCardIntoRoom from '../DataDisplayComponents/Cards/TagCardIntoRoom';
import CarouselPicture from '../DataDisplayComponents/Carousel';
import { useDispatch } from 'react-redux';



const RoomDetail = () => {
    const navigate = useNavigate();
    const { roomId } = useParams();
    const [room, setRoom] = useState(null);
    const [tags, setTags] = useState([]);
    const [rentalReqs, setRentalReqs] = useState([]);
    const [error, setError] = useState(null);
    const [isLocked, setIsLocked] = useState(false);
    const contractLink = "";
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
    }, []);
    const handleReject = async (requestId) => {
        try {
            await requestDetailService.rejectRentalReq(requestId);
        } catch (error) {
            setError(error.message);
        }
    }

    const handleAcceptRequest = (user_id, room_id, request_id) => {
        navigate(`/rental_manage/contract-prepare?user_id=${user_id}&room_id=${room_id}&requestId=${request_id}`);
    };
    const handleGoBack = () => {
        window.history.back();
    };

    const handleLockRoom = () => {
        if (!isLocked) {
            roomService.pauseActive(roomId);
            setIsLocked(true);
        }
    };

    const handleUnlockRoom = () => {
        roomService.resumeActive(roomId);
        setIsLocked(false);
    };

    const handleDeleteRequest = async (reuqestId) => {
        try {
            await requestDetailService.deletedRentalReq(reuqestId);
        } catch (error) {
            setError(error.message);
        }
    };
    const displaySelectedImage = (event, containerId) => {
        const imageContainer = document.getElementById(containerId);
        const fileInput = event.target;

        imageContainer.innerHTML = ''; // Clear previous images

        if (fileInput.files && fileInput.files.length > 0) {
            for (const file of fileInput.files) {
                const reader = new FileReader();

                reader.onload = function (e) {
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.alt = 'Selected Image';
                    img.style.width = '150px';
                    imageContainer.appendChild(img);
                };

                reader.readAsDataURL(file);
            }
        }
    }
    return (
        <BaseLayout>
            <div style={{ margin: "30px" }}>

                {room ? (
                    <>
                        <h2>{room.propertyName + '-' + room.roomName}</h2>
                        <div className='row'>

                            <div className='col-md-4'>
                                {room.picturesURL.length > 0 ? (
                                    <CarouselPicture
                                        imageUrls={room.picturesURL} />
                                ) : (
                                    <div>
                                        <div className="mb-4 d-flex justify-content-center" id="selectedImage">
                                            <img src="https://mdbootstrap.com/img/Photos/Others/placeholder.jpg"
                                                alt="example placeholder" style={{ width: "300px" }} />
                                        </div>
                                        <div className="d-flex justify-content-center">
                                            <div className="btn btn-primary btn-rounded">
                                                <label className="form-label text-white m-1" for="customFile1">Chọn ảnh cho phòng của bạn!</label>
                                                <input type="file" multiple className="form-control d-none files[]" id="customFile1"
                                                    onChange={(e) => displaySelectedImage(e, 'selectedImage')} />
                                            </div>
                                        </div>
                                    </div>
                                )}

                            </div>
                            <div className='col-md-8'>
                                <div className='row'>
                                    {tags.map((tag, index) => (
                                        <TagCardIntoRoom
                                            key={index}
                                            tagname={tag} />
                                    ))}
                                </div>
                                <div className='row'>
                                    <div className='col-md-8'>
                                        <p>Địa chỉ: {room.address}</p>
                                        <p>Mô tả: {room.description}</p>
                                        <p>Diện tích: {room.acreage} m²</p>
                                    </div>
                                    <div className='col-md-4'>
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
                                            {request.requestStatus === "Đã từ chối" || request.requestStatus === "Được thông qua" ? (
                                                <button className='btn btn-danger' onClick={() => handleDeleteRequest(request.id)}>
                                                    <i className="fa fa-trash" aria-hidden="true"></i>Xóa</button>
                                            ) : (
                                                <>
                                                    <button className='btn btn-primary' onClick={() => handleAcceptRequest(request.user_id, request.room_id, request.id)}>Chấp nhận</button>
                                                    <button className='btn btn-secondary' onClick={() => handleReject(request.id)}>Từ chối</button>
                                                </>
                                            )}
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
                            <i className="fa fa-pen"></i>
                            Chỉnh sửa thông tin
                        </button>
                        {isLocked ? (
                            <button className='btn btn-secondary' onClick={handleUnlockRoom}>
                                <i className="fa fa-unlock" aria-hidden="true"></i>
                                Mở khóa phòng này
                            </button>
                        ) : (
                            <button className='btn btn-primary' onClick={handleLockRoom}>
                                <i className="fa fa-lock"></i>
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
