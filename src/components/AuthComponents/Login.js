import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../../services/authService'
import logoImage from '../../assets/images/safamo.png';

const LoginPage = () => {
  const navigate = useNavigate();
  const logoStyle = {
    width: '150px',
    height: 'auto',
  };

  const [loginError, setLoginError] = useState(null); // Thông báo lỗi đăng nhập

  const handleLogin = async () => {
    const credentials = {
      username: document.getElementById('username').value,
      password: document.getElementById('password').value,
    };

    try {
      const { roles } = await authService.login(credentials);
      const params = new URLSearchParams(window.location.search);
      const returnTo = params.get('returnTo');
      if (returnTo) {
        window.location.href = returnTo;
      } else {
        if (roles.includes('ADMIN')) {
          navigate('/admin');
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      console.error('Đăng nhập thất bại:', error);
      setLoginError('Tên đăng nhập hoặc mật khẩu không chính xác');
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
              <h2 className="card-title text-center">Đăng nhập</h2>
              <form>
                <div className="form-group">
                  <label htmlFor="username">Tên tài khoản</label>
                  <input type="text" className="form-control" id="username" placeholder="Nhập tên tài khoản" />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Mật khẩu</label>
                  <input type="password" className="form-control" id="password" placeholder="Nhập mật khẩu" />
                </div>
                <button type="button" className="btn btn-primary btn-block" onClick={handleLogin}>Đăng nhập</button>
                {loginError && <p className="mt-3 text-center text-danger">{loginError}</p>}
              </form>
              <p className="mt-3 text-center"> <Link to="/">Quay lại</Link></p>
              <p className="text-center">
                Bạn có chưa có tài khoản?
                <Link to="/register">Tạo tài khoản</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
