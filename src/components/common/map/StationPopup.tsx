import React from 'react';
import { Popup } from 'react-leaflet';
import { ValenbiciStation } from 'src/apis/valenbici/types';

const StationPopup = (props: { station: ValenbiciStation }) => {
  const { station } = props;

  return (
    <Popup>
      <div>{station.address}</div>
      <div>
        Available bikes:{' '}
        <b>
          {station.available}/{station.total} {'('}
          {((station.available / station.total) * 100).toFixed(2)}%{')'}
        </b>
      </div>
      {/* TODO: analyze if 'open' field means the station doesn't work */}
      {/* {!station.open && (
        <div>
          <b>Station closed</b>
        </div>
      )} */}
    </Popup>
  );
};

export default StationPopup;
