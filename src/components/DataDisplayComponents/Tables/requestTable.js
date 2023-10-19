import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RequestTable = ({ requests }) => {
    const [filter, setFilter] = useState("Thuê phòng");
    const navigate = useNavigate();
    const handleDeleteClick = (reuqestId) => {
        console.log(`Xóa yêu cầu có ID: ${reuqestId}`);
    };

    const handleDetailClick = (requestId) => {
        navigate(`/rental_manage/property_detail/${requestId}`);
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
                            <tr key={request.id}>
                                <td>{request.requestRole}</td>
                                <td>{request.description}</td>
                                <td>{request.requestStatus}</td>
                                <td>{request.timeStamp}</td>
                                <td>
                                    <button onClick={() => handleDeleteClick(request.id)}>Xóa</button>
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

export default RequestTable;
