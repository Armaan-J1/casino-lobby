import { Layout } from './Components/Layout';
import { HomePage } from './pages/HomePage';

function App() {
  return (
    <Layout title="Lucky 7 Lobby" subtitle="Your next winning game awaits">
      <HomePage />
    </Layout>
  );
}

export default App;