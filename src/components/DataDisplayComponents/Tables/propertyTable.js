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
    navigate(`/rental_manage/property_detail/${requestId}`);
  };

  const handleFilterClick = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <div>
      <h2>Bất động sản của tôi</h2>
      <ul className="nav nav-tabs">
        <li className={`nav-item ${filter === "Tất cả" ? "active" : ""}`}>
          <a className="nav-link" href="#" onClick={() => handleFilterClick("Tất cả")}>Tất cả</a>
        </li>
        <li className={`nav-item ${filter === "Đang hoạt động" ? "active" : ""}`}>
          <a className="nav-link" href="#" onClick={() => handleFilterClick("Đang hoạt động")}>Đang hoạt động</a>
        </li>
        <li className={`nav-item ${filter === "Chưa được xét duyệt" ? "active" : ""}`}>
          <a className="nav-link" href="#" onClick={() => handleFilterClick("Chưa được xét duyệt")}>Chờ xử lý</a>
        </li>
        <li className={`nav-item ${filter === "Bị từ chối" ? "active" : ""}`}>
          <a className="nav-link" href="#" onClick={() => handleFilterClick("Bị từ chối")}>Bị từ chối</a>
        </li>
        <li className={`nav-item ${filter === "Bị khóa" ? "active" : ""}`}>
          <a className="nav-link" href="#" onClick={() => handleFilterClick("Bị khóa")}>Bị khóa</a>
        </li>
        <li className={`nav-item ${filter === "Tạm ngưng hoạt động" ? "active" : ""}`}>
          <a className="nav-link" href="#" onClick={() => handleFilterClick("Tạm ngưng hoạt động")}>Tạm ngưng HĐ</a>
        </li>
      </ul>
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
