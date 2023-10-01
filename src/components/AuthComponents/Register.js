import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        otp: '',
    });

    const [error, setError] = useState(null); // Trạng thái lưu thông báo lỗi

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(formData);
            // Gọi hàm otpAuthentication trong authService để xử lý API
            const message = await authService.otpAuthentication(formData.email, formData.username);
            console.log(message); // Log thông báo từ API

            // Chuyển hướng đến /confirm-otp
            navigate('/confirm-otp', { state: formData });
        } catch (error) {
            console.error(error);
            if (error.response && error.response.status === 400) {
                // Nếu có lỗi status 400, lấy thông báo lỗi từ response và cập nhật state error
                setError(error.response.data);
            } else {
                setError('Có lỗi xảy ra. Vui lòng thử lại sau.'); // Hoặc thông báo lỗi tổng quát
            }
        }
    };
    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title text-center">Đăng ký</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="username">Tên đăng nhập</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Mật khẩu</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary btn-block">Đăng ký</button>
                                {error && <p className="mt-3 text-center text-danger">{error}</p>}
                            </form>
                            <p className="mt-3 text-center">Bạn đã có tài khoản? <a href="/login">Đăng nhập</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
