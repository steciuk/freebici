import {
  HistoricValenbiciStation,
  StaticValenbiciData,
} from 'src/apis/historic/types';
import { ValenbiciStation } from 'src/apis/valenbici/types';

export function historicToStation(
  historicStations: HistoricValenbiciStation[],
  staticData: StaticValenbiciData
): ValenbiciStation[] {
  return historicStations.map((dynamicData) => {
    const stationStaticData = staticData[dynamicData.id];

    return {
      id: dynamicData.id,
      address: stationStaticData.address,
      total: dynamicData.total,
      available: dynamicData.available,
      open: dynamicData.open,
      position: stationStaticData.position,
    };
  });
}
