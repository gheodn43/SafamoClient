import React from 'react';

const PropertyPreview = ({ propertyInfo, onCreateNewProperty}) => {
    const handleCreateProperty = () =>{
        onCreateNewProperty();
    };
  return (
    <div>
      <h2>Thông tin tài sản</h2>
      <p>Tên tài sản: {propertyInfo.propertyName}</p>
      <p>Địa chỉ: {propertyInfo.address}</p>
      <p>Đơn vị cho thuê: {propertyInfo.unitForRent}</p>
      <p>Loại tài sản: {propertyInfo.propertyRole}</p>
      <p>Địa chỉ GPS: Lat - {propertyInfo.gpsAddress.lat}, Lng - {propertyInfo.gpsAddress.lng}</p>
      <p>URL tài sản: {propertyInfo.pictureUrl}</p>
      <img src={propertyInfo.pictureUrl} alt="Ảnh tài sản" />
      <button className='next-step-btn btn btn-primary' onClick={handleCreateProperty}>Xác nhận</button>
    </div>
  );
};

export default PropertyPreview;