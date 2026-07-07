import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import VenueDetail from './pages/VenueDetail';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/venues/:id" element={<VenueDetail />} />
    </Routes>
  );
}
