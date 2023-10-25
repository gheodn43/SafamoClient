import React, { useState } from 'react';
import PropertySearch from './PropertySearch'; // Import lớp PropertySearch
import { LISTPROPERTY } from '../listProperty'; // Import danh sách tài sản

const PropertyComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    // Tạo một đối tượng PropertySearch và truyền danh sách tài sản
    const propertySearch = new PropertySearch(LISTPROPERTY);

    // Thực hiện tìm kiếm theo tên
    const results = propertySearch.searchByName(searchTerm);

    // Lưu kết quả vào state
    setSearchResults(results);
  };

  return (
    <div className="property-component">
      <input
        type="text"
        placeholder="Nhập tên tài sản"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Tìm kiếm</button>

      <div className="search-results">
        <h2>Kết quả tìm kiếm</h2>
        <ul>
          {searchResults.map((result, index) => (
            <li key={index}>{result.propertyName}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PropertyComponent;
