import React, { useState } from 'react';
import PropertyTable from '../DataDisplayComponents/Tables/propertyTable';
import PropertyCreation from './CreatePropertyComponent/PropertyCreation';

const PropertyComponent = () => {
  const [isCreationVisible, setIsCreationVisible] = useState(false);

  const handleCreatePropertyClick = () => {
    setIsCreationVisible(true);
  };

  const handleHideCreation = () => {
    setIsCreationVisible(false);
  };

  const handleOverlayClick = () => {
    // Đóng phần PropertyCreation khi người dùng nhấp ra ngoài phạm vi
    if (isCreationVisible) {
      handleHideCreation();
    }
  };

  return (
    <div className="property-component">
      <div className='container'>
        <div className="property-header row">
          <h2 className='col-sm-9'>Bất động sản</h2>
          <div className='col-sm'>
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
      </div>
    </div>
  );
};

export default PropertyComponent;
