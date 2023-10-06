import React, { useState } from 'react';

const PropertyBasicInfoForm = ({ propertyInfo, setPropertyInfo, onNextStep }) => {
  // State để theo dõi thông tin cơ bản của tài sản
  const [formValues, setFormValues] = useState({
    propertyName: propertyInfo.propertyName || '',
    address: propertyInfo.address || '',
    unitForRent: propertyInfo.unitForRent || '',
    propertyRole: propertyInfo.propertyRole || '',
  });

  // Xử lý thay đổi giá trị trên form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleNext = () => {
    if (formValues.propertyName && formValues.address && formValues.unitForRent && formValues.propertyRole) {
      setPropertyInfo(formValues);
      onNextStep();
    } else {
      alert('Vui lòng điền đầy đủ thông tin.');
    }
  };

  return (
    <div>
      <h3>Thêm thông tin cơ bản về tài sản của bạn</h3>
      <form>
        <div className="form-group">
          <label htmlFor="propertyName">Tên tài sản:</label>
          <input
          className='form-control'
            type="text"
            id="propertyName"
            name="propertyName"
            value={formValues.propertyName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Địa chỉ:</label>
          <input
          className='form-control'
            type="text"
            id="address"
            name="address"
            value={formValues.address}
            onChange={handleChange}
          />
        </div>
        <div className='form-row'>
          <div className="form-group col-md-6">
            <label htmlFor="propertyRole">Loại tài sản:</label>
            <select className='custom-select'
              id="propertyRole"
              name="propertyRole"
              value={formValues.propertyRole}
              onChange={handleChange}
            >
              <option selected>Lọai tài sản</option>
              <option value="Căn hộ">Căn hộ</option>
              <option value="Nhà phố">Nhà phố</option>
              <option value="Biệt thự">Biệt thự</option>
            </select>
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="unitForRent">Số lượng cho thuê:</label>
            <input className='form-control'
              type="number"
              id="unitForRent"
              name="unitForRent"
              value={formValues.unitForRent}
              onChange={handleChange}
            />
          </div>
        </div>
      </form>
      <button onClick={handleNext}>Tiếp theo</button>
    </div>
  );
};

export default PropertyBasicInfoForm;