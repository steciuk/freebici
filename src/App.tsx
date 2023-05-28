import useValenbici, {
  UseValenbiciResponse,
} from 'src/apis/valenbici/useValenbici';
import Navbar from 'src/components/main/Navbar';
import Heatmap from 'src/pages/Heatmap';

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
        <Heatmap valenbici={valenbici} />
      </main>
    </div>
  );
}

export default App;
