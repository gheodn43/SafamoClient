import React, { useState, useEffect } from 'react';
import BaseLayout from '../layoutComponents/BaseLayout';
import RoomCardOwner from '../DataDisplayComponents/Cards/RoomCardOwner';
import RentRoomService from '../../services/rentRoom';

const MyRooms = () => {
    const [rooms, setRooms] = useState([]);
    const [error, setError] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await RentRoomService.getMyRoomsRented();
                setRooms(response);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchData();
    }, []);

    if (!rooms || rooms.length === 0) {
        return <div>Loading...</div>;
    }
    
    return (
        <BaseLayout>
            <div className='container'>
                <div className='row d-flex justify-content-around'>
                    {rooms.map((room, index) => (
                        <RoomCardOwner
                            key={index}
                            imageUrls={room.picturesURL}
                            roomName={room.propertyName + '-' + room.roomName}
                            tags={room.tags}
                            roomPrice={room.price}
                            roomId={room.room_id}
                        />
                    ))}
                </div>
            </div>
        </BaseLayout>
    );
};


export default MyRooms;
