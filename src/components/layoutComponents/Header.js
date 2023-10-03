import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/authService';
import '../../asset/style.css';


const Header = () => {
    const isLoggedIn = AuthService.isLoggedIn();
    const navigate = useNavigate();
    const handleLogout = () => {
        AuthService.logout();
        navigate('/login');
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link to="/" className="navbar-brand">Logo</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/rooms-for-rent" className="nav-link">Phòng cho thuê</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/shared-rooms" className="nav-link">Phòng ở ghép</Link>
                        </li>
                    </ul>
                </div>

                <div className="navbar-nav ml-auto">
                    {isLoggedIn ? (
                        <>
                            <Link to="/profile" className="nav-item nav-link">Edit Profile</Link>
                            <button className="btn btn-outline-danger" onClick={handleLogout}>Đăng xuất</button>
                        </>
                    ) : (
                        <Link to="/login" className="nav-item nav-link button-login">Đăng nhập</Link>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default Header;
