const host = window.location.host;
const isDev = import.meta.env.DEV;

export const STATIC_URL =
  host + isDev
    ? '/src/assets/data/valenbici_static.json'
    : '/assets/data/valenbici_static.json';
export const HISTORIC_URL =
  host + isDev
    ? '/src/assets/data/valenbici_historic.json'
    : '/assets/data/valenbici_historic.json';
