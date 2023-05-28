import 'leaflet/dist/leaflet.css';

import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { UseValenbiciResponse } from 'src/apis/valenbici/useValenbici';
import useToggle from 'src/hooks/useToggle';

import { Switch } from '@mui/material';

const Heatmap = (props: { valenbici: UseValenbiciResponse }) => {
  const center: [number, number] = [39.474809, -0.376574];
  const [stations, error, loading] = props.valenbici;

  const [showStations, toggleShowStations] = useToggle(true);

  return (
    <div
      css={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={true}
        css={{
          flexGrow: 1,
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {showStations &&
          stations.map((station) => (
            <Marker key={station.id} position={station.position}>
              <Popup>
                <div>{station.address}</div>
                <div>
                  {station.available}/{station.total}
                </div>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
      <div>
        <Switch checked={showStations} onChange={() => toggleShowStations()} />
      </div>
    </div>
  );
};

export default Heatmap;
