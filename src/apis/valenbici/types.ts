export type ValenbiciResponse = {
  nhits: number;
  parameters: ValenbiciParameters;
  records: ValenbiciRecord[];
};

type ValenbiciParameters = {
  dataset: string;
  rows: number;
  start: number;
  format: string;
  timezone: string;
};

export type ValenbiciRecord = {
  datasetid: string;
  recordid: string;
  fields: ValenbiciFields;
  geometry: Geometry;
  record_timestamp: string;
};

type ValenbiciFields = {
  ticket: string;
  updated_at: string;
  geo_point_2d: [number, number];
  open: string;
  total: number;
  number: number;
  free: number;
  available: number;
  address: string;
  geo_shape: {
    type: string;
    coordinates: [number, number];
  };
};

export type Geometry = {
  type: string;
  coordinates: [number, number];
};

export type ValenbiciStation = {
  id: string;
  address: string;
  total: number;
  free: number;
  available: number;
  open: boolean;
  position: [number, number];
};
