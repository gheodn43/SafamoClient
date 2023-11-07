import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
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
    const [roomid, setRoomId] = useState('');
    const [rentRoomId, setRentRoomId] = useState('')
    const [room, setRoom] = useState(null);
    const [error, setError] = useState('');
    const [rentRoom, setRentRoom] = useState({
        contractCreationDate: '',
        contractEndDate: '',
        durationTime: '',
        room_id: 0,
        partyA_id: 0,
        partyB_id: 0,
    });



    useEffect(() => {
        const fetchData = async () => {
            try {
                const requestInfo = await requestDetailService.getMyRentalReq(requestId);

                if (requestInfo) {
                    setRequest(requestInfo);
                    const property_id = requestInfo.property_id;
                    setRoomId(requestInfo.room_id);
                    const landlord = await propertyService.getLandlord(property_id);
                    setRentRoom({
                        ...rentRoom,
                        contractCreationDate: contract_creation_date,
                        contractEndDate: contract_end_date,
                        durationTime: requestInfo.duarationTime,
                        room_id: requestInfo.room_id,
                        partyA_id: landlord.owner_id,
                        partyB_id: requestInfo.user_id,
                    });
                }
            } catch (error) {
                setError(error.message);
            }
        };

        fetchData();
    }, [requestId]);

    const duarationTime = rentRoom.durationTime;
    let durationTime;
    if (duarationTime === "3 Tháng") {
        durationTime = 3;
    } else if (duarationTime === "6 Tháng") {
        durationTime = 6;
    } else if (duarationTime === "1 Năm") {
        durationTime = 12;
    } else {
        // Xử lý khi không khớp với các giá trị trên
        durationTime = 0; // Hoặc một giá trị mặc định khác
    }
    const today = new Date();

    // Tính ngày sau thời gian mong muốn
    const futureDate = new Date(today);
    futureDate.setMonth(today.getMonth() + durationTime);

    // Lấy ngày, tháng và năm của ngày hiện tại
    const currentDay = today.getDate();
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();

    // Lấy ngày, tháng và năm của ngày sau 6 tháng
    const futureDay = futureDate.getDate();
    const futureMonth = futureDate.getMonth() + 1;
    const futureYear = futureDate.getFullYear();

    // Định dạng thành chuỗi "yyyy-mm-dd"
    const contract_creation_date = `${currentYear}-${currentMonth < 10 ? '0' : ''}${currentMonth}-${currentDay < 10 ? '0' : ''}${currentDay}`;
    const contract_end_date = `${futureYear}-${futureMonth < 10 ? '0' : ''}${futureMonth}-${futureDay < 10 ? '0' : ''}${futureDay}`;

    if (!request) {
        return <div>Loading...</div>;
    }
    const handleGoBack = () => {
        window.history.back();
    };
    const handleJoinRoom = async () => {
        if (isChecked) {
            const rentRoom_id = await RentRoomService.joinRoom(roomid);
            setRentRoomId(rentRoom_id);
            if(rentRoom_id){
                await ContractService.generateContract( rentRoom);
                await requestDetailService.deleteRentalReqAfterJoinRoom(requestId);
                await roomService.changeStatusRoomIsRenting(roomid);
                setIsConfirmed(true);
            }
            
        } else {
            setShowAlert(true);
        }
    };

    const handleGoToYourRoom = () => {
        navigate(`/rental_manage/my-room?rent_room_Id=${rentRoomId}`);
    };
    return (
        <BaseLayout>
            <div className='container'>
                <div className="alert alert-success" role="alert">
                    Yêu cầu thuê phòng đã được chấp nhận.
                    Hợp đồng đã được gửi qua Mail của bạn. Vui lòng kiểm tra.
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
                                <td>Giá tiền</td>
                                <td>01 tháng</td>
                                <td>thành tiền</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Tiền phòng</td>
                                <td>Giá tiền</td>
                                <td>02 tháng</td>
                                <td>Thành tiền</td>
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

