import React, { memo, useMemo } from 'react';
import { Polygon } from 'react-leaflet';
import { ValenbiciStation } from 'src/apis/valenbici/types';
import { VALENBICI_VORONOI } from 'src/apis/valenbici/voronoi/voronoi';

const Voronoi = (props: {
  stations: ValenbiciStation[];
  invertColors: boolean;
}) => {
  const stationsWithColors = useMemo(() => {
    const stationsWithColors: (ValenbiciStation & { color: string })[] = [];

    props.stations.forEach((station) => {
      if (!station.open)
        return stationsWithColors.push({ ...station, color: 'black' });

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

  return (
    <>
      {stationsWithColors.map((station) => (
        <Polygon
          key={station.id}
          positions={VALENBICI_VORONOI[station.id].region}
          css={{
            cursor: 'grab',
          }}
          pathOptions={{
            stroke: true,
            color: 'white',
            weight: 2,
            opacity: 0.8,
            dashArray: '3',
            fillOpacity: 0.5,
            fillColor: station.color,
          }}
        />
      ))}
    </>
  );
};

function mapValueToColor(value: number): string {
  const hue = value * 120;
  return `hsl(${hue}, 100%, 50%)`;
}

export default memo(Voronoi);
