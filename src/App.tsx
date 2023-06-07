import { Route, Routes } from 'react-router-dom';
import Navbar from 'src/components/main/Navbar';
import useValenbici, {
  UseValenbiciResponse,
} from 'src/hooks/valenbici/useValenbici';
import Finder from 'src/pages/Finder';
import Heatmap from 'src/pages/Heatmap';
import Historic from 'src/pages/Historic';
import Home from 'src/pages/Home';

export function App() {
  const valenbici: UseValenbiciResponse = useValenbici();

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
          <Route path="/heatmap" element={<Heatmap valenbici={valenbici} />} />
          <Route path="/historic" element={<Historic />} />
          <Route path="/finder" element={<Finder />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
