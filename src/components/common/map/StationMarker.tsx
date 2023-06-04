import { Icon } from 'leaflet';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import React, { memo, useEffect, useRef } from 'react';
import { Marker } from 'react-leaflet';
import { ValenbiciStation } from 'src/apis/valenbici/types';
import { Children } from 'src/utils/types/Children';

const StationMarker = (props: {
  station: ValenbiciStation;
  children?: Children;
  popupOpened?: boolean;
}) => {
  const { station } = props;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markerRef = useRef<any>(null);

  useEffect(() => {
    if (props.popupOpened) {
      markerRef.current?.openPopup();
    }
  }, [markerRef, props.popupOpened]);

  return (
    <Marker
      ref={markerRef}
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
      {props.children}
    </Marker>
  );
};

export default memo(StationMarker);
