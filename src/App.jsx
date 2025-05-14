import { Container } from 'react-bootstrap';
import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Forecasts from './pages/Forecasts';
import Logs from './pages/Logs';

function App() {
  return (
    <>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/forecasts" element={<Forecasts />} />
          <Route path="/logs" element={<Logs />} />
        </Routes>
    </>
  );
}

export default App;
