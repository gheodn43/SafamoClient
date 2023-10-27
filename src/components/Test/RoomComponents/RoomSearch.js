import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import TagCardIntoRoom from '../../DataDisplayComponents/Cards/TagCardIntoRoom';
import { setImageUrls, setRoomName, setTags, setPrice, setRoomId, setRatingStar } from '../../../redux/slices/selectedRoomSlice'

function RoomSearch({ rooms, tagSuggestions }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [tagSearch, setTagSearch] = useState('');
  const [roomSuggestions, setRoomSuggestions] = useState([]);


  const dispatch = useDispatch();

  const searchRoomByRoomNumber = (roomNumber) => {
    const room = rooms.find((room) => room.roomName === roomNumber);
    return room;
  };

  const handleSearch = () => {
    const filteredRoomsByTag = rooms.filter((room) =>
      room.tags.includes(tagSearch)
    );
    setFilteredRooms(filteredRoomsByTag);
  };

  const handleSearchInputChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(event.target.value);
    const suggestedRooms = generateSuggestions(newSearchTerm);
    setRoomSuggestions(suggestedRooms);
  };

  const handleTagSearchChange = (event) => {
    setTagSearch(event.target.value);
  };

  const generateSuggestions = (input) => {
    if (input === '') {
      return [];
    }
    const filteredRooms = rooms.filter((room) =>
      room.roomName.toLowerCase().includes(input.toLowerCase())
    );
    return filteredRooms.map((room) => room.roomName);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setRoomSuggestions([]); // Clear the suggestions
    const result = searchRoomByRoomNumber(suggestion); // Search for the room immediately
    setSearchResult(result);
  };
  /////////////////////////////////////////////////////////////////////////////////////
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
      <div>
        <input
          class="form-control form-control-sm"
          type="text"
          placeholder="Tìm kiếm phòng theo số phòng"
          value={searchTerm}
          onChange={handleSearchInputChange}
        />
        <div className='row'>
          {
            roomSuggestions.map((suggestion, index) => (
              <TagCardIntoRoom
                key={index}
                tagname={suggestion}
              />
            ))
          }
        </div>
      </div>
      <div>
        <div className='row'>
          <input
            type="text"
            className='form-control col-md-2'
            placeholder="Tìm kiếm theo tag"
            value={tagSearch}
            onChange={handleTagSearchChange}
          />
          <button type="button" class="btn btn-outline-light" onClick={handleSearch}>
          <i class="fa fa-search" style={{color: "#000205"}}></i>
          </button>
        </div>
        <div className='row'>
          {tagSuggestions
            .map((suggestion, index) => (
              <TagCardIntoRoom
                key={index}
                tagname={suggestion}
                onClick={() => setTagSearch(suggestion)}
              />
            ))}
        </div>
      </div>
      {/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
      <div class="d-flex justify-content-end">
        <div className='col-md-2'>
          <input class="form-control " type="number" id="minPrice" onChange={e => { setMinPrice(e.target.value); filterRooms(e.target.value, maxPrice); }} placeholder="Giá tối thiểu:" />
        </div>
        <div className='col-md-2'>
          <input class="form-control " type="number" id="maxPrice" onChange={e => { setMaxPrice(e.target.value); filterRooms(minPrice, e.target.value); }} placeholder="Giá tối đa:" />
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
          {searchResult.tags && searchResult.tags.length > 0 && (
            <div>
              {
                searchResult.tags.map((tag, index) => (
                  <TagCardIntoRoom
                    key={index}
                    tagname={tag}
                  />
                ))
              }
            </div>
          )}
        </div>
      ) : (
        <div className='justify-content-end' style={{margin: "10px"}}>
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
