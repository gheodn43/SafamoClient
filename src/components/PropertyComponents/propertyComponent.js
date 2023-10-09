import React, { useState } from 'react';
import PropertyTable from '../DataDisplayComponents/Tables/propertyTable';
import PropertyCreation from './CreatePropertyComponent/PropertyCreation';
import CreateLandlordRequest from '../RequestComponents/createLandlordRequest';

const PropertyComponent = () => {
  const [isCreationVisible, setIsCreationVisible] = useState(false);
  const [isRequestFormVisible, setIsRequestFormVisible] = useState(false);
  const handleCreatePropertyClick = () => {
    setIsCreationVisible(true);
  };
  const handleCreateLandlordRequest = () => {
    setIsRequestFormVisible(true);
  };

  const handleHideCreation = () => {
    setIsCreationVisible(false);
    setIsRequestFormVisible(false);
  };

  const handleOverlayClick = () => {
    if (isCreationVisible || isRequestFormVisible) {
      handleHideCreation();
    }
  };

  return (
    <div className="property-component">
      <div className='container'>
        <div className="property-header row">
          <div className='col-sm-7'>
            <h2>Bất động sản</h2>
            <div className="alert alert-warning" role="alert">
              Tài khoản chưa được mở khóa chức năng cho thuê.
              <button type="button" className="btn btn-outline-secondary" 
              onClick={handleCreateLandlordRequest} style={{ margin: '0 0 0 5px' }}>Gửi yêu cầu nâng cấp ngay !</button>
            </div>
          </div>

          <div className='col-sm-3'></div>
          <div className='col-sm-2'>
            <button className="btn btn-primary" onClick={handleCreatePropertyClick}>Đăng ký mới Bất động sản</button>
          </div>
        </div>
        <div className="property-content">
          <PropertyTable />
          {isCreationVisible && (
            <>
              <div className="overlay" onClick={handleOverlayClick}></div>
              <div className="property-creation">
                <button className="btn btn-danger" onClick={handleHideCreation}>Đóng</button>
                <PropertyCreation />
              </div>
            </>
          )}
        </div>

        <div className="landlordReq-content">
          {isRequestFormVisible && (
            <>
              <div className="overlay" onClick={handleOverlayClick}></div>
              <div className="landlordReq-creation">
                <button className="btn btn-danger" onClick={handleHideCreation}>Đóng</button>
                <CreateLandlordRequest />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyComponent;
