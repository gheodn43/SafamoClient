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
        <nav className="navbar navbar-expand-lg navbar-light bg-light"style={{ width: '100%'}}>
            <Link to="/rental_manage" className="navbar-brand">
                <img src={logoImage} alt="Safamo Logo" style={{ width: '200px', height: 'auto' }} />
            </Link>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/" className="nav-link">Bất động sản</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/requests" className="nav-link">Yêu cầu</Link>
                    </li>
                </ul>
            </div>

            <div className="navbar-nav ml-auto">
                <Link to="/" className="nav-item nav-link">Về Safamo</Link>
                <button className="btn btn-outline-danger" onClick={handleLogout}>Đăng xuất</button>
            </div>
        </nav>
    );
};

export default RentalmanagerHeader;
