import { ValenbiciRecord, ValenbiciStation } from 'src/apis/valenbici/types';

export function recordToStation(record: ValenbiciRecord): ValenbiciStation {
  return {
    id: record.recordid,
    address: record.fields.address,
    total: record.fields.total,
    free: record.fields.free,
    available: record.fields.available,
    open: record.fields.open === 'T',
    position: record.geometry.coordinates,
  };
}
