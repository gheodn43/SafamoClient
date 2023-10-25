import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import requestDetailService from '../../../services/requestDetailService';

const RequestTable = ({ requests, handleCancelRentalRequest}) => {
    const [filter, setFilter] = useState("Thuê phòng");
    const navigate = useNavigate();
    const handleDeleteClick = (reuqestId) => {
        console.log(`Xóa yêu cầu có ID: ${reuqestId}`);
    };

    const handleDetailClick = (requestId) => {
        navigate(`/rental_manage/previewContract?requestId=${requestId}`);
    };

    const handleFilterClick = (newFilter) => {
        setFilter(newFilter);
    };

    return (
        <div>
            <h2>Các yêu cầu bạn đã gửi</h2>
            <ul className="nav nav-tabs">
                <li className={`nav-item ${filter === "Thuê phòng" ? "active" : ""}`}>
                    <a className="nav-link" href="#" onClick={() => handleFilterClick("Thuê phòng")}>Thuê phòng</a>
                </li>
                <li className={`nav-item ${filter === "Xin ở ghép" ? "active" : ""}`}>
                    <a className="nav-link" href="#" onClick={() => handleFilterClick("Xin ở ghép")}>Xin ở ghép</a>
                </li>
                <li className={`nav-item ${filter === "Kết thúc hợp đồng" ? "active" : ""}`}>
                    <a className="nav-link" href="#" onClick={() => handleFilterClick("Kết thúc hợp đồng")}>Kết thúc hợp đồng</a>
                </li>
                <li className={`nav-item ${filter === "Cấp quyền cho thuê" ? "active" : ""}`}>
                    <a className="nav-link" href="#" onClick={() => handleFilterClick("Cấp quyền cho thuê")}>Cấp quyền cho thuê</a>
                </li>
            </ul>
            <table className="table">
                <thead>
                    <tr>
                        <th>Loại yêu cầu</th>
                        <th>Mô tả</th>
                        <th>Trạng thái</th>
                        <th>Thời gian</th>
                    </tr>
                </thead>
                <tbody>
                    {requests.map(request => (
                        (request.requestRole === filter) && (
                            <tr key={request.id} className={request.requestStatus === "Được thông qua" ? "row-green-background" : ""}>
                                <td>{request.requestRole}</td>
                                <td>{request.description}</td>
                                <td>{request.requestStatus}</td>
                                <td>{request.timeStamp}</td>
                                <td>
                                    {request.requestStatus === "Được thông qua" ? (
                                        <button className='btn btn-success' onClick={() => handleDetailClick(request.id)}>Xem hợp đồng</button>
                                    ) : (
                                        <>
                                            <button className='btn btn-secondary' onClick={() => handleCancelRentalRequest(request.room_id)}>Hủy yêu cầu</button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        )
                    ))}

                </tbody>
            </table>
        </div>
    );
};

export default RequestTable;
