import React from 'react';
import RoomSearch from './SearchComponent/RoomSearch';
import { LISTROOMS } from '../listRooms';

const RoomComponent = () => {
  return (
    <div className="room-component">
      <div className='container'>
        <div className="room-content">
          <RoomSearch roomList={LISTROOMS} />
        </div>
      </div>
    </div>
  );
};

export default RoomComponent;
