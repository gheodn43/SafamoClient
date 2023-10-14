import React, { useState } from 'react';
import ProgressBar from '../../ProcessComponents/processComponent'
//step1
const RoomBasicInfoForm = ({ roomInfo, setRoomInfo, onNextStep }) => {
    const [formValues, setFormValues] = useState({
        roomName: roomInfo.roomName || '',
        description: roomInfo.description || '',
        acreage: roomInfo.acreage || '',
        price: roomInfo.price || '',
        maxQuantity: roomInfo.maxQuantity || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleNext = () => {
        if (formValues.roomName && formValues.description && formValues.acreage && formValues.price && formValues.maxQuantity) {
            setRoomInfo(formValues);
            onNextStep();
        } else {
            alert('Vui lòng điền đầy đủ thông tin.');
        }
    };

    return (
        <div>
            <ProgressBar initialValue={0} targetValue={20} />
            <h3>Thêm thông tin cơ bản về phòng đăng ký mới của bạn</h3>
            <form>
                <div className="form-group">
                    <label htmlFor="roomName">Mã phòng:</label>
                    <input
                        className='form-control'
                        type="text"
                        id="roomName"
                        name="roomName"
                        value={formValues.roomName}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Mô tả:</label>
                    <input
                        className='form-control'
                        type="text"
                        id="description"
                        name="description"
                        value={formValues.description}
                        onChange={handleChange}
                    />
                </div>
                <div className='form-row'>
                    <div className="form-group col-md-4">
                        <label htmlFor="acreage">Diện tích m2:</label>
                        <input className='form-control'
                            type="number"
                            id="acreage"
                            name="acreage"
                            value={formValues.acreage}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="price">Giá/Thang:</label>
                        <input className='form-control'
                            type="number"
                            id="price"
                            name="price"
                            value={formValues.price}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="maxQuantity">Số lượng người tối đa:</label>
                        <input className='form-control'
                            type="number"
                            id="maxQuantity"
                            name="maxQuantity"
                            value={formValues.maxQuantity}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </form>
            <button className='next-step-btn btn btn-primary' onClick={handleNext}>Tiếp theo</button>
        </div>
    );
};

export default RoomBasicInfoForm;
