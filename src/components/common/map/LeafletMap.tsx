import 'leaflet/dist/leaflet.css';

import React, { memo } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { Children } from 'src/utils/types/Children';

const VALENCIA_CENTER: [number, number] = [39.474809, -0.376574];

const LeafletMap = (props: { children?: Children }) => {
  return (
    <MapContainer
      center={VALENCIA_CENTER}
      zoom={13}
      scrollWheelZoom={true}
      css={{
        width: '100%',
        height: '100%',
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {props.children}
    </MapContainer>
  );
};

export default memo(LeafletMap);
