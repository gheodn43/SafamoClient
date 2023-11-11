import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BaseLayout from '../layoutComponents/BaseLayout';
import requestDetailService from '../../services/requestDetailService';
// import { useSelector } from 'react-redux';
import roomService from '../../services/roomService';
import propertyService from '../../services/propertyService';
import RentRoomService from '../../services/rentRoom';
import ContractService from '../../services/contractService';

const PreviewContract = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const requestId = queryParams.get('requestId');
    const [isChecked, setIsChecked] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [request, setRequest] = useState(null);
    const [room, setRoom] = useState(null);
    const [error, setError] = useState('');
    const [room_id, setRoom_id] = useState('');


    useEffect(() => {
        const fetchData = async () => {
            try {
                const requestInfo = await requestDetailService.getMyRentalReq(requestId);

                if (requestInfo) {
                    setRequest(requestInfo);
                    const roomId = requestInfo.room_id;
                    setRoom_id(roomId);

                    const res = await RentRoomService.getOne(roomId);
                    setRoom(res);

                    // Now that we have the room data, you can proceed here.
                }
            } catch (error) {
                setError(error.message);
            }
        };
        fetchData();
    }, [requestId]);

    console.log("hello" + room);

    if (!request) {
        return <div>Loading...</div>;
    }
    const handleGoBack = () => {
        window.history.back();
    };
    const handleJoinRoom = async () => {
        if (isChecked) {
            await requestDetailService.deleteRentalReqAfterJoinRoom(requestId);
            // await roomService.changeStatusRoomIsRenting(room.room_id);
            setIsConfirmed(true);
        } else {
            setShowAlert(true);
        }
    };

    const handleGoToYourRoom = () => {
        navigate(`/rental_manage/my-room?room_id=${room_id}`);
    };
    return (
        <BaseLayout>
            <div className='container'>
                <div className="alert alert-success" role="alert">
                    Yêu cầu thuê phòng đã được chấp nhận.
                </div>

                <div className='container'>
                    <h5>Thanh toán lần đầu</h5>
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Khoản thanh toán</th>
                                <th scope="col">Giá tiền</th>
                                <th scope="col">Số lượng</th>
                                <th scope="col">Thành tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Tiền cọc hợp đồng</td>
                                <td>1.200.000 VNĐ</td>
                                <td>01 tháng</td>
                                <td>1.200.000 VNĐ</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Tiền phòng</td>
                                <td>1.200.000 VNĐ</td>
                                <td>02 tháng</td>
                                <td>2.400.000 VNĐ</td>
                            </tr>
                            <tr>
                                <td colspan="4"><strong>Tổng tiền</strong></td>
                                <td><strong>Thành tiền</strong></td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="form-check disabled">
                        <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="option3" checked disabled />
                        <label className="form-check-label" for="exampleRadios3">
                            Thanh toán khi gặp chủ nhà
                        </label>
                    </div>

                    <div className="form-check disabled">
                        <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" disabled />
                        <label className="form-check-label" for="exampleRadios1">
                            Thanh toán bằng VNPay
                        </label>
                    </div>
                </div>

                <div className='container'>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="inlineCheckbox1"
                            value="option1"
                            checked={isChecked}
                            onChange={() => {
                                setIsChecked(!isChecked);
                                setShowAlert(false);
                            }} />
                        <label className="form-check-label" for="inlineCheckbox1">Xác nhận ký và đồng ý các điều khoản trong hợp đồng</label>
                    </div>
                    {showAlert && (
                        <div className="alert alert-danger" role="alert">
                            Vui lòng xác nhận ký và đồng ý các điều khoản trong hợp đồng trước khi tiếp tục.
                        </div>
                    )}
                </div>
                <div className='row'>
                    <div className='col'>
                        <button className='btn btn-secondary' onClick={handleGoBack}>Quay lại</button>
                    </div>
                    <div className='col text-right'>
                        {isConfirmed ? (
                            <button className='btn btn-primary' onClick={handleGoToYourRoom}>Đến phòng của bạn</button>
                        ) : (
                            <button className='btn btn-success' onClick={handleJoinRoom}>Xác nhận thuê</button>
                        )}
                    </div>
                </div>
            </div>


        </BaseLayout>
    );
};

export default PreviewContract;

