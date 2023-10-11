import React, { useEffect, useState } from 'react';
import mapApiService from '../../services/mapAPI';

function DragPoint({ initialLat, initialLng }) {
  const [coordinates, setCoordinates] = useState({ lat: initialLat, lng: initialLng });

  useEffect(() => {
    // Gọi hàm từ mapApiService để khởi tạo bản đồ và lắng nghe sự kiện kéo điểm.
    mapApiService.initMap(setCoordinates, initialLat, initialLng);

    return () => {
      // Cleanup khi component bị hủy
      mapApiService.cleanupMap();
    };
  }, [initialLat, initialLng]);

  return (
    <div>
      <div className="coordinates">
        Latitude: {coordinates.lat.toFixed(4)}<br />
        Longitude: {coordinates.lng.toFixed(4)}
      </div>
      <div id="map"></div>
    </div>
  );
}

export default DragPoint;
