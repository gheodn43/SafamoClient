import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BaseLayout from '../layoutComponents/BaseLayout';
import roomService from '../../services/roomService';
import TagCardIntoRoom from '../DataDisplayComponents/Cards/TagCardIntoRoom';
import CarouselPicture from '../DataDisplayComponents/Carousel';
const RoomValidDetail = () => {
    const { roomId } = useParams();
    const [room, setRoom] = useState(null);
    const [tags, setTags] = useState([]);
    useEffect(() => {
        roomService.viewDetailRoomIsValid(roomId)
            .then(data => {
                setRoom(data);
                setTags(data.tags)
            })
            .catch(error => {
                console.error('Lỗi khi lấy tags:', error);
            });
    }, []);


    return (
        <BaseLayout>
            <div style={{ margin: "30px" }}>
                <div className='row d-flex justify-content-around'>
                    <div className='map_render_rooms col-md-7'></div>
                    <div className='room_preview col-md-4'>
                        {room ? (
                            <div>
                                <h2>{room.propertyName + '-' + room.roomName}</h2>
                                <CarouselPicture
                                    imageUrls={room.picturesURL}
                                />
                                <div className='row'>
                                    {tags.map((tag, index) => (
                                        <TagCardIntoRoom
                                            key={index}
                                            tagname={tag}
                                        />
                                    ))}
                                </div>
                                <p>Địa chỉ: {room.address}</p>
                                <p>Mô tả: {room.description}</p>
                                <p>Diện tích: {room.acreage} m²</p>
                                <p>Giá thuê: {room.price} VND/tháng</p>
                                <p>Số người tối đa: {room.maxQuantity}</p>
                                <p>Trạng thái: {room.status}</p>


                            </div>
                        ) : (
                            <p>Đang tải thông tin phòng...</p>
                        )}
                    </div>
                </div>
            </div>
        </BaseLayout>
    );
};


export default RoomValidDetail;
