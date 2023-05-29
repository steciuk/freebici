import 'leaflet/dist/leaflet.css';

import React, { useMemo, useState } from 'react';
import { MapContainer, Marker, Polygon, Popup, TileLayer } from 'react-leaflet';
import { VALENBICI_VORONOI } from 'src/apis/valenbici/voronoi/voronoi';
import useToggle from 'src/hooks/util/useToggle';
import { UseValenbiciResponse } from 'src/hooks/valenbici/useValenbici';

import CloseIcon from '@mui/icons-material/Close';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { Button, FormControlLabel, Slider, Switch } from '@mui/material';

const Heatmap = (props: { valenbici: UseValenbiciResponse }) => {
  const center: [number, number] = [39.474809, -0.376574];
  const [stations, _error, _loading] = props.valenbici;

  const [showStations, toggleShowStations] = useToggle(true);
  const [showVoronoi, toggleShowVoronoi] = useToggle(true);
  const [invertColors, toggleInvertColors] = useToggle(false);

  const [showSidebar, toggleShowSidebar] = useToggle(true);

  const maxTotal = useMemo(() => {
    let maxTotal = 0;
    stations.forEach((station) => {
      if (station.total > maxTotal) maxTotal = station.total;
    });
    return maxTotal;
  }, [stations]);

  const [availbleRange, setAvailableRange] = useState<[number, number]>([
    0,
    maxTotal,
  ]);

  const colors = useMemo(() => {
    const colors: { [key: string]: string } = {};
    stations.forEach((station) => {
      if (!station.open) return (colors[station.id] = 'black');

      const value = station.available / station.total;
      colors[station.id] = mapValueToColor(invertColors ? 1 - value : value);
    });

    return colors;
  }, [stations, invertColors]);

  const stationsFiltered = stations.filter(
    (station) =>
      station.available >= availbleRange[0] &&
      station.available <= availbleRange[1]
  );

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
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={true}
        css={{
          flexGrow: 1,
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {showVoronoi &&
          stationsFiltered.map((station) => (
            <Polygon
              key={station.id}
              positions={VALENBICI_VORONOI[station.id].region}
              pathOptions={{
                stroke: true,
                color: 'white',
                weight: 2,
                opacity: 0.8,
                dashArray: '3',
                fillOpacity: 0.5,
                fillColor: colors[station.id],
              }}
            />
          ))}
        {showStations &&
          stationsFiltered.map((station) => (
            <Marker key={station.id} position={station.position}>
              <Popup>
                <div>{station.address}</div>
                <div>
                  Available bikes:{' '}
                  <b>
                    {station.available}/{station.total} {'('}
                    {((station.available / station.total) * 100).toFixed(2)}%
                    {')'}
                  </b>
                </div>
                {!station.open && (
                  <div>
                    <b>Station closed</b>
                  </div>
                )}
              </Popup>
            </Marker>
          ))}
      </MapContainer>
      <div
        css={{
          width: '20rem',
          position: 'absolute',
          top: '0',
          right: showSidebar ? '0' : `-20rem`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          zIndex: 1000,
          backgroundColor: 'white', // TODO: change to theme
          padding: '2rem',
          transition: 'right 0.5s',
          borderRadius: '0 0 0 0.5rem',
          '@media (min-width: 1000px)': {
            right: 0,
          },
        }}
      >
        <div
          css={{
            position: 'absolute',
            top: '0',
            left: '-2rem',
            width: '2rem',
            height: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white', // TODO: change to theme
            borderRadius: '0 0 0 0.5rem',
            '@media (min-width: 1000px)': {
              display: 'none',
            },
          }}
          onClick={() => toggleShowSidebar()}
        >
          {showSidebar ? (
            <Button>
              <CloseIcon />
            </Button>
          ) : (
            <Button>
              <MenuOpenIcon />
            </Button>
          )}
        </div>

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
            value={availbleRange}
            onChange={(_event, newValue) => {
              setAvailableRange(newValue as [number, number]);
            }}
            valueLabelDisplay="auto"
            min={0}
            max={maxTotal}
            step={1}
          />
        </div>
      </div>
    </div>
  );
};

function mapValueToColor(value: number): string {
  const hue = value * 120;
  return `hsl(${hue}, 100%, 50%)`;
}

export default Heatmap;
