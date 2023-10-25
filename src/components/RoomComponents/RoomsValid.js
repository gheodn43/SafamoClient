import React, { useState, useEffect } from 'react';
import BaseLayout from '../layoutComponents/BaseLayout';
import RoomCardOwner from '../DataDisplayComponents/Cards/RoomCardOwner';
import roomService from '../../services/roomService';

const RoomsValid = () => {
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

  
    return (
      <BaseLayout>
        <div style={{ margin: "30px" }}>

        <div className='row d-flex justify-content-around' style={{height: "500px"}}>
            <div className='map_render_rooms col-md-7'></div>
            <div className='room_preview col-md-4'></div>
        </div>
        <div className='row'>
            <h5>Các phòng khác </h5>
        </div>
          <div className='row d-flex justify-content-around'>
            {rooms.length > 0 ? (
              rooms.map((room, index) => (
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
        </div>
      </BaseLayout>
    );
  };
  

export default RoomsValid;
