import React from 'react';
import { NominatimAddress } from 'src/apis/nominatim/types';
import { ValenbiciStation } from 'src/apis/valenbici/types';
import LeafletMarker, {
  MarkerColorType,
} from 'src/components/common/map/LeafletMarker';
import RoutingMachine from 'src/components/common/map/RoutingMachine';
import StationPopup from 'src/components/common/map/StationPopup';
import FinderPopup from 'src/pages/Finder/FinderPopup';

export type Waypoints = {
  walkingFromOrigin: [[number, number], [number, number]] | null;
  walkingToDestination: [[number, number], [number, number]] | null;
  cycling: ValenbiciStation[] | null;
  unavailableStations: ValenbiciStation[] | null;
};

export const routingMarkerTypes = [
  'station',
  'origin',
  'destination',
  'unavailable',
] as const;
export type RoutingMarkerType = (typeof routingMarkerTypes)[number];
export const routingMarkerTypeColorMap: {
  [key in RoutingMarkerType]: MarkerColorType;
} = {
  station: 'blue',
  origin: 'green',
  destination: 'red',
  unavailable: 'gray',
};

const MapRouting = (props: {
  origin: NominatimAddress;
  destination: NominatimAddress;
  waypoints: Waypoints;
}) => {
  const { origin, destination, waypoints } = props;

  return (
    <>
      <LeafletMarker
        position={origin.position}
        color={routingMarkerTypeColorMap['origin']}
      >
        <FinderPopup name={origin.display_name} type="origin" />
      </LeafletMarker>
      <LeafletMarker
        position={destination.position}
        color={routingMarkerTypeColorMap['destination']}
      >
        <FinderPopup name={destination.display_name} type="destination" />
      </LeafletMarker>
      {waypoints.walkingFromOrigin && (
        <RoutingMachine
          waypoints={waypoints.walkingFromOrigin}
          mode="walking"
        />
      )}
      {waypoints.walkingToDestination && (
        <RoutingMachine
          waypoints={waypoints.walkingToDestination}
          mode="walking"
        />
      )}
      {waypoints.cycling && (
        <>
          <RoutingMachine
            waypoints={waypoints.cycling.map((station) => station.position)}
            mode="bicycling"
          />
          {waypoints.cycling.map((station) => (
            <LeafletMarker
              key={station.id}
              position={station.position}
              color={routingMarkerTypeColorMap['station']}
            >
              <StationPopup station={station} />
            </LeafletMarker>
          ))}
        </>
      )}
      {waypoints.unavailableStations && (
        <>
          {waypoints.unavailableStations.map((station) => (
            <LeafletMarker
              key={station.id}
              position={station.position}
              color={routingMarkerTypeColorMap['unavailable']}
            >
              <StationPopup station={station} />
            </LeafletMarker>
          ))}
        </>
      )}
    </>
  );
};

export default MapRouting;
