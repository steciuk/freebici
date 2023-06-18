import { Icon } from 'leaflet';
import React, { memo, useEffect, useRef } from 'react';
import { Marker } from 'react-leaflet';
import blueMarkerIconPng from 'src/assets/markers/marker-icon-blue.png';
import grayMarkerIconPng from 'src/assets/markers/marker-icon-gray.png';
import greenMarkerIconPng from 'src/assets/markers/marker-icon-green.png';
import redMarkerIconPng from 'src/assets/markers/marker-icon-red.png';
import { Children } from 'src/utils/types/Children';

const colors = ['blue', 'green', 'red', 'gray'] as const;
export type MarkerColorType = (typeof colors)[number];
export const markerColorMap: { [key in MarkerColorType]: string } = {
  blue: blueMarkerIconPng,
  green: greenMarkerIconPng,
  red: redMarkerIconPng,
  gray: grayMarkerIconPng,
};

const LeafletMarker = (props: {
  position: [number, number];
  color: MarkerColorType;
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

  const iconUrl = markerColorMap[props.color];

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
