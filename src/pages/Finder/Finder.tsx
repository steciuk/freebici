import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Rectangle } from 'react-leaflet';
import { resultToAddress } from 'src/apis/nominatim/resultToAddress';
import { NominatimAddress, NominatimResponse } from 'src/apis/nominatim/types';
import { getNominatimUrl } from 'src/apis/nominatim/url';
import { ValenbiciState, ValenbiciStation } from 'src/apis/valenbici/types';
import Loader from 'src/components/common/Loader';
import LeafletMap from 'src/components/common/map/LeafletMap';
import LeafletMarker from 'src/components/common/map/LeafletMarker';
import RoutingMachine from 'src/components/common/map/RoutingMachine';
import StationPopup from 'src/components/common/map/StationPopup';
import Sidebar from 'src/components/common/Sidebar';
import useToggle from 'src/hooks/util/useToggle';
import {
  computeCyclingTime,
  findClosestStation,
  findStationInBetween,
} from 'src/pages/Finder/distancesFunctions';
import FinderPopup from 'src/pages/Finder/FinderPopup';

import ClearIcon from '@mui/icons-material/Clear';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import SearchIcon from '@mui/icons-material/Search';
import { Button, FormControlLabel, Switch, TextField } from '@mui/material';

const VALENCIA_BOUNDING_BOX = {
  lat: [39.432, 39.51],
  lon: [-0.435, -0.28],
};

const CYCLING_TIME_LIMIT = 30; // min

type Waypoints = {
  walkingFromOrigin: [[number, number], [number, number]] | null;
  walkingToDestination: [[number, number], [number, number]] | null;
  cycling: ValenbiciStation[] | null;
};

const Finder = (props: {
  valenbici: ValenbiciState;
  getValenbici: (force?: boolean) => void;
}) => {
  const { valenbici, getValenbici } = props;
  const { stations, lastUpdate, loading } = valenbici;

  const [originQuery, setOriginQuery] = useState<string>('');
  const [destinationQuery, setDestinationQuery] = useState<string>('');
  const [originResult, setOriginResult] = useState<NominatimAddress | null>(
    null
  );
  const [destinationResult, setDestinationResult] =
    useState<NominatimAddress | null>(null);
  const [waypoints, setWaypoints] = useState<Waypoints>({
    walkingFromOrigin: null,
    walkingToDestination: null,
    cycling: null,
  });
  const [routeLoading, toggleRouteLoading] = useToggle(false);
  const [showBoundingBox, toggleShowBoundingBox] = useToggle(false);

  const previousOriginQueryRef = useRef<string>('');
  const previousDestinationQueryRef = useRef<string>('');

  const isSameQuery =
    originQuery === previousOriginQueryRef.current &&
    destinationQuery === previousDestinationQueryRef.current;

  const createARoute = () => {
    setOriginResult(null);
    setDestinationResult(null);

    previousOriginQueryRef.current = originQuery;
    previousDestinationQueryRef.current = destinationQuery;

    const fetchAddress = async () => {
      try {
        const modifiedOriginQuery = originQuery + ', Valencia';
        const modifiedDestinationQuery = destinationQuery + ', Valencia';

        const response = await Promise.all([
          axios.get<NominatimResponse>(getNominatimUrl(modifiedOriginQuery)),
          axios.get<NominatimResponse>(
            getNominatimUrl(modifiedDestinationQuery)
          ),
        ]);

        const [originResult, destinationResult] = response.map((r) => r.data);
        if (originResult.length === 0 && destinationResult.length === 0)
          return window.alert('Origin and destination not found');
        else if (originResult.length === 0)
          return window.alert('Origin not found');
        else if (destinationResult.length === 0)
          return window.alert('Destination not found');

        const firstOriginResult = resultToAddress(originResult[0]);
        const firstDestinationResult = resultToAddress(destinationResult[0]);

        if (firstOriginResult.osm_id === firstDestinationResult.osm_id)
          return window.alert('Origin and destination are the same');

        if (
          firstOriginResult.position[0] < VALENCIA_BOUNDING_BOX.lat[0] ||
          firstOriginResult.position[0] > VALENCIA_BOUNDING_BOX.lat[1] ||
          firstOriginResult.position[1] < VALENCIA_BOUNDING_BOX.lon[0] ||
          firstOriginResult.position[1] > VALENCIA_BOUNDING_BOX.lon[1] ||
          firstDestinationResult.position[0] < VALENCIA_BOUNDING_BOX.lat[0] ||
          firstDestinationResult.position[0] > VALENCIA_BOUNDING_BOX.lat[1] ||
          firstDestinationResult.position[1] < VALENCIA_BOUNDING_BOX.lon[0] ||
          firstDestinationResult.position[1] > VALENCIA_BOUNDING_BOX.lon[1]
        )
          return window.alert('Origin or destination are outside of Valencia');

        const waypoints = computeWaypoints(
          firstOriginResult,
          firstDestinationResult,
          stations
        );

        setOriginResult(firstOriginResult);
        setDestinationResult(firstDestinationResult);
        setWaypoints(waypoints);
        toggleRouteLoading(false);
      } catch (error) {
        console.error(error);
      } finally {
        toggleRouteLoading(false);
      }
    };

    toggleRouteLoading(true);
    fetchAddress();
  };

  const handleClear = () => {
    previousDestinationQueryRef.current = '';
    previousOriginQueryRef.current = '';
    setOriginQuery('');
    setDestinationQuery('');
    setOriginResult(null);
    setDestinationResult(null);
  };

  useEffect(() => {
    getValenbici();
  }, [getValenbici]);

  if (loading || stations.length === 0) return <Loader />;

  return (
    <div
      css={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <LeafletMap>
        {showBoundingBox && (
          <Rectangle
            css={{
              cursor: 'grab',
            }}
            bounds={[
              [VALENCIA_BOUNDING_BOX.lat[0], VALENCIA_BOUNDING_BOX.lon[0]],
              [VALENCIA_BOUNDING_BOX.lat[1], VALENCIA_BOUNDING_BOX.lon[1]],
            ]}
            fillOpacity={0.1}
          />
        )}
        {originResult && destinationResult && (
          <>
            <LeafletMarker position={originResult.position} color="green">
              <FinderPopup name={originResult.display_name} type="origin" />
            </LeafletMarker>
            <LeafletMarker position={destinationResult.position} color="red">
              <FinderPopup
                name={destinationResult.display_name}
                type="destination"
              />
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
                  waypoints={waypoints.cycling.map(
                    (station) => station.position
                  )}
                  mode="bicycling"
                />
                {waypoints.cycling.map((station) => (
                  <LeafletMarker key={station.id} position={station.position}>
                    <StationPopup station={station} />
                  </LeafletMarker>
                ))}
              </>
            )}
          </>
        )}
      </LeafletMap>

      <Sidebar>
        <TextField
          css={{ marginBottom: '1rem', width: '100%' }}
          value={originQuery}
          onChange={(e) => setOriginQuery(e.target.value)}
          label="Origin"
          disabled={routeLoading}
        />
        <TextField
          css={{ marginBottom: '1rem', width: '100%' }}
          value={destinationQuery}
          onChange={(e) => setDestinationQuery(e.target.value)}
          label="Destination"
          disabled={routeLoading}
        />
        <div
          css={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '1rem',
          }}
        >
          <Button
            onClick={() => createARoute()}
            variant="contained"
            disabled={
              !originQuery || !destinationQuery || isSameQuery || routeLoading
            }
          >
            {routeLoading ? <HourglassEmptyIcon /> : <SearchIcon />}
            <span
              css={{
                marginLeft: '0.5rem',
              }}
            >
              Search
            </span>
          </Button>
          <Button
            onClick={handleClear}
            variant="contained"
            disabled={routeLoading}
          >
            <ClearIcon />
            <span
              css={{
                marginLeft: '0.5rem',
              }}
            >
              Clear
            </span>
          </Button>
        </div>
        <FormControlLabel
          control={
            <Switch
              checked={showBoundingBox}
              onChange={() => toggleShowBoundingBox()}
              disabled={routeLoading}
            />
          }
          label="Show supported area"
        />
      </Sidebar>
    </div>
  );
};

function computeWaypoints(
  origin: NominatimAddress,
  destination: NominatimAddress,
  stations: ValenbiciStation[]
): Waypoints {
  if (!origin || !destination)
    return {
      walkingFromOrigin: null,
      walkingToDestination: null,
      cycling: null,
    };

  const closestOriginStation = findClosestStation(origin.position, stations);

  const closestDestinationStation = findClosestStation(
    destination.position,
    stations
  );

  if (closestDestinationStation.id === closestOriginStation.id) {
    return {
      walkingFromOrigin: [origin.position, destination.position],
      walkingToDestination: null,
      cycling: null,
    };
  }

  let hops: Array<ValenbiciStation | null> = [
    closestOriginStation,
    closestDestinationStation,
  ];
  let hopsChanged = true;

  while (hopsChanged) {
    hopsChanged = false;
    const newHops = [];
    for (let i = 0; i < hops.length - 1; i++) {
      const hop1 = hops[i];
      const hop2 = hops[i + 1];

      if (hop1 === null || hop2 === null) {
        newHops.push(hop1);
        continue;
      }

      const cyclingTime = computeCyclingTime(hop1.position, hop2.position);

      if (cyclingTime > CYCLING_TIME_LIMIT) {
        const newHop = findStationInBetween(hop1, hop2, stations);
        newHops.push(hop1, newHop);
        hopsChanged = true;
      } else {
        newHops.push(hop1);
        newHops.push(null);
      }
    }

    newHops.push(hops[hops.length - 1]);
    hops = newHops;
  }

  const cyclingHops = hops.filter(
    (hop): hop is ValenbiciStation => hop !== null
  );

  return {
    walkingFromOrigin: [origin.position, closestOriginStation.position],
    walkingToDestination: [
      closestDestinationStation.position,
      destination.position,
    ],
    cycling: cyclingHops,
  };
}

export default Finder;
