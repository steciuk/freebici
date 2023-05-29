import 'leaflet/dist/leaflet.css';

import React, { useMemo } from 'react';
import { MapContainer, Marker, Polygon, Popup, TileLayer } from 'react-leaflet';
import { VALENBICI_VORONOI } from 'src/apis/valenbici/voronoi/voronoi';
import useToggle from 'src/hooks/util/useToggle';
import { UseValenbiciResponse } from 'src/hooks/valenbici/useValenbici';

import { Switch } from '@mui/material';

const Heatmap = (props: { valenbici: UseValenbiciResponse }) => {
  const center: [number, number] = [39.474809, -0.376574];
  const [stations, error, loading] = props.valenbici;

  const [showStations, toggleShowStations] = useToggle(true);

  const colors = useMemo(() => {
    const colors: { [key: string]: string } = {};
    stations.forEach((station) => {
      if (!station.open) return (colors[station.id] = 'black'); // gray

      colors[station.id] = mapValueToColor(station.available / station.total);
    });

    return colors;
  }, [stations]);

  return (
    <div
      css={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
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
        {stations.map((station) => (
          <Polygon
            key={station.id}
            positions={VALENBICI_VORONOI[station.id].region}
            pathOptions={{
              stroke: true,
              color: 'white',
              weight: 2,
              opacity: 0.8,
              dashArray: '3',
              fillOpacity: 0.5,
              fillColor: colors[station.id],
            }}
          />
        ))}
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

// Map values between 0 and 1 to a color between red and green
function mapValueToColor(value: number): string {
  const hue = (1 - value) * 120;
  return `hsl(${hue}, 100%, 50%)`;
}

export default Heatmap;
