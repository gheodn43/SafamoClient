import React from 'react';
import { useNavigate} from 'react-router-dom';
import AuthService from '../../services/authService';
import { Link } from 'react-router-dom';
import logoImage from '../../assets/images/safamo_admin.png';

const AdminHeader = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        AuthService.logout();
        navigate('/login');
    };
    const storedUsername = localStorage.getItem('username');
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ width: '100%' }}>
            <Link to="/admin" className="navbar-brand">
                <img src={logoImage} alt="Safamo admin Logo" style={{ width: '150px', height: 'auto' }} />
            </Link>
            <div className="navbar-nav ml-auto">
                <Link to="/profile" className="nav-item nav-link">{storedUsername}</Link>
                <button className="btn btn-outline-danger" onClick={handleLogout}>Đăng xuất</button>
            </div>
        </nav>
    );
};

export default AdminHeader;
