const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/search';
const VIEW_BOX =
  '-0.5547887154941878,39.41762937499559,-0.29146016324809404,39.519668099708525';

export function getNominatimUrl(query: string): string {
  return `${NOMINATIM_URL}?q=/${query}&format=json&viewbox=${VIEW_BOX}`;
}
