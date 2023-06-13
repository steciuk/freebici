import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { Button } from '@mui/material';

const HistoricGuard = (props: {
  navigatedToHistoric: boolean;
  handleNavigateToHistoric: () => void;
}) => {
  const navigate = useNavigate();

  if (props.navigatedToHistoric) return <Outlet />;

  return (
    <div
      css={{
        width: 'clamp(300px, 80%, 650px)',
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        paddingTop: '2rem',
        textAlign: 'center',
      }}
    >
      <p>
        The <b>Historic</b> page will download more than 80MB of data once
        loaded for the first time.
      </p>
      <p>Are you sure you want to continue?</p>

      <div
        css={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
        }}
      >
        <Button onClick={() => navigate('/')}>Take me back</Button>
        <Button variant="contained" onClick={props.handleNavigateToHistoric}>
          Yes
        </Button>
      </div>
    </div>
  );
};

export default HistoricGuard;
