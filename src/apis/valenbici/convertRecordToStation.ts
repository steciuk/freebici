import { ValenbiciRecord, ValenbiciStation } from 'src/apis/valenbici/types';

export function recordToStation(record: ValenbiciRecord): ValenbiciStation {
  return {
    id: record.fields.number.toString(),
    address: record.fields.address,
    total: record.fields.total,
    available: record.fields.available,
    open: record.fields.open === 'T',
    position: [record.geometry.coordinates[1], record.geometry.coordinates[0]],
  };
}
