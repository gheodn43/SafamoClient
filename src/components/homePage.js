import React, { useState, useEffect } from 'react';
import BaseLayout from './layoutComponents/BaseLayout';
import RoomCardOwner from './DataDisplayComponents/Cards/RoomCardOwner';
import roomService from '../services/roomService';
import { useResolvedPath } from 'react-router-dom';

const HomePage = () => {
  // const storedUsername = localStorage.getItem('username');
  // const storedRolesJSON = localStorage.getItem('roles');
  // let roles = [];
  // if (storedRolesJSON) {
  //   roles = JSON.parse(storedRolesJSON);
  // }
    const [rooms, setRooms] = useState([]);
    useEffect(() => {
      roomService.getAllRoomIsValid()
        .then(data => {
          setRooms(data);
        })
        .catch(error => {
          console.error('Lỗi khi lấy tags:', error);
        });
    }, []);
  
    // Lấy chỉ 5 phòng đầu tiên từ mảng rooms
    const firstFiveRooms = rooms.slice(0, 5);
  
    return (
      <BaseLayout>
        <div style={{ margin: "30px" }}>
          <h3>Phòng có sẵn cho bạn</h3>
          <div className='row d-flex justify-content-around'>
            {firstFiveRooms.length > 0 ? (
              firstFiveRooms.map((room, index) => (
                <RoomCardOwner
                  key={index}
                  imageUrls={room.picturesURL}
                  roomName={room.propertyName + '-' + room.roomName}
                  tags={room.tags}
                  roomPrice={room.price}
                  roomId={room.room_id}
                  ratingRult={room.ratingStar}
                />
              ))
            ) : (
              <p>Không có phòng nào được tìm thấy.</p>
            )}
          </div>
          <h3>Phòng tìm ở ghép</h3>
        </div>
      </BaseLayout>
    );
  };
  

export default HomePage;
