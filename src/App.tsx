import axios from 'axios';
import { useCallback, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ValenbiciResponse, ValenbiciState } from 'src/apis/valenbici/types';
import { VALENBICI_URL } from 'src/apis/valenbici/url';
import { recordToStation } from 'src/apis/valenbici/utils';
import Navbar from 'src/components/main/Navbar';
import Finder from 'src/pages/Finder';
import Heatmap from 'src/pages/Heatmap';
import Historic from 'src/pages/Historic';
import Home from 'src/pages/Home';

export function App() {
  const [valenbici, setValenbici] = useState<ValenbiciState>({
    stations: [],
    loading: false,
    error: null,
    lastUpdate: null,
  });

  const handleGetValenbici = useCallback(
    async (force = false) => {
      if (!force && valenbici.lastUpdate !== null) return;

      const fetchData = async () => {
        try {
          const res = await axios.get<ValenbiciResponse>(VALENBICI_URL);
          const stations = res.data.records.map(recordToStation);
          setValenbici({
            stations,
            loading: false,
            error: null,
            lastUpdate: new Date(),
          });
        } catch (error) {
          setValenbici((prev) => ({
            stations: prev.stations,
            loading: false,
            error,
            lastUpdate: prev.lastUpdate,
          }));
        }
      };

      setValenbici((prev) => ({
        stations: prev.stations,
        loading: true,
        error: null,
        lastUpdate: prev.lastUpdate,
      }));

      fetchData();
    },
    [valenbici.lastUpdate]
  );

  return (
    <div
      css={{
        height: '100svh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Navbar />
      <main
        css={{
          flexGrow: 1,
        }}
      >
        <Routes>
          <Route index element={<Home />} />
          <Route
            path="/heatmap"
            element={
              <Heatmap
                valenbici={valenbici}
                getValenbici={handleGetValenbici}
              />
            }
          />
          <Route path="/historic" element={<Historic />} />
          <Route path="/finder" element={<Finder />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
