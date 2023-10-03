import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/authService';
import { Link } from 'react-router-dom';
import logoImage from '../../assets/images/safamo_manager.png';
const RentalmanagerHeader = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        AuthService.logout();
        navigate('/login');
    };
    return (
        <div className="header-container">
            <div className="logo-container">
                <Link to="/rental_manage" className="navbar-brand">
                    <img src={logoImage} alt="Safamo Logo" />
                </Link>
            </div>
            <div className="menu-container">
                <ul>
                    <li><a href="/">Bất động sản</a></li>
                    <li><a href="/requests">Yêu cầu</a></li>
                </ul>
            </div>
            <div className="right-menu-container">
                <a href="/">Về Safamo</a>
                <button className="btn btn-outline-danger" onClick={handleLogout}>Đăng xuất</button>
            </div>
        </div>
    );
};

export default RentalmanagerHeader;
