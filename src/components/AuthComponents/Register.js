import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../../services/authService';
import logoImage from '../../assets/images/safamo.png';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        otp: '',
    });
    const logoStyle = {
        width: '150px',
        height: 'auto',
    };
    const [error, setError] = useState(null); // Trạng thái lưu thông báo lỗi
    const [isLoading, setIsLoading] = useState(false); // Trạng thái tải dữ liệu

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Bắt đầu hiển thị loading

        if (formData.password !== formData.confirmPassword) {
            setError("Mật khẩu và xác nhận mật khẩu không khớp.");
            setIsLoading(false); // Kết thúc hiển thị loading
            return;
        }

        if (!/^(?=.*[A-Z]).{6,12}$/.test(formData.password)) {
            setError("Mật khẩu phải có ít nhất 1 ký tự viết hoa và từ 6 đến 12 ký tự.");
            setIsLoading(false); // Kết thúc hiển thị loading
            return;
        }

        try {
            console.log(formData);
            const message = await authService.otpAuthentication(formData.email, formData.username);
            navigate('/confirm-otp', { state: formData });
        } catch (error) {
            console.error(error);
            if (error.response && error.response.status === 400) {
                setError(error.response.data);
            } else {
                setError('Thông tin đăng ký đã được sử dụng');
            }
        } finally {
            setIsLoading(false); // Kết thúc hiển thị loading
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
                                <button type="submit" className="btn btn-primary btn-block" disabled={isLoading}>
                                    {isLoading ? 'Đang tải...' : 'Đăng ký'}
                                </button>
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
