import React, { useState } from 'react';

import requestDetailService from '../../services/requestDetailService'

const CreateLandlordRequest = () => {
    const [responseData, setResponseData] = useState(null);
    const [error, setError] = useState(null);
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
                const res = await requestDetailService.sendLandlordReq(
                    user_id, landlordRequest
                );
                setResponseData(res);

            } catch (error) {
                if (error.response && error.response.status === 401) {
                    const responseData = error.response.data;
                    if (responseData) {
                        setError(responseData);
                    } else {
                        setError('Unknown error occurred.');
                    }
                }
            }
        } else {
            alert('Vui lòng đọc và đồng ý với điều khoản.');
        }
    };

    return (
        <div>
            <div>
                <label htmlFor="description">Mô tả yêu cầu:</label>
                
                <textarea
                    id="description"
                    class="form-control" rows="3"
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
            <button className='btn btn-primary ' onClick={handleSubmit}>Gửi Yêu Cầu</button>
            {error ? (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            ) : (
                responseData && (
                    <div className="alert alert-success" role="alert">
                        {responseData}
                    </div>
                )
            )}
        </div>
    );
};

export default CreateLandlordRequest;

