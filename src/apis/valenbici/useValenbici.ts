import { useMemo } from 'react';
import { ValenbiciResponse } from 'src/apis/valenbici/types';
import { VALENBICI_URL } from 'src/apis/valenbici/url';
import { recordToStation } from 'src/apis/valenbici/utils';
import useFetch from 'src/hooks/useFetch';

export default function useValenbici() {
  const { data, error, loading } = useFetch<ValenbiciResponse>(VALENBICI_URL);

  const stations = useMemo(() => {
    if (!data) {
      return [];
    }

    return data.records.map(recordToStation);
  }, [data]);

  return [stations, error, loading] as const;
}

export type UseValenbiciResponse = ReturnType<typeof useValenbici>;
