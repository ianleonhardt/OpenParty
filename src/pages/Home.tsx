import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import VenueCard from '../components/VenueCard';
import { venues } from '../data/venues';

const NEIGHBORHOODS = ['All', 'Flatiron', 'West Village', 'Chelsea', 'Lower East Side', 'Meatpacking', 'Midtown', 'Brooklyn'];
const TYPES = ['All', 'Bar', 'Rooftop', 'Restaurant', 'Club', 'Lounge'];
const SETTINGS = ['All', 'Indoor', 'Outdoor', 'Indoor + Outdoor'];
const SIZES = [
  { label: 'Any size', max: Infinity },
  { label: 'Up to 40', max: 40 },
  { label: 'Up to 75', max: 75 },
  { label: 'Up to 150', max: 150 },
  { label: '150+', max: Infinity, min: 150 },
];

export default function Home() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [neighborhood, setNeighborhood] = useState('All');
  const [type, setType] = useState('All');
  const [setting, setSetting] = useState('All');
  const [sizeIndex, setSizeIndex] = useState(0);
  const [maxBudget, setMaxBudget] = useState(5000);
  const [sortBy, setSortBy] = useState<'rating' | 'minSpend' | 'capacity'>('rating');

  const filtered = useMemo(() => {
    return venues
      .filter(v => {
        const q = search.toLowerCase();
        if (q && !v.name.toLowerCase().includes(q) && !v.neighborhood.toLowerCase().includes(q) && !v.tags.some(t => t.toLowerCase().includes(q))) return false;
        if (neighborhood !== 'All' && v.neighborhood !== neighborhood) return false;
        if (type !== 'All' && v.type !== type) return false;
        if (setting !== 'All' && v.setting !== setting) return false;
        if (v.minSpend > maxBudget) return false;
        const size = SIZES[sizeIndex];
        if (size.max !== Infinity && v.capacity > size.max) return false;
        if ((size as { min?: number }).min && v.capacity < ((size as { min?: number }).min ?? 0)) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'minSpend') return a.minSpend - b.minSpend;
        return b.capacity - a.capacity;
      });
  }, [search, neighborhood, type, setting, sizeIndex, maxBudget, sortBy]);

  const clearFilters = () => {
    setSearch('');
    setNeighborhood('All');
    setType('All');
    setSetting('All');
    setSizeIndex(0);
    setMaxBudget(5000);
  };

  const hasFilters = search || neighborhood !== 'All' || type !== 'All' || setting !== 'All' || sizeIndex !== 0;

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />

      {/* Hero */}
      <div className="bg-gray-900 text-white py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-lime-400 text-gray-900 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 bg-gray-900 rounded-full"></span>
            84 venues live in NYC
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 leading-tight">
            Book the bar.<br />Skip the email chain.
          </h1>
          <p className="text-gray-400 text-lg mb-8">
            Real pricing, minimums, booking fees and capacity for NYC's best party spots.
          </p>
          <div className="relative max-w-xl mx-auto">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search venues, neighborhoods, vibes..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-white text-gray-900 placeholder-gray-400 pl-12 pr-4 py-4 rounded-2xl text-base shadow-lg focus:outline-none focus:ring-2 focus:ring-lime-400"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {['Birthday', 'Rooftops', 'Brooklyn', 'Lower East Side', 'Lounge'].map(tag => (
              <button key={tag} onClick={() => setSearch(tag)} className="bg-white/10 hover:bg-white/20 text-white text-sm px-4 py-1.5 rounded-full transition-colors">
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filters bar */}
      <div className="bg-white border-b border-gray-100 sticky top-16 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-3 flex flex-wrap items-center gap-3">
          <select value={neighborhood} onChange={e => setNeighborhood(e.target.value)} className="text-sm border border-gray-200 rounded-full px-4 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900 cursor-pointer">
            {NEIGHBORHOODS.map(n => <option key={n}>{n}</option>)}
          </select>
          <select value={type} onChange={e => setType(e.target.value)} className="text-sm border border-gray-200 rounded-full px-4 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900 cursor-pointer">
            {TYPES.map(t => <option key={t}>{t}</option>)}
          </select>
          <select value={setting} onChange={e => setSetting(e.target.value)} className="text-sm border border-gray-200 rounded-full px-4 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900 cursor-pointer">
            {SETTINGS.map(s => <option key={s}>{s}</option>)}
          </select>
          <select value={sizeIndex} onChange={e => setSizeIndex(Number(e.target.value))} className="text-sm border border-gray-200 rounded-full px-4 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900 cursor-pointer">
            {SIZES.map((s, i) => <option key={s.label} value={i}>{s.label}</option>)}
          </select>
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-sm text-gray-500">Budget up to <span className="font-semibold text-gray-800">${maxBudget.toLocaleString()}</span></span>
            <input type="range" min={500} max={5000} step={250} value={maxBudget} onChange={e => setMaxBudget(Number(e.target.value))} className="w-28 accent-gray-900" />
          </div>
          <div className="flex items-center gap-2 border-l border-gray-200 pl-3">
            <span className="text-sm text-gray-500">Sort:</span>
            <select value={sortBy} onChange={e => setSortBy(e.target.value as typeof sortBy)} className="text-sm border border-gray-200 rounded-full px-3 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900 cursor-pointer">
              <option value="rating">Top rated</option>
              <option value="minSpend">Lowest minimum</option>
              <option value="capacity">Largest capacity</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">{filtered.length} venue{filtered.length !== 1 ? 's' : ''} available</h2>
          {hasFilters && <button onClick={clearFilters} className="text-sm text-gray-500 hover:text-gray-900 underline">Clear filters</button>}
        </div>
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-gray-400 text-lg">No venues match your filters.</p>
            <button onClick={clearFilters} className="mt-4 text-sm text-gray-900 underline">Clear all filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(venue => (
              <VenueCard key={venue.id} venue={venue} onClick={() => navigate(`/venues/${venue.id}`)} />
            ))}
          </div>
        )}
      </div>

      <footer className="border-t border-gray-100 mt-16 py-8 px-6 text-center text-sm text-gray-400">
        <p>© 2025 OpenParty · NYC · <a href="#" className="hover:text-gray-600">Terms</a> · <a href="#" className="hover:text-gray-600">Privacy</a></p>
      </footer>
    </div>
  );
}
