import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setImageUrls, setRoomName, setTags, setPrice, setRoomId, setRatingStar } from '../../../redux/slices/selectedRoomSlice'

function RoomSearch({ rooms }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [tagSearch, setTagSearch] = useState('');
  const [roomSuggestions, setRoomSuggestions] = useState([]);


  const dispatch = useDispatch();
  const filterRooms = (minPrice_a, maxPrice_a) => {
    console.log(maxPrice_a);
    
    const filtered = filterRoomsByPrice(minPrice_a, maxPrice_a);
    const filteredRoomsByTag = tagSearch
      ? filtered.filter((room) =>
        room.tags.some((tag) => tag.toLowerCase().includes(tagSearch.toLowerCase()))
      )
      : filtered;
    setFilteredRooms(filteredRoomsByTag);
  };

  const filterRoomsByPrice = (minPrice, maxPrice) => {
    return rooms.filter((room) => {
      if (minPrice == 0) setMinPrice(1);
      const price = room.price;
      return price >= minPrice && price <= maxPrice;
    });
  };

  const handleViewRoom = (room) => {
    if (room.picturesURL) {
      dispatch(setImageUrls(room.picturesURL));
    } else {
      dispatch(setImageUrls(["Phòng này chưa có ảnh"]))
    }
    const roomName = room.propertyName + '-' + room.roomName;
    dispatch(setRoomName(roomName));
    dispatch(setTags(room.tags));
    dispatch(setPrice(room.price));
    dispatch(setRoomId(room.room_id));
    dispatch(setRatingStar(room.ratingStar));
  };


  const sortRoomsByTags = (rooms) => {
    return rooms.sort((a, b) => {
      if (a.tagIds.length === 0 && b.tagIds.length > 0) {
        return 1;
      }
      if (a.tagIds.length > 0 && b.tagIds.length === 0) {
        return -1;
      }
      if (a.picturesURL.length === 0 && b.picturesURL.length > 0) {
        return 1;
      }
      if (a.picturesURL.length > 0 && b.picturesURL.length === 0) {
        return -1;
      }
      return 0;
    });
  };

  const sortedRooms = sortRoomsByTags(filteredRooms);
  return (
    <div>
      <div class="d-flex justify-content-end">

        <div className='col-md-2'>
          <input class="form-control form-control-sm" type="number" id="minPrice"  onChange={e => {setMinPrice(e.target.value); filterRooms(e.target.value,maxPrice);}} placeholder="Giá tối thiểu:" />
        </div>
        <div className='col-md-2'>
          <input class="form-control form-control-sm" type="number" id="maxPrice"  onChange={e => {setMaxPrice(e.target.value); filterRooms(minPrice,e.target.value);}}  placeholder="Giá tối đa:" />
        </div>
      </div>
      {searchResult ? (
        <div>
          <h2>Thông tin phòng {searchResult.roomName}</h2>
          <p>Địa chỉ: {searchResult.address}</p>
          <p>Mô tả: {searchResult.description}</p>
          <p>Diện tích: {searchResult.acreage}</p>
          <p>Giá: {searchResult.price}</p>
          <p>Số người tối đa: {searchResult.maxQuantity}</p>
          <p>Trạng thái: {searchResult.status}</p>
          {searchResult.picturesURL.length > 0 && (
            <div>
              <h3>Hình ảnh</h3>
              {searchResult.picturesURL.map((url, index) => (
                <img key={index} src={url} alt={`Hình ${index + 1}`} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className='justify-content-end'>
          <div class="list-group" id="list-tab" role="tablist">
            {sortedRooms.map((room) => (
              <a
                key={room.room_id}
                class="list-group-item list-group-item-action "
                id="list-home-list"
                data-toggle="list"
                href="#list-home"
                role="tab"
                aria-controls="home"
                onClick={() => handleViewRoom(room)}
              >
                {room.roomName}-{room.propertyName} - Giá: {room.price}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );

}




export default RoomSearch;
