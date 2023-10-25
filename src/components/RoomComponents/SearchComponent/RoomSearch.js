import React, { useState, useEffect } from 'react';

class RoomSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      searchResults: [],
    };
  }

  handleSearchTermChange = (event) => {
    this.setState({ searchTerm: event.target.value });
  }

  searchByName = () => {
    const { searchTerm } = this.state;
    const { roomList } = this.props;

    const results = roomList.filter(room => room.roomName.includes(searchTerm));
    this.setState({ searchResults: results });
  }

  componentDidMount() {
    this.searchByName();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchTerm !== this.state.searchTerm) {
      this.searchByName();
    }
  }
  sortRoomsByPriority = (priority) => {
    const { searchResults } = this.state;

    const sortedResults = [...searchResults]; // Tạo bản sao của danh sách kết quả
    sortedResults.sort((roomA, roomB) => {
      if (priority === 'noImage') {
        // Sắp xếp phòng chưa có hình ảnh cuối cùng
        if (!roomA.imageUrl && roomB.imageUrl) return 1;
        if (roomA.imageUrl && !roomB.imageUrl) return -1;
      } else if (priority === 'noTag') {
        // Sắp xếp phòng chưa có tag cuối cùng
        if (!roomA.tags.length && roomB.tags.length) return 1;
        if (roomA.tags.length && !roomB.tags.length) return -1;
      }

      return 0;
    });

    this.setState({ searchResults: sortedResults });
  }
  searchByTag = (tag) => {
    const { roomList } = this.props;

    const results = roomList.filter(room => room.tags.includes(tag));
    this.setState({ searchResults: results });
  }

  render() {
    const { searchTerm, searchResults } = this.state;

    return (
      <div className="room-search">
        <button onClick={() => this.sortRoomsByPriority('noImage')}>Sắp xếp phòng chưa có hình ảnh cuối cùng</button>
        <button onClick={() => this.sortRoomsByPriority('noTag')}>Sắp xếp phòng chưa có tag cuối cùng</button>
        <input
          type="text"
          placeholder="Tìm kiếm phòng theo tên"
          value={searchTerm}
          onChange={this.handleSearchTermChange}
        />
        <h3>Kết quả tìm kiếm:</h3>
        {/* Hiển thị kết quả tìm kiếm ở đây */}
        {searchResults.map((room, index) => (
          <div key={index}>{room.roomName}</div>
        ))}
        <button onClick={() => this.sortRoomsByPriority('price')}>Sắp xếp theo giá</button>
      </div>
    );
  }
}

export default RoomSearch;
