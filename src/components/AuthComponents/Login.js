import React from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService'
const LoginPage = () => {
    const navigate = useNavigate();

    const handleLogin = async () => {
        const credentials = {
          username: document.getElementById('username').value,
          password: document.getElementById('password').value,
        };
      
        try {
          const { roles } = await authService.login(credentials);
    
          if (roles.includes('ADMIN')) {
            navigate('/admin');
          } else {
            navigate('/');
          }
        } catch (error) {
          console.error('Đăng nhập thất bại:', error);
        }
      };
  return (
    <div className="container">
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
              </form>
              <p className="mt-3 text-center">
                Quay lại
              </p>
              <p className="text-center">
                Bạn có chưa có tài khoản? <a href="/register">Tạo tài khoản</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
