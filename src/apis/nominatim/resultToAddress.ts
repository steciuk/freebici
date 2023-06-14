import { NominatimResult, NominatimAddress } from 'src/apis/nominatim/types';

export function resultToAddress(result: NominatimResult): NominatimAddress {
  return {
    ...result,
    position: [parseFloat(result.lat), parseFloat(result.lon)],
  };
}
