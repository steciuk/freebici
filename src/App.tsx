import axios from 'axios';
import { lazy, Suspense, useCallback, useReducer, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { recordToStation } from 'src/apis/valenbici/convertRecordToStation';
import { ValenbiciResponse, ValenbiciState } from 'src/apis/valenbici/types';
import { VALENBICI_URL } from 'src/apis/valenbici/url';
import Loader from 'src/components/common/Loader';
import Navbar from 'src/components/main/Navbar';
import { historicDataReducer } from 'src/pages/Historic/historicDataReducer';
import HistoricGuard from 'src/pages/Historic/HistoricGuard';
import Home from 'src/pages/Home';

const Historic = lazy(() => import('src/pages/Historic/Historic'));
const Finder = lazy(() => import('src/pages/Finder/Finder'));
const Heatmap = lazy(() => import('src/pages/Heatmap'));

export function App() {
  const [valenbici, setValenbici] = useState<ValenbiciState>({
    stations: [],
    loading: false,
    error: null,
    lastUpdate: null,
  });
  const [navigatedToHistoric, setNavigatedToHistoric] =
    useState<boolean>(false);

  const [historicValenbiciData, dispachHistoricValenbiciData] = useReducer(
    historicDataReducer,
    {
      loading: false,
      errors: [],
      data: null,
    }
  );

  const handleNavigateToHistoric = () => {
    setNavigatedToHistoric(true);
  };

  const handleGetValenbici = useCallback(
    (force = false) => {
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
          console.error(error);
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
          overflow: 'auto',
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
          <Route
            element={
              <HistoricGuard
                navigatedToHistoric={navigatedToHistoric}
                handleNavigateToHistoric={handleNavigateToHistoric}
              />
            }
          >
            <Route
              path="/history"
              element={
                <Suspense fallback={<Loader />}>
                  <Historic
                    historicData={historicValenbiciData}
                    dispatchHistoricData={dispachHistoricValenbiciData}
                  />
                </Suspense>
              }
            />
          </Route>
          <Route
            path="/finder"
            element={
              <Finder valenbici={valenbici} getValenbici={handleGetValenbici} />
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
