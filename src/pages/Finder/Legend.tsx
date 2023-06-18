import React from 'react';
import { markerColorMap } from 'src/components/common/map/LeafletMarker';
import {
  CYCLING_STYLES,
  WALKING_STYLES,
} from 'src/components/common/map/RoutingMachine';
import {
  RoutingMarkerType,
  routingMarkerTypeColorMap,
  routingMarkerTypes,
} from 'src/pages/Finder/MapRouting';

const markerLegendLabels: { [key in RoutingMarkerType]: string } = {
  station: 'Valenbisi station',
  origin: 'Origin',
  destination: 'Destination',
  unavailable: 'Station that would be better but is unavailable',
};

const Legend = () => {
  return (
    <div
      css={{
        position: 'absolute',
        bottom: '17px',
        right: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        zIndex: 1000,
        fontSize: '0.6rem',
        width: '150px',
        padding: '0.5rem',
        borderRadius: '5px 0 0 0',
      }}
    >
      <div
        css={{
          '& .legend-path-display': {
            width: '50px',
            height: '8px',
            borderRadius: '5px',
            display: 'inline-block',
            marginRight: '0.5rem',
          },
        }}
      >
        <div>
          <div
            className="legend-path-display"
            css={{
              backgroundColor: CYCLING_STYLES.color,
              opacity: CYCLING_STYLES.opacity,
            }}
          />
          <span>Cycling path</span>
        </div>
        <div>
          <div
            className="legend-path-display"
            css={{
              backgroundColor: WALKING_STYLES.color,
              opacity: WALKING_STYLES.opacity,
            }}
          />
          <span>Walking path</span>
        </div>
        {routingMarkerTypes.map((type) => (
          <div
            key={type}
            css={{
              height: '20px',
              display: 'flex',
            }}
          >
            <img
              css={{ marginRight: '0.5rem', maxHeight: '100%' }}
              src={markerTypeToImgSrc(type)}
              alt={markerLegendLabels[type]}
            />
            <div
              css={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <span>{markerLegendLabels[type]}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

function markerTypeToImgSrc(markerType: RoutingMarkerType): string {
  return markerColorMap[routingMarkerTypeColorMap[markerType]];
}
export default Legend;
