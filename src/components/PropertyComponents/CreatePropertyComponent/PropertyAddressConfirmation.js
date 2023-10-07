import React, { useState } from 'react';

const PropertyAddressConfirmation = ({ address, onConfirmAddress }) => {
  const [confirmedAddress, setConfirmedAddress] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);

  // Xử lý xác nhận địa chỉ
  const handleConfirm = () => {
    setIsConfirmed(true);
    // Gọi hàm callback để thông báo rằng địa chỉ đã được xác nhận
    onConfirmAddress(confirmedAddress);
  };

  return (
    <div>
      <h3>Xác nhận địa chỉ</h3>
      <fieldset disabled>
        <div className="form-group">
          <label for="disabledTextInput">Địa chỉ bạn đã cung cấp:</label>
          <input type="text" id="disabledTextInput" className="form-control" placeholder={address} />
        </div>
      </fieldset>
      <div className='container map'>
        <p>API bản đồ tại đây</p>
        <p>Người dùng có thể di chuyển con trỏ để xác định chính xác vị trí lại 1 lần nữa </p>
      </div>
      <label htmlFor="confirmedAddress">Xác nhận lại địa chỉ:</label>
      <input
        type="text"
        id="confirmedAddress"
        value={confirmedAddress}
        onChange={(e) => setConfirmedAddress(e.target.value)}
      />
      <button onClick={handleConfirm}>Xác nhận</button>
      {isConfirmed && (
        <div>
          <p>Tọa độ chính xác</p>
          <p>{confirmedAddress}</p>
          {/* Hiển thị bản đồ hoặc thông tin xác nhận khác ở đây */}
        </div>
      )}
    </div>
  );
};

export default PropertyAddressConfirmation;
