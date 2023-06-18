import React from 'react';
import { Popup } from 'react-leaflet';

const FinderPopup = (props: {
  name: string;
  type: 'origin' | 'destination';
}) => {
  return (
    <Popup>
      <div>{props.type === 'origin' ? <b>Origin</b> : <b>Destination</b>}</div>
      <div>{props.name.split(',')[0]}</div>
    </Popup>
  );
};

export default FinderPopup;
