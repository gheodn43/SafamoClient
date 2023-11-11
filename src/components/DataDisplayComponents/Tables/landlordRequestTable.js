import React, { useState, useEffect } from 'react';
import requestDetailService from '../../../services/requestDetailService';
import { useNavigate } from 'react-router-dom';
const LanlordRequestTable = () => {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    requestDetailService.requestsForAdmin()
      .then(data => {
        setRequests(data);
      })
      .catch(error => {
        console.error('Lỗi khi lấy danh sách yêu cầu:', error);
      });
  }, []);

  // Xử lý sự kiện khi người dùng nhấn vào nút "Xóa"

  const handleAcceptClick = (requestId, userId) => {
    requestDetailService.grandLandlordReq(userId)
      .then(() => {
        return requestDetailService.acceptLandlordReq(requestId);
      })
      .then(() => {
        console.log(`Xem chi tiết yêu cầu có ID: ${userId}`);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  };


  const handleRejectClick = (requestId, userId) => {
    // navigate(`/requests/landlord_req_detail?request_id=${requestId}& user_id=${userId}`);
    console.log(`Xem chi tiết yêu cầu có ID: ${userId}`);
  };

  const handleViewRoom = (requestId, userId) => {
    // navigate(`/requests/landlord_req_detail?request_id=${requestId}& user_id=${userId}`);
    console.log(`Xem chi tiết yêu cầu có ID: ${userId}`);
  };
  const handleViewDetails = (requestId, userId) => {
    // navigate(`/requests/landlord_req_detail?request_id=${requestId}& user_id=${userId}`);
    console.log(`Xem chi tiết yêu cầu có ID: ${userId}`);
  };
  return (
    <div>
      <h2>Danh sách yêu cầu</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Tên người dùng</th>
            <th>Loại yêu cầu</th>
            <th>Mô tả</th>
            <th>Trạng thái</th>
            <th>Thời gian</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              <td>{request.username}</td>
              <td>{request.requestRole}</td>
              <td>{request.description}</td>
              <td>{request.requestStatus}</td>
              <td>{request.timeStamp}</td>
              <td>
                {request.requestRole === "Thuê phòng" ? (
                  <button className="btn btn-primary" onClick={() => handleViewRoom(request.id, request.user_id)}>
                    Xem phòng
                  </button>
                ) : (
                  request.requestRole === "Cấp quyền cho thuê" && request.requestStatus !== "Chờ xét duyệt" ? (
                    <button className="btn btn-info" onClick={() => handleViewDetails(request.id, request.user_id)}>
                      Xem chi tiết
                    </button>
                  ) : (
                    <>
                      <button className="btn btn-primary" onClick={() => handleAcceptClick(request.id, request.user_id)}>
                        Chấp nhận
                      </button>
                      <button className="btn btn-secondary" onClick={() => handleRejectClick(request.id, request.user_id)}>
                        Từ chối
                      </button>
                    </>
                  )
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>


  );
};

export default LanlordRequestTable;
