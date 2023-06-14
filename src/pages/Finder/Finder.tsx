import axios from 'axios';
import React, { useRef, useState } from 'react';
import { NominatimAddress } from 'src/apis/nominatim/types';
import LeafletMap from 'src/components/common/map/LeafletMap';
import LeafletMarker from 'src/components/common/map/LeafletMarker';
import Sidebar from 'src/components/common/Sidebar';
import FinderPopup from 'src/pages/Finder/FinderPopup';

import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import { Button, TextField } from '@mui/material';

const tempOrigin: NominatimAddress = {
  place_id: 112631529,
  licence:
    'Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright',
  osm_type: 'way',
  osm_id: 23455523,
  boundingbox: ['39.4720953', '39.475315', '-0.3303295', '-0.3300125'],
  position: [39.4734575, -0.3301289],
  display_name:
    "Carrer de l'Arquebisbe Company, el Cabanyal, el Cabanyal - el Canyamelar, Poblats Marítims, Walencja, Comarca de València, Walencja, Wspólnota Walencka, 46011, Hiszpania",
  class: 'highway',
  type: 'residential',
  importance: 0.30000999999999994,
};

const tempDestination: NominatimAddress = {
  place_id: 308227574,
  licence:
    'Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright',
  osm_type: 'relation',
  osm_id: 3322903,
  boundingbox: ['39.4768357', '39.4848823', '-0.3502001', '-0.333096'],
  position: [39.48084555, -0.34199351963673974],
  display_name:
    'Campus de Vera de la Universitat Politècnica de València, Camí de Vera, la Carrasca, Algirós, Walencja, Comarca de València, Walencja, Wspólnota Walencka, 46022, Hiszpania',
  class: 'amenity',
  type: 'university',
  importance: 0.4389993625797314,
};

const Finder = () => {
  const [originQuery, setOriginQuery] = useState<string>('');
  const [destinationQuery, setDestinationQuery] = useState<string>('');
  const [originResult, setOriginResult] = useState<NominatimAddress | null>(
    null
  );
  const [destinationResult, setDestinationResult] =
    useState<NominatimAddress | null>(null);
  const previousOriginQueryRef = useRef<string>('');
  const previousDestinationQueryRef = useRef<string>('');

  const searchForAddress = () => {
    if (!originQuery || !destinationQuery) return;
    if (
      originQuery === previousOriginQueryRef.current &&
      destinationQuery === previousDestinationQueryRef.current
    )
      return;

    previousOriginQueryRef.current = originQuery;
    previousDestinationQueryRef.current = destinationQuery;

    // const fetchAddress = async () => {
    //   try {
    //     const response = await Promise.all([
    //       axios.get<NominatimResponse>(getNominatimUrl(originQuery)),
    //       axios.get<NominatimResponse>(getNominatimUrl(destinationQuery)),
    //     ]);

    //     const [originResult, destinationResult] = response.map((r) => r.data);
    //     if (originResult.length === 0 && destinationResult.length === 0)
    //       return window.alert('Origin and destination not found');
    //     else if (originResult.length === 0)
    //       return window.alert('Origin not found');
    //     else if (destinationResult.length === 0)
    //       return window.alert('Destination not found');

    //     setOriginResult(resultToAddress(originResult[0]));
    //     setDestinationResult(resultToAddress(destinationResult[0]));
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };

    // fetchAddress();

    setOriginResult(tempOrigin);
    setDestinationResult(tempDestination);
  };

  const handleClear = () => {
    previousDestinationQueryRef.current = '';
    previousOriginQueryRef.current = '';
    setOriginQuery('');
    setDestinationQuery('');
    setOriginResult(null);
    setDestinationResult(null);
  };

  return (
    <div
      css={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <LeafletMap>
        {originResult && destinationResult && (
          <>
            <LeafletMarker position={originResult.position} color="green">
              <FinderPopup name={originResult.display_name} type="origin" />
            </LeafletMarker>
            <LeafletMarker position={destinationResult.position} color="red">
              <FinderPopup
                name={destinationResult.display_name}
                type="destination"
              />
            </LeafletMarker>
          </>
        )}
      </LeafletMap>
      <Sidebar>
        <TextField
          css={{ marginBottom: '1rem', width: '100%' }}
          value={originQuery}
          onChange={(e) => setOriginQuery(e.target.value)}
          label="Origin"
        />
        <TextField
          css={{ marginBottom: '1rem', width: '100%' }}
          value={destinationQuery}
          onChange={(e) => setDestinationQuery(e.target.value)}
          label="Destination"
        />
        <div
          css={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Button
            onClick={() => searchForAddress()}
            variant="contained"
            disabled={!originQuery || !destinationQuery}
          >
            <SearchIcon />
            <span
              css={{
                marginLeft: '0.5rem',
              }}
            >
              Search
            </span>
          </Button>
          <Button onClick={handleClear} variant="contained">
            <ClearIcon />
            <span
              css={{
                marginLeft: '0.5rem',
              }}
            >
              Clear
            </span>
          </Button>
        </div>
      </Sidebar>
    </div>
  );
};

export default Finder;
