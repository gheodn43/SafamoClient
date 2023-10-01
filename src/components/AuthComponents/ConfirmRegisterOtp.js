import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import authService from '../../services/authService';

const ConfirmRegisterOtp = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState(location.state || {});

    const handleOtpChange = (e) => {
        const newOtp = e.target.value;
        setOtp(newOtp);
        setFormData({ ...formData, otp: newOtp });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await authService.register(formData);
            const apiMessage = response.data;
            setMessage(apiMessage);
            navigate('/login');
        } catch (error) {
            console.error(error);
            console.log(formData);
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title text-center">Xác nhận OTP</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="otp">Nhập mã OTP</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="otp"
                                        name="otp"
                                        value={otp}
                                        onChange={handleOtpChange}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary btn-block">Xác nhận</button>
                            </form>
                            {message && <p className="mt-3 text-center">{message}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmRegisterOtp;
