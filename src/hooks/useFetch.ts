import axios, { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';

export default function useFetch<T>(
  url: string,
  options?: AxiosRequestConfig
): FetchResponse<T> {
  const [response, setResponse] = useState<FetchResponse<T>>({
    data: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get<T>(url, options);
        setResponse({ data: res.data, error: null, loading: false });
      } catch (error) {
        setResponse({ data: null, error, loading: false });
      }
    };

    fetchData();
  }, [url, options]);

  return response;
}

type FetchResponse<T> = {
  data: T | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
  loading: boolean;
};
