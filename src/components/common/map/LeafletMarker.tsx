import { Icon } from 'leaflet';
import React, { memo, useEffect, useRef } from 'react';
import { Marker } from 'react-leaflet';
import blueMarkerIconPng from 'src/assets/marker-icon-blue.png';
import greenMarkerIconPng from 'src/assets/marker-icon-green.png';
import redMarkerIconPng from 'src/assets/marker-icon-red.png';
import { Children } from 'src/utils/types/Children';

const LeafletMarker = (props: {
  position: [number, number];
  color?: 'blue' | 'green' | 'red';
  children?: Children;
  popupOpened?: boolean;
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markerRef = useRef<any>(null);

  useEffect(() => {
    if (props.popupOpened) {
      markerRef.current?.openPopup();
    }
  }, [markerRef, props.popupOpened]);

  let iconUrl = blueMarkerIconPng;
  if (props.color === 'green') iconUrl = greenMarkerIconPng;
  else if (props.color === 'red') iconUrl = redMarkerIconPng;

  return (
    <Marker
      ref={markerRef}
      position={props.position}
      icon={
        new Icon({
          iconUrl: iconUrl,
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
        })
      }
    >
      {props.children}
    </Marker>
  );
};

export default memo(LeafletMarker);
