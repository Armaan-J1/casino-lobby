import { Layout } from './Components/Layout';
import { HomePage } from './pages/HomePage';

function App() {
  return (
    <Layout title="Casino Lobby" subtitle="Browse our games">
      <HomePage />
    </Layout>
  );
}

export default App;