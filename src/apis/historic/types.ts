export type HistoricValenbiciData = {
  [date: string]: {
    [time: string]: HistoricValenbiciStation[];
  };
};

export type HistoricValenbiciStation = {
  id: string;
  open: boolean;
  total: number;
  available: number;
};

export type StaticValenbiciData = {
  [id: string]: {
    address: string;
    position: [number, number];
  };
};
