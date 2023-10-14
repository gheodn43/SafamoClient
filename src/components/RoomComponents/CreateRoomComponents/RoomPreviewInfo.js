import React, { useState, useEffect } from 'react';
import roomService from '../../../services/roomService'
import ProgressBar from '../../ProcessComponents/processComponent';
import tagsService from '../../../services/tagsService';
import TagCard from '../../DataDisplayComponents/Cards/TagCard';

const RoomPreviewInfo = ({ roomInfo,propertyId, onNextStep }) => {
    const [tags, setTags] = useState([]);
    const integerTags = roomInfo.tagIds.map(tag => parseInt(tag, 10));
    useEffect(() => {
        tagsService.publicGetAllSelected(integerTags)
            .then(data => {
                setTags(data);
            })
            .catch(error => {
                console.error('Lỗi khi lấy tags:', error);
            });
    }, []);
    const handleConfirmCreateRoom = () => {
            handleCreateRoom();
            onNextStep();
    };

    const handleCreateRoom = () => {
        try {
            roomService.create(propertyId,roomInfo);
            console.log("room created:", roomInfo);
        } catch (error) {
            console.error("Lỗi khi tạo phòng:", error);
        }
    };
    return (
        <div>
            <ProgressBar initialValue={50} targetValue={90} />
            <h3>Xác nhận thông tin phòng</h3>
            <div className='row'>
                <div className='col-md-6'>
                    <p>Tên phòng: {roomInfo.roomName}</p>
                    <p>Mô tả: {roomInfo.description}</p>
                    <p>Diện tích: {roomInfo.acreage} m2</p>

                </div>
                <div className='col-md-6'>
                    <p>Giá phòng: {roomInfo.price} Vnđ</p>
                    <p>Sức chứa của phòng: {roomInfo.maxQuantity} người/Phòng</p>
                </div>
            </div>
            <div className='row'>
                {tags.map(tag => (
                    <TagCard
                        key={tag.roomRole_id}
                        tagname={tag.name}
                    />
                ))}
            </div>
            <button className='next-step-btn btn btn-primary' onClick={handleConfirmCreateRoom}>Xác nhận</button>
        </div>
    );
};

export default RoomPreviewInfo;
