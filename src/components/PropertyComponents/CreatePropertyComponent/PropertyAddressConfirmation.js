import React, { useState } from 'react';
import MapTilerComponent from '../../MapComponents/createPropertyMapComponent';
import ProgressBar from '../../ProcessComponents/processComponent'
const PropertyAddressConfirmation = ({ address, gpsAddress, onConfirmAddress, propertyInfo }) => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [latCoordinate, setLatCoordinate] = useState('');
  const [lngCoordinate, setLngCoordinate] = useState('');
  let storedCoordinates = null;
  const handleConfirmCoordinates = () => {
    storedCoordinates = localStorage.getItem('markerCoordinates');
    if (storedCoordinates) {
      const { lat, lng } = JSON.parse(storedCoordinates);
      setLatCoordinate(lat);
      setLngCoordinate(lng);
      setIsConfirmed(true);
      console.log(lat);
      console.log(lng);
      console.log(propertyInfo.gpsAddress);
    }
  };
  const handleNext = () => {
    onConfirmAddress({ lat: latCoordinate, lng: lngCoordinate });
    console.log(propertyInfo.gpsAddress);
  };
  return (
    <div>
      <ProgressBar initialValue={20} targetValue={43} />
      <h3>Xác nhận địa chỉ</h3>
      
      <fieldset disabled>
        <div className="form-group">
          <label htmlFor="disabledTextInput">Địa chỉ bạn đã cung cấp:</label>
          <input type="text" id="disabledTextInput" className="form-control" placeholder={address} />
        </div>
      </fieldset>
      <div className='row mapping' style={{ height: "260px" }}>
        <MapTilerComponent />
      </div>
      <div className='row'><label htmlFor="confirmedAddress">Di chuyển đến con trỏ tròn đến vị trí chính xác của bạn</label></div>
      {isConfirmed ? (
        <button className='next-step-btn btn btn-primary' onClick={handleNext}>Tiếp theo</button>
      ) : (
        <button className='next-step-btn btn btn-primary' onClick={handleConfirmCoordinates}>Xác nhận</button>
        )}

    </div>
  );
};

export default PropertyAddressConfirmation;
