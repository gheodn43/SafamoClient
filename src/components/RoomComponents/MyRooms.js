import React, { useState, useEffect } from 'react';
import BaseLayout from '../layoutComponents/BaseLayout';
import RoomCardOwner from '../DataDisplayComponents/Cards/RoomCardOwner';
import RentRoomService from '../../services/rentRoom';



const MyRooms = () => {
    const [rooms, setRooms] = useState([]);
    const [rentRooms, setRentRooms] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response1 = await RentRoomService.getAllRentRooms();
                setRooms(response1);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchData();
    }, []);

    if (!rooms || rooms.length === 0) {
        return <BaseLayout><div>Loading...</div>;</BaseLayout>
    }

    return (
        <BaseLayout>
            <div className='container'>
                <div className='row d-flex justify-content-around'>
                    {rooms.map((room,index) => {
                        return (
                            <RoomCardOwner
                                key={index}
                                imageUrls={room.picturesURL}
                                roomName={room.propertyName + '-' + room.roomName}
                                tags={room.tags}
                                roomPrice={room.price}
                                roomId={room.room_id}
                                ratingRult={room.ratingStar}
                            />
                        );
                    })}
                </div>
            </div>
        </BaseLayout>
    );
};
export default MyRooms;
