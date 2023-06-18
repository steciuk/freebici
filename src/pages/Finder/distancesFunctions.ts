import { ValenbiciStation } from 'src/apis/valenbici/types';

const AVERAGE_CYCLING_SPEED = 140; // m/min
const EARTH_RADIUS = 6_371_000; // m

export enum CommuteType {
  IN,
  OUT,
  BOTH,
}

export function getClosestStations(
  point: [number, number], // [lat, lon]
  stations: ValenbiciStation[]
): ValenbiciStation[] {
  const stationsWithDistance = stations.map((station) => ({
    station,
    distance: distance(point, station.position),
  }));

  stationsWithDistance.sort((a, b) => a.distance - b.distance);

  return stationsWithDistance.map(
    (stationWithDistance) => stationWithDistance.station
  );
}

export function computeCyclingTime(
  point1: [number, number], // [lat, lon]
  point2: [number, number] // [lat, lon]
): number {
  const distance = getMetersDistanceFromCoordinates(point1, point2);
  return distance / AVERAGE_CYCLING_SPEED; // min
}

export function findStationInBetweenAndUnavailable(
  station1: ValenbiciStation,
  station2: ValenbiciStation,
  stations: ValenbiciStation[]
): [closest: ValenbiciStation | null, unavailable: ValenbiciStation[]] {
  const lat = (station1.position[0] + station2.position[0]) / 2;
  const lon = (station1.position[1] + station2.position[1]) / 2;

  const [midStation, unavailable] = getClosestStationsAndUnavailable(
    [lat, lon],
    stations,
    CommuteType.BOTH
  );

  if (midStation === null) return [null, unavailable];

  // TODO: Maybe it would be better to reroute further than to skip a necessary hop
  if (midStation.id === station1.id || midStation.id === station2.id)
    return [null, unavailable];

  return [midStation, unavailable];
}

export function getClosestStationsAndUnavailable(
  position: [number, number],
  stations: ValenbiciStation[],
  commuteType: CommuteType
): [closest: ValenbiciStation | null, unavailable: ValenbiciStation[]] {
  const closestStations = getClosestStations(position, stations);
  let closesStation: ValenbiciStation | null = null;
  const unavailableStations: ValenbiciStation[] = [];

  switch (commuteType) {
    case CommuteType.IN:
      closestStations.some((station) => {
        if (station.available < station.total) {
          closesStation = station;
          return true;
        }
        unavailableStations.push(station);
        return false;
      });
      break;
    case CommuteType.OUT:
      closestStations.some((station) => {
        if (station.available > 0) {
          closesStation = station;
          return true;
        }
        unavailableStations.push(station);
        return false;
      });
      break;
    case CommuteType.BOTH:
      closestStations.some((station) => {
        if (station.available > 0 && station.available < station.total) {
          closesStation = station;
          return true;
        }
        unavailableStations.push(station);
        return false;
      });
      break;
    default:
      throw new Error('Invalid commute type');
  }

  return [closesStation, unavailableStations];
}

function getClosestStation(
  point: [number, number], // [lat, lon]
  stations: ValenbiciStation[]
): ValenbiciStation {
  let closestStation = stations[0];
  let closestDistance = distance(point, stations[0].position);

  for (let i = 1; i < stations.length; i++) {
    const station = stations[i];
    const stationDistance = distance(point, station.position);
    if (stationDistance < closestDistance) {
      closestStation = station;
      closestDistance = stationDistance;
    }
  }

  return closestStation;
}

function distance(point1: [number, number], point2: [number, number]): number {
  const [lat1, lon1] = point1;
  const [lat2, lon2] = point2;

  return Math.sqrt(Math.pow(lat2 - lat1, 2) + Math.pow(lon2 - lon1, 2));
}

function getMetersDistanceFromCoordinates(
  point1: [number, number], // [lat, lon]
  point2: [number, number] // [lat, lon]
): number {
  const [lat1, lon1] = point1;
  const [lat2, lon2] = point2;

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return EARTH_RADIUS * c;
}

function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}
