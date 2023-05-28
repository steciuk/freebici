import 'leaflet/dist/leaflet.css';

import React, { useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { UseValenbiciResponse } from 'src/apis/valenbici/useValenbici';

const Heatmap = (props: { valenbici: UseValenbiciResponse }) => {
  const [center, setCenter] = useState<[number, number]>([
    39.474809, -0.376574,
  ]);

  const [stations, error, loading] = props.valenbici;

  return (
    <MapContainer
      center={center}
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
      <Marker position={center}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Heatmap;
