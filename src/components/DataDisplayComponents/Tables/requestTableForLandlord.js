import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RequestTableForLandlord = ({ requests }) => {
    const [filter, setFilter] = useState("Chờ xét duyệt");
    const navigate = useNavigate();

    const handleDetailClick = (requestId) => {
        navigate(`/rental_manage/rental-request-detail/${requestId}`);
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    return (
        <div>
            <h2>Các yêu cầu bạn đã gửi</h2>
            <select value={filter} onChange={handleFilterChange}>
                <option value="Chờ xét duyệt">Chờ xét duyệt</option>
                <option value="Đã từ chối">Đã từ chối</option>
                <option value="Đã thông qua">Đã thông qua</option>
            </select>
            <table className="table">
                <thead>
                    <tr>
                        <th>Người gửi</th>
                        <th>Mô tả</th>
                        <th>Thời hạn thuê</th>
                        <th>Trạng thái</th>
                        <th>Thời gian</th>
                    </tr>
                </thead>
                <tbody>
                    {requests.map(request => (
                        (request.requestStatus === filter) && (
                            <tr key={request.id}>
                                <td>{request.username}</td>
                                <td>{request.description}</td>
                                <td>{request.duarationTime !== null ? request.duarationTime : ""}</td>
                                <td>{request.requestStatus}</td>
                                <td>{request.timeStamp}</td>
                                <td>
                                    <button onClick={() => handleDetailClick(request.id)}>Xem chi tiết</button>
                                </td>
                            </tr>
                        )
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RequestTableForLandlord;
