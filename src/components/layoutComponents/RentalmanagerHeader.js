import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import AuthService from '../../services/authService';
import { Link } from 'react-router-dom';
import logoImage from '../../assets/images/safamo_manager.png';
const RentalmanagerHeader = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        AuthService.logout();
        navigate('/login');
    };
    const storedUsername = localStorage.getItem('username');
    return (
        <nav className=" header navbar navbar-expand-lg navbar-light bg-light" style={{ width: '100%' }}>
            <Link to="/rental_manage" className="navbar-brand">
                <img src={logoImage} alt="Safamo Logo" style={{ width: '150px', height: 'auto' }} />
            </Link>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink to="/rental_manage/property" className="nav-link" activeClassName="active">
                            Bất động sản
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/rental_manage/request" className="nav-link" activeClassName="active">
                            Yêu cầu đã gửi
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/rental_manage/request-receive" className="nav-link" activeClassName="active">
                            Yêu cầu nhận về
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/myRoom" className="nav-link" activeClassName="active">
                            Phòng của tôi
                        </NavLink>
                    </li>
                </ul>
            </div>


            <div className="navbar-nav ml-auto">
                <Link to="/" className="nav-item nav-link">Về Safamo</Link>
                <Link to="/profile" className="nav-item nav-link">{storedUsername}</Link>
                <button className="btn btn-outline-danger" onClick={handleLogout}>Đăng xuất</button>
            </div>
        </nav>
    );
};

export default RentalmanagerHeader;
