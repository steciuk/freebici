export type NominatimResponse = NominatimResult[];

export type NominatimResult = {
  boundingbox: [string, string, string, string];
  class: string;
  display_name: string;
  importance: number;
  lat: string;
  licence: string;
  lon: string;
  osm_id: number;
  osm_type: string;
  place_id: number;
  type: string;
};

export type NominatimAddress = Omit<NominatimResult, 'lat' | 'lon'> & {
  position: [number, number];
};
