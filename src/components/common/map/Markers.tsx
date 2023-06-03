import { Icon } from 'leaflet';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import React, { memo } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { ValenbiciStation } from 'src/apis/valenbici/types';

const Markers = (props: { stations: ValenbiciStation[] }) => {
  return (
    <>
      {props.stations.map((station) => (
        <Marker
          key={station.id}
          position={station.position}
          icon={
            new Icon({
              iconUrl: markerIconPng,
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
            })
          }
        >
          <Popup>
            <div>{station.address}</div>
            <div>
              Available bikes:{' '}
              <b>
                {station.available}/{station.total} {'('}
                {((station.available / station.total) * 100).toFixed(2)}%{')'}
              </b>
            </div>
            {!station.open && (
              <div>
                <b>Station closed</b>
              </div>
            )}
          </Popup>
        </Marker>
      ))}
    </>
  );
};

export default memo(Markers);
