import React, { useState, useEffect } from 'react';
import BaseLayout from '../layoutComponents/BaseLayout';
import RoomCardOwner from '../DataDisplayComponents/Cards/RoomCardOwner';
import roomService from '../../services/roomService';
import RoomSearch from '../Test/RoomComponents/RoomSearch';
import StarRate from '../StarRate';
import { useSelector } from 'react-redux';


const RoomsValid = () => {
  const [rooms, setRooms] = useState([]);
  const selectedRoom = useSelector((state) => state.selectedRoom);

  useEffect(() => {
    roomService.getAllRoomIsValid()
      .then(data => {
        setRooms(data);
      })
      .catch(error => {
        console.error('Lỗi khi lấy tags:', error);
      });
  }, []);
  if (!rooms) {
    return <div>loading</div>;
  }
console.log(selectedRoom);
  return (
    <BaseLayout>
      <div style={{ margin: "30px" }}>
        <RoomSearch rooms={rooms} />
        <div className='row d-flex justify-content-around' style={{ height: "500px" }}>
          <div className='map_render_rooms col-md-7'></div>
          <div className='room_preview col-md-4'>
            
            <p>{selectedRoom.picturesURL}</p>
            <p>{selectedRoom.picturesURL}</p>
            <p>{'Tên Phòng: '+ selectedRoom.roomName}</p>
            
            <p>{'Giá phòng: '+selectedRoom.price}</p>
            <p>roomId={selectedRoom.room_id}</p>
            <StarRate userRating={selectedRoom.ratingStar}/> 
          </div>
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
