
import * as maptilersdk from '@maptiler/sdk';

const apiKey = 'uEMGFcQ7SCaZtHPbUkji'; // Thay thế bằng API key thực tế của bạn

const mapApiService = {
  map: null,

  initMap: (setCoordinates, initialLat, initialLng) => {
    maptilersdk.config.apiKey = apiKey;
  
    mapApiService.map = new maptilersdk.Map({
      container: 'map',
      style: maptilersdk.MapStyle.STREETS,
      center: [initialLng, initialLat], // Sử dụng initialLat và initialLng
      zoom: 14
    });

    const geojson = {
      'type': 'FeatureCollection',
      'features': [
        {
          'type': 'Feature',
          'geometry': {
            'type': 'Point',
            'coordinates': [initialLng, initialLat]
          }
        }
      ]
    };

    function onMove(e) {
      const coords = e.lngLat;
      geojson.features[0].geometry.coordinates = [coords.lng, coords.lat];
      mapApiService.map.getSource('point').setData(geojson);
      setCoordinates({ lat: coords.lat, lng: coords.lng });
    }

    mapApiService.map.on('load', () => {
      mapApiService.map.addSource('point', {
        'type': 'geojson',
        'data': geojson
      });

      mapApiService.map.addLayer({
        'id': 'point',
        'type': 'circle',
        'source': 'point',
        'paint': {
          'circle-radius': 10,
          'circle-color': '#3887be'
        }
      });

      mapApiService.map.on('mousedown', 'point', (e) => {
        e.preventDefault();
        mapApiService.map.on('mousemove', onMove);
        mapApiService.map.once('mouseup', () => {
          mapApiService.map.off('mousemove', onMove);
        });
      });
    });
  },

  cleanupMap: () => {
    if (mapApiService.map) {
      mapApiService.map.remove();
    }
  }
};

export default mapApiService;
