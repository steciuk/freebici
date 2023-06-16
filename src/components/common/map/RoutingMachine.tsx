import 'leaflet-routing-machine';
import 'src/components/common/map/RoutingMachine.css';

import L from 'leaflet';
import React, { memo } from 'react';

import { createControlComponent } from '@react-leaflet/core';

export type RoutingModes = 'bicycling' | 'walking';

const createRoutingMachine = (props: {
  waypoints: [number, number][];
  mode: RoutingModes;
}) => {
  const instance = L.Routing.control({
    waypoints: props.waypoints.map((waypoint) => {
      return L.latLng(waypoint[0], waypoint[1]);
    }),
    lineOptions: {
      styles: [getRoutingLineStyles(props.mode)],
      extendToWaypoints: true,
      missingRouteTolerance: 100,
    },
    show: false,
    addWaypoints: false,
    routeWhileDragging: false,
    fitSelectedRoutes: false,
    showAlternatives: false,
    createMarker: () => null,
    router: L.Routing.osrmv1({
      serviceUrl: `https://routing.openstreetmap.de/routed-${
        props.mode === 'bicycling' ? 'bike' : 'foot'
      }/route/v1`,
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any);

  return instance;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RoutingMachine = memo(
  createControlComponent(createRoutingMachine as any)
);

export function getRoutingLineStyles(mode: RoutingModes) {
  return {
    color: mode === 'bicycling' ? '#00aaff' : '#ff0000',
    weight: 8,
    opacity: 0.8,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default RoutingMachine as any;
