import React, { useEffect } from 'react';
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";

const DisplayLocation = ({ lng, lat}) => {
  useEffect(() => {
    maptilersdk.config.apiKey = 'uEMGFcQ7SCaZtHPbUkji';
    const map = new maptilersdk.Map({
      container: 'map',
      style: maptilersdk.MapStyle.STREETS,
      center: [lng, lat],
      zoom: 14,
    });
    const marker = new maptilersdk.Marker()
      .setLngLat([lng, lat])
      .addTo(map);
  }, [lng, lat]);

  return (
    <div id="map" style={{ position: 'absolute', top: 0, bottom: 0, width: '100%' }}></div>
  );
};

export default DisplayLocation;
