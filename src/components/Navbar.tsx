export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight text-gray-900">Open<span className="text-lime-500">Party</span></span>
          <span className="text-xs text-gray-400 font-medium mt-0.5">· NYC</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <a href="#" className="hover:text-gray-900 transition-colors">Venues</a>
          <a href="#" className="hover:text-gray-900 transition-colors">How it works</a>
          <a href="#" className="hover:text-gray-900 transition-colors">For venues</a>
        </div>
        <div className="flex items-center gap-3">
          <button className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Log in</button>
          <button className="bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-gray-700 transition-colors">
            Find a venue
          </button>
        </div>
      </div>
    </nav>
  );
}
