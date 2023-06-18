import { LeafletMouseEvent } from 'leaflet';
import React, { memo, useMemo, useState } from 'react';
import { Polygon } from 'react-leaflet';
import { ValenbiciStation } from 'src/apis/valenbici/types';
import { VALENBICI_VORONOI } from 'src/apis/valenbici/voronoi/voronoi';
import LeafletMarker from 'src/components/common/map/LeafletMarker';
import StationPopup from 'src/components/common/map/StationPopup';

const voronoiStyle = {
  stroke: true,
  weight: 2,
  opacity: 0.8,
  fillOpacity: 0.5,
  color: 'white',
  dashArray: '3',
};

const selectedVoronoiStyle = {
  ...voronoiStyle,
  color: '#666',
  dashArray: '',
  weight: 4,
};

const Voronoi = (props: {
  stations: ValenbiciStation[];
  invertColors: boolean;
  selectable?: boolean;
}) => {
  const [selectedStation, setSelectedStation] = useState<string | null>(null);

  const stationsWithColors = useMemo(() => {
    const stationsWithColors: ValenbiciStationWithColor[] = [];

    props.stations.forEach((station) => {
      // TODO: analyze if 'open' field means the station doesn't work
      // if (!station.open)
      //   return stationsWithColors.push({ ...station, color: 'black' });

      const value = station.available / station.total;
      const color = mapValueToColor(props.invertColors ? 1 - value : value);
      stationsWithColors.push({ ...station, color });
    });

    // TODO: move this to a better place
    // This is done to avoid errors if we don't have Voronoi for a station
    const stationsWithColorsInVoronoiData = stationsWithColors.filter(
      (station) => VALENBICI_VORONOI[station.id]
    );

    return stationsWithColorsInVoronoiData;
  }, [props.stations, props.invertColors]);

  const handleSelect = (
    station: ValenbiciStation,
    event: LeafletMouseEvent
  ) => {
    if (!props.selectable) return;

    if (selectedStation === station.id) {
      setSelectedStation(null);
      event.target.bringToBack();
    } else {
      setSelectedStation(station.id);
      event.target.bringToFront();
    }
  };

  return (
    <>
      {stationsWithColors.map((station) => (
        <Polygon
          key={station.id}
          positions={VALENBICI_VORONOI[station.id].region}
          css={{
            cursor: props.selectable ? 'pointer' : 'grab',
          }}
          pathOptions={getVoronoiStyle(station, selectedStation === station.id)}
          eventHandlers={{
            click: (e) => handleSelect(station, e),
          }}
        >
          {selectedStation === station.id && (
            <LeafletMarker position={station.position} color="blue" popupOpened>
              <StationPopup station={station} />
            </LeafletMarker>
          )}
        </Polygon>
      ))}
    </>
  );
};

function mapValueToColor(value: number): string {
  const hue = value * 120;
  return `hsl(${hue}, 100%, 50%)`;
}

function getVoronoiStyle(
  station: ValenbiciStationWithColor,
  selected: boolean
) {
  if (selected) return { ...selectedVoronoiStyle, fillColor: station.color };
  return { ...voronoiStyle, fillColor: station.color };
}

type ValenbiciStationWithColor = ValenbiciStation & { color: string };

export default memo(Voronoi);
