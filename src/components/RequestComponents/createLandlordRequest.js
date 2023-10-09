import React, { useState } from 'react';

import requestDetailService from '../../services/requestDetailService'

const CreateLandlordRequest = () => {

    const [landlordRequest, setLandlordRequest] = useState({
        description: '',
        user: null,
    })
    const [agreeTerms, setAgreeTerms] = useState(false); 
    const user_id = localStorage.getItem('user_id');
    const termsAndConditions = `
    Điều khoản và điều kiện:
    1. ...
    2. ...
    3. ...
    ...
`;
const handleDescriptionChange = (e) => {
    const newDescription = e.target.value;
    setLandlordRequest((prevLandlordRequest) => ({
        ...prevLandlordRequest,
        description: newDescription,
    }));
};

    const handleAgreeTermsChange = (e) => {
        setAgreeTerms(e.target.checked);
    };

    const handleSubmit = async () => {
        if (agreeTerms) {
            try {
                const response = await requestDetailService.sendLandlordReq(
                    user_id, landlordRequest 
                );
                if (response && response.message) {
                    alert(response.message); // Hiển thị thông báo từ phản hồi
                  } else {
                    alert('Yêu cầu của bạn đã được gửi thành công.');
                  }
            } catch (error) {
            }
        } else {
            alert('Vui lòng đọc và đồng ý với điều khoản.');
        }
    };

    return (
        <div>
            <h1>Tạo yêu cầu từ phía chủ nhà</h1>
            <div>
                <label htmlFor="description">Mô tả yêu cầu:</label>
                <textarea
                    id="description"
                    name="description"
                    value={landlordRequest.description}
                    onChange={handleDescriptionChange}
                />
            </div>
            <div>
                <h2>Điều khoản và điều kiện</h2>
                <pre>{termsAndConditions}</pre>
            </div>
            <div>
                <input
                    type="checkbox"
                    id="agreeTerms"
                    name="agreeTerms"
                    checked={agreeTerms}
                    onChange={handleAgreeTermsChange}
                />
                <label htmlFor="agreeTerms">Tôi đã đọc và đồng ý với điều khoản.</label>
            </div>
            <button onClick={handleSubmit}>Gửi Yêu Cầu</button>
        </div>
    );
};

export default CreateLandlordRequest;

