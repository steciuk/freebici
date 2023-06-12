import dayjs, { Dayjs } from 'dayjs';
import React, { useEffect, useMemo, useState } from 'react';
import { ValenbiciStation } from 'src/apis/valenbici/types';
import historicJson from 'src/assets/data/valenbici_historic.json';
import staticJson from 'src/assets/data/valenbici_static.json';
import LeafletMap from 'src/components/common/map/LeafletMap';
import Voronoi from 'src/components/common/map/Voronoi';
import Sidebar from 'src/components/common/Sidebar';
import useToggle from 'src/hooks/util/useToggle';
import { historicToStation } from 'src/pages/Historic/historicToStation';
import {
  HistoricValenbiciData,
  StaticValenbiciData,
} from 'src/pages/Historic/types';

import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { Button, Slider } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const EARLIEST = {
  date: '2022-12-01',
  time: '02:00',
};

const LATEST = {
  date: '2023-06-07',
  time: '23:00',
};

const animationSpeedMarks = [
  {
    value: 0.5,
    label: '0.5x',
  },
  {
    value: 1,
    label: '1x',
  },
  {
    value: 2,
    label: '2x',
  },
  {
    value: 5,
    label: '5x',
  },
];

const Historic = () => {
  const [historicValenbiciData] = useState<HistoricValenbiciData>(
    historicJson as unknown as HistoricValenbiciData
  );
  const [staticValenbiciData] = useState<StaticValenbiciData>(
    staticJson as unknown as StaticValenbiciData
  );

  const [stations, setStations] = useState<ValenbiciStation[]>([]);
  const [dateTime, setDateTime] = useState<{
    date: string;
    time: string;
  }>({
    date: EARLIEST.date,
    time: EARLIEST.time,
  });
  const { date, time } = useMemo(() => dateTime, [dateTime]);
  const [animationPlaying, toggleAnimationPlaying] = useToggle(false);
  const [animationSpeed, setAnimationSpeed] = useState<number>(1);

  const handleDateTimeChange = (event: Dayjs | null) => {
    if (event === null) return;
    const newDate = event.format('YYYY-MM-DD');
    const newTime = event.format('HH:mm');

    setDateTime({
      date: newDate,
      time: newTime,
    });
  };

  useEffect(() => {
    if (historicValenbiciData === null || staticValenbiciData === null) return;

    const newStations = historicToStation(
      historicValenbiciData[date][time],
      staticValenbiciData
    );
    setStations(newStations);
  }, [historicValenbiciData, staticValenbiciData, date, time]);

  useEffect(() => {
    if (!animationPlaying) return;
    console.log('animation playing');

    const interval = playAnimation(setDateTime, animationSpeed);

    return () => {
      clearInterval(interval);
    };
  }, [animationPlaying, animationSpeed]);

  return (
    <div
      css={{
        width: '100%',
        height: '100%',
        position: 'relative',
      }}
    >
      <LeafletMap>
        <Voronoi stations={stations} invertColors={false} selectable />
      </LeafletMap>
      {stations.length === 0 && (
        <div
          css={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1000,
            padding: '1rem',
            backgroundColor: 'white',
          }}
        >
          No data available for this date and time
        </div>
      )}
      <Sidebar>
        <DateTimePicker
          value={dateJs(date, time)}
          onChange={handleDateTimeChange}
          minDateTime={dateJs(EARLIEST.date, EARLIEST.time)}
          maxDateTime={dateJs(LATEST.date, LATEST.time)}
          disabled={animationPlaying}
          format="DD/MM/YYYY HH:mm"
          ampm={false}
          views={['year', 'month', 'day', 'hours']}
        />
        <Button
          css={{
            margin: '1rem 0',
          }}
          variant="contained"
          onClick={() => toggleAnimationPlaying()}
        >
          {animationPlaying ? (
            <PauseCircleIcon fontSize="large" />
          ) : (
            <PlayCircleIcon fontSize="large" />
          )}
        </Button>
        <div>Animation speed</div>
        <Slider
          value={animationSpeed}
          onChange={(event, newValue) => setAnimationSpeed(newValue as number)}
          step={null}
          min={0.5}
          max={5}
          marks={animationSpeedMarks}
          valueLabelDisplay="off"
        />
      </Sidebar>
    </div>
  );
};

function dateJs(date: string, time: string): Dayjs {
  return dayjs(`${date}T${time}`, 'YYYY-MM-DDTHH:mm');
}

function playAnimation(
  setDateTime: React.Dispatch<
    React.SetStateAction<{
      date: string;
      time: string;
    }>
  >,
  speed: number
): NodeJS.Timer {
  console.log('new interval');
  const interval = setInterval(() => {
    setDateTime((dateTime) => {
      const current = dateJs(dateTime.date, dateTime.time);
      const next = current.add(1, 'hour');
      return {
        date: next.format('YYYY-MM-DD'),
        time: next.format('HH:mm'),
      };
    });
  }, 1000 / speed);

  return interval;
}

export default Historic;
