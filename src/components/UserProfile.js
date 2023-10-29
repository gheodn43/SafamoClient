import React, { useState, useEffect } from 'react';
import BaseLayout from './layoutComponents/BaseLayout';
import userAvatarDefault from '../assets/images/user-avatar-default.png';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import userService from '../services/userService';

import { useDispatch, useSelector } from 'react-redux';
import { fetchMyProfile } from '../redux/slices/userProfileSlice';
import { updateProfile } from '../redux/slices/userProfileSlice';

const Profile = () => {
    const user_id = localStorage.getItem('user_id');
    const user_name = localStorage.getItem('username');

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const dispatch = useDispatch();
    const userProfile = useSelector((state) => state.userProfile);

    const [formData, setFormData] = useState({
        fullname: userProfile.fullname || '',
        birthdate: userProfile.birthdate || '',
        cccd: userProfile.cccd || '',
        phone_number: userProfile.phone_number || '',
        email: userProfile.email || '',
        address: userProfile.address || '',
    });

    const handleUpdateProfile = (e) => {
        e.preventDefault();
        dispatch(updateProfile(formData));
        handleClose();
        userService.updateUserInfo(user_id, formData);

    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    useEffect(() => {
        dispatch(fetchMyProfile());
    }, [dispatch]);

    if (!userProfile) {
        return <div>Loading....</div>;
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '70%',
        heightMin: '50%',
        bgcolor: 'background.paper',
        borderRadius: '16px',
        boxShadow: 24,
        p: 4,
    };
    return (
        <BaseLayout>
            <div>
                <div className='cover-page'>
                    <div className='avatar'>
                        {userProfile.avatarUrl === null ? (
                            <img src={userProfile.avatarUrl} alt="User Avatar" className='clip-circle' />
                        ) : (
                            <img src={userAvatarDefault} alt="Default Avatar" className='clip-circle' />
                        )}
                    </div>
                    <div className='profile-title'>
                        {userProfile.fullname === null ? (
                            <h3>{userProfile.fullname} </h3>
                        ) : (
                            <h3>Hello </h3>
                        )}
                    </div>
                </div>
                <div className='content-page'>
                    <div className='profile-status row'>
                        Đang hoạt động
                        <div className='status-color'></div>
                    </div>
                    <div className='profile-edit row'>
                        <button type="button" class="btn btn-outline-primary" onClick={handleOpen}>
                            Chỉnh sửa thông tin
                            <i class="fa fa-pencil" aria-hidden="true"></i>
                        </button>
                    </div>
                    <div className='profile-content container'>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">{userProfile.fullname}</li>
                            <li class="list-group-item">{userProfile.birthdate}</li>
                            <li class="list-group-item">{userProfile.cccd}</li>
                            <li class="list-group-item">{userProfile.phone_number}</li>
                            <li class="list-group-item">{userProfile.email}</li>
                            <li class="list-group-item">{userProfile.address}</li>
                        </ul>
                    </div>
                </div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Chỉnh sửa thông tin
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <form onSubmit={handleUpdateProfile}>
                                <div className='row'>
                                    <div className="form-group col-6">
                                        <label >Họ và tên</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Họ tên đầy đủ"
                                            name="fullname"
                                            value={formData.fullname}
                                            onChange={handleInputChange} // Gọi hàm handleInputChange khi người dùng thay đổi giá trị
                                        />
                                    </div>
                                    <div className="form-group col-6">
                                        <label >Ngày sinh</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Ngày sinh"
                                            name="birthdate"
                                            value={formData.birthdate}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className="form-group col-6">
                                        <label >CCCD</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="CCCD"
                                            name="cccd"
                                            value={formData.cccd}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="form-group col-6">
                                        <label >SĐT</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="SĐT"
                                            name="phone_number"
                                            value={formData.phone_number}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label >Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        aria-describedby="emailHelp"
                                        placeholder="Email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div class="form-group">
                                    <span><label >Địa chỉ chính xác</label></span>
                                    <span><small><label >(Bao gồm thông tin về Thành phố, phường, xã)</label></small></span>
                                    <input
                                        type="text"
                                        class="form-control"
                                        aria-describedby="emailHelp"
                                        placeholder="Địa chỉ chính xác"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <button type="submit" className="btn btn-primary">Xác nhận</button>
                            </form>
                        </Typography>
                    </Box>
                </Modal>
            </div>
        </BaseLayout>
    );
};

export default Profile;
