import React, { useState, useEffect } from 'react';
import apiGetListService from '../../../services/listService';
import { useNavigate } from 'react-router-dom';
const RentalRequestTable = () => {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    // Gọi hàm rentalRequestsForAdmin để lấy danh sách yêu cầu
    apiGetListService.rentalRequestsForAdmin()
      .then(data => {
        setRequests(data);
      })
      .catch(error => {
        console.error('Lỗi khi lấy danh sách yêu cầu:', error);
      });
  }, []);

  // Xử lý sự kiện khi người dùng nhấn vào nút "Xóa"
  const handleDeleteClick = (requestId) => {
    console.log(`Xóa yêu cầu có ID: ${requestId}`);
  };

  const handleDetailClick = (requestId) => {
    navigate('/requests/landlord_req_detail');
    console.log(`Xem chi tiết yêu cầu có ID: ${requestId}`);
  };

  return (
    <div>
      <h2>Danh sách yêu cầu thuê</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên người dùng</th>
            <th>Loại yêu cầu</th>
            <th>Mô tả</th>
            <th>Trạng thái</th>
            <th>Thời gian</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(request => (
            <tr key={request.id}>
              <td>{request.id}</td>
              <td>{request.username}</td>
              <td>{request.requestRole}</td>
              <td>{request.description}</td>
              <td>{request.requestStatus}</td>
              <td>{request.timeStamp}</td>
              <td>
                {/* Nút "Xóa" */}
                <button onClick={() => handleDeleteClick(request.id)}>Xóa</button>
                {/* Nút "Xem chi tiết" */}
                <button onClick={() => handleDetailClick(request.id)}>Xem chi tiết</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RentalRequestTable;
