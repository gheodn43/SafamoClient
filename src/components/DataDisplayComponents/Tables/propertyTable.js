import React, { useState, useEffect } from 'react';
import propertyService from '../../../services/propertyService';
import { useNavigate } from 'react-router-dom';

const PropertyTable = () => {
  const [properties, setProperties] = useState([]);
  const [filter, setFilter] = useState("Tất cả");
  const navigate = useNavigate();

  useEffect(() => {
    propertyService.getAllMyProperties()
      .then(data => {
        setProperties(data);
      })
      .catch(error => {
        console.error('Lỗi khi lấy danh sách BĐS:', error);
      });
  }, []);

  const handleDeleteClick = (propertyId) => {
    console.log(`Xóa yêu cầu có ID: ${propertyId}`);
  };
  const handleDetailClick = (requestId) => {
    navigate('/requests/landlord_req_detail');
    console.log(`Xem chi tiết yêu cầu có ID: ${requestId}`);
  };

  return (
    <div>
      <h2>Bất động sản của tôi</h2>
      <select onChange={(e) => setFilter(e.target.value)}>
        <option value="Tất cả">Tất cả</option>
        <option value="Sẵn sàn cho thuê">Sẵn sàn cho thuê</option>
        <option value="Đang hoạt động">Đang hoạt động</option>
        <option value="Tạm ngưng hoạt động">Tạm ngưng hoạt động</option>
        <option value="Bị khóa">Bị khóa</option>
      </select>
      <table className="table">
        <thead>
          <tr>
            <th>Tên</th>
            <th>SL cho thuê</th>
            <th>Loại tài sản</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {properties.map(property => (
            (filter === "Tất cả" || property.status === filter) && (
              <tr key={property.id}>
                <td>{property.propertyName}</td>
                <td>{property.unitForRent}</td>
                <td>{property.propertyRole}</td>
                <td>{property.status}</td>
                <td>
                  <button onClick={() => handleDeleteClick(property.id)}>Xóa</button>
                  <button onClick={() => handleDetailClick(property.id)}>Xem chi tiết</button>
                </td>
              </tr>
            )
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PropertyTable;
