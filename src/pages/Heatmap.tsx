import React, { useEffect, useMemo, useState } from 'react';
import LeafletMap from 'src/components/common/map/LeafletMap';
import Markers from 'src/components/common/map/Markers';
import Voronoi from 'src/components/common/map/Voronoi';
import Sidebar from 'src/components/common/Sidebar';
import useToggle from 'src/hooks/util/useToggle';
import { UseValenbiciResponse } from 'src/hooks/valenbici/useValenbici';

import { FormControlLabel, Slider, Switch } from '@mui/material';

const Heatmap = (props: { valenbici: UseValenbiciResponse }) => {
  const [stations, _error, loading] = props.valenbici;

  const [showStations, toggleShowStations] = useToggle(true);
  const [showVoronoi, toggleShowVoronoi] = useToggle(true);
  const [invertColors, toggleInvertColors] = useToggle(false);

  const [availableRange, setAvailableRange] = useState<[number, number]>([
    0, 100,
  ]);

  const maxTotal = useMemo(() => {
    let maxTotal = 0;
    stations.forEach((station) => {
      if (station.total > maxTotal) maxTotal = station.total;
    });
    return maxTotal;
  }, [stations]);

  const stationsFiltered = useMemo(() => {
    stations.filter(
      (station) =>
        station.available >= availableRange[0] &&
        station.available <= availableRange[1]
    );

    return stations;
  }, [stations, availableRange]);

  useEffect(() => {
    setAvailableRange([0, maxTotal]);

    console.log(maxTotal);
  }, [maxTotal]);

  return (
    <div
      css={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <LeafletMap>
        {showVoronoi && (
          <Voronoi stations={stationsFiltered} invertColors={invertColors} />
        )}
        {showStations && <Markers stations={stationsFiltered} />}
      </LeafletMap>

      <Sidebar>
        <FormControlLabel
          control={
            <Switch
              checked={showStations}
              onChange={() => toggleShowStations()}
            />
          }
          label="Show stations"
        />
        <FormControlLabel
          control={
            <Switch
              checked={showVoronoi}
              onChange={() => toggleShowVoronoi()}
            />
          }
          label="Show voronoi"
        />
        <FormControlLabel
          control={
            <Switch
              checked={invertColors}
              onChange={() => toggleInvertColors()}
            />
          }
          label="Invert colors"
        />
        <div className="filtering" css={{ width: '100%', marginTop: '1rem' }}>
          <div>Available bikes range</div>
          <Slider
            value={availableRange}
            onChange={(_event, newValue) => {
              setAvailableRange(newValue as [number, number]);
            }}
            valueLabelDisplay="auto"
            min={0}
            max={maxTotal}
            step={1}
          />
        </div>
      </Sidebar>
    </div>
  );
};

export default Heatmap;
