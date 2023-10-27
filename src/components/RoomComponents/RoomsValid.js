import React, { useState, useEffect } from 'react';
import BaseLayout from '../layoutComponents/BaseLayout';
import RoomCardOwner from '../DataDisplayComponents/Cards/RoomCardOwner';
import roomService from '../../services/roomService';
import RoomSearch from '../Test/RoomComponents/RoomSearch';
import StarRate from '../StarRate';
import { useSelector } from 'react-redux';
import TagCard from '../DataDisplayComponents/Cards/TagCard';


const RoomsValid = () => {
  const [rooms, setRooms] = useState([]);
  const selectedRoom = useSelector((state) => state.selectedRoom);
  const [tagSuggestions, setTagSuggestions] = useState([]);

  useEffect(() => {
    roomService.getAllRoomIsValid()
      .then(data => {
        setRooms(data);
  
        // Lấy tất cả các tag từ danh sách các phòng
        const allTags = data.reduce((tags, room) => {
          room.tags.forEach(tag => {
            if (!tags.includes(tag)) {
              tags.push(tag);
            }
          });
          return tags;
        }, []);
  
        setTagSuggestions(allTags);
      })
      .catch(error => {
        console.error('Lỗi khi lấy tags:', error);
      });
  }, []);
  if (!rooms) {
    return <div>loading</div>;
  }
  return (
    <BaseLayout>
      <div style={{ margin: "30px" }}>
        <RoomSearch rooms={rooms} tagSuggestions={tagSuggestions}/>
        <div className='row d-flex justify-content-around' style={{ height: "500px" }}>
          <div className='map_render_rooms col-md-7'></div>
          <div className='room_preview col-md-4'>
            <p>{selectedRoom.picturesURL}</p>
            <p>{'Tên Phòng: '+ selectedRoom.roomName}</p>
            <p>{'Giá phòng: '+selectedRoom.price}</p>
            {/* if(selectedRoom.price != 0){
              <StarRate userRating={selectedRoom.ratingStar}/> 
            } */}
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
