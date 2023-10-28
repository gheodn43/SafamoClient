import React, { useState, useEffect } from 'react';
import BaseLayout from './layoutComponents/BaseLayout';
import userService from '../services/userService';
import userAvatarDefault from '../assets/images/user-avatar-default.png';
import StarRating from './Test/starRating';

const Profile = () => {
    const user_id = localStorage.getItem('user_id');
    const user_name = localStorage.getItem('username');

    const [userProfile, setUserProfile] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await userService.getMYProfile();
                setUserProfile(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchData();
    }, []);

    if (!userProfile) {
        return <div>Loading....</div>;
    }

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
                    {/* <div className='profile-sub-title'>
                        {user_name}
                    </div> */}
                </div>
                <div className='content-page'>
                    <div className='profile-status row'>
                        Đang hoạt động
                        <div className='status-color'></div>
                    </div>
                    <div className='profile-edit row'>
                        <button type="button" class="btn btn-outline-primary">
                            Chỉnh sửa thông tin
                            <i class="fa fa-pencil" aria-hidden="true"></i>
                        </button>

                    </div>
                </div>
            </div>
        </BaseLayout>
    );
};

export default Profile;
