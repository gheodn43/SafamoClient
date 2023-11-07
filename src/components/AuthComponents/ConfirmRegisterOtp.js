import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import authService from '../../services/authService';
import logoImage from '../../assets/images/safamo.png';

const ConfirmRegisterOtp = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState(location.state || {});
    const [isLoading, setIsLoading] = useState(false); // Trạng thái tải dữ liệu
    const [resendDisabled, setResendDisabled] = useState(false);
    const [countdown, setCountdown] = useState(300); // 5 phút (300 giây)

    useEffect(() => {
        const timer = setInterval(() => {
            if (countdown > 0) {
                setCountdown(countdown - 1);
            } else {
                setResendDisabled(false);
                clearInterval(timer);
            }
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, [countdown]);

    const handleOtpChange = (e) => {
        const newOtp = e.target.value;
        setOtp(newOtp);
        setFormData({ ...formData, otp: newOtp });
    };

    const handleReSendOtp = async () => {
        setIsLoading(true);
        setResendDisabled(true);
        setCountdown(300);

        try {
            await authService.otpAuthentication(formData.email, formData.username);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const logoStyle = {
        width: '150px',
        height: 'auto',
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await authService.register(formData);
            const apiMessage = response.data;
            setMessage(apiMessage);
            navigate('/login');
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container">
            <div className='row justify-content-center mt-5'>
                <Link to="/" className="navbar-brand "><img src={logoImage} alt="Safamo Logo" style={logoStyle} /></Link>
            </div>
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
                                <button type="submit" className="btn btn-primary btn-block" disabled={isLoading}>
                                    {isLoading ? 'Đang tải...' : 'Xác nhận'}
                                </button>
                            </form>
                            {message && <p className="mt-3 text-center">{message}</p>}
                            <p className="mt-3 text-center">
                                Bạn không nhận được OTP?{' '}
                                <button
                                    className="btn btn-link p-0"
                                    onClick={handleReSendOtp}
                                    disabled={resendDisabled}
                                >
                                    Gửi lại OTP
                                </button>
                            </p>
                            {resendDisabled && (
                                <p className="mt-2 text-center">
                                    Đợi {Math.floor(countdown / 60)}:{countdown % 60} để gửi lại OTP
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmRegisterOtp;
