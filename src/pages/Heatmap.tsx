import React, { useEffect, useMemo, useState } from 'react';
import { ValenbiciState } from 'src/apis/valenbici/types';
import Loader from 'src/components/common/Loader';
import LeafletMap from 'src/components/common/map/LeafletMap';
import StationMarker from 'src/components/common/map/StationMarker';
import StationPopup from 'src/components/common/map/StationPopup';
import Voronoi from 'src/components/common/map/Voronoi';
import Sidebar from 'src/components/common/Sidebar';
import useToggle from 'src/hooks/util/useToggle';

import { Button, FormControlLabel, Slider, Switch } from '@mui/material';

const Heatmap = (props: {
  valenbici: ValenbiciState;
  getValenbici: (force?: boolean) => Promise<void>;
}) => {
  const { valenbici, getValenbici } = props;
  const { stations, lastUpdate, loading } = valenbici;

  const [showStations, toggleShowStations] = useToggle(false);
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
    return stations.filter(
      (station) =>
        station.available >= availableRange[0] &&
        station.available <= availableRange[1]
    );
  }, [stations, availableRange]);

  useEffect(() => {
    setAvailableRange([0, maxTotal]);
  }, [maxTotal]);

  useEffect(() => {
    getValenbici();
  }, [getValenbici]);

  if (loading || stations.length === 0) return <Loader />;

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
        {!showStations && (
          <Voronoi
            stations={stationsFiltered}
            invertColors={invertColors}
            selectable
          />
        )}
        {showStations &&
          stationsFiltered.map((station) => (
            <StationMarker key={station.id} station={station}>
              <StationPopup station={station} />
            </StationMarker>
          ))}
      </LeafletMap>

      <Sidebar>
        <div>
          <span>Last update: </span>
          <span>{lastUpdate?.toLocaleString()}</span>
          <div css={{ marginTop: '0.5rem' }}>
            <Button
              variant="contained"
              disabled={loading}
              onClick={() => getValenbici(true)}
            >
              Refresh
            </Button>
          </div>
        </div>
        <div css={{ marginTop: '1rem' }}>
          <span>Heatmap</span>
          <Switch
            checked={showStations}
            onChange={() => toggleShowStations()}
            color="default"
          />
          <span>Stations</span>
        </div>
        <FormControlLabel
          control={
            <Switch
              checked={invertColors}
              onChange={() => toggleInvertColors()}
              disabled={showStations}
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
