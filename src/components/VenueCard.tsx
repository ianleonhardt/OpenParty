import type { Venue } from '../data/venues';

export default function VenueCard({ venue, onClick }: { venue: Venue; onClick: () => void }) {
  return (
    <div onClick={onClick} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow group cursor-pointer flex flex-col">
      <div className="relative overflow-hidden h-52">
        <img
          src={venue.image}
          alt={venue.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-semibold px-2.5 py-1 rounded-full">
            {venue.type}
          </span>
        </div>
        {venue.bookingFee === 0 && (
          <div className="absolute top-3 right-3">
            <span className="bg-lime-400 text-gray-900 text-xs font-bold px-2.5 py-1 rounded-full">
              No booking fee
            </span>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-semibold text-gray-900 text-base leading-tight">{venue.name}</h3>
          <div className="flex items-center gap-1 shrink-0">
            <span className="text-yellow-400 text-sm">★</span>
            <span className="text-sm font-medium text-gray-700">{venue.rating}</span>
            <span className="text-xs text-gray-400">({venue.reviews})</span>
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-3">{venue.neighborhood} · {venue.setting}</p>

        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-gray-50 rounded-xl p-2.5 text-center">
            <p className="text-xs text-gray-400 mb-0.5">Capacity</p>
            <p className="text-sm font-semibold text-gray-800">Up to {venue.capacity}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-2.5 text-center">
            <p className="text-xs text-gray-400 mb-0.5">Bar min</p>
            <p className="text-sm font-semibold text-gray-800">${venue.minSpend.toLocaleString()}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-2.5 text-center">
            <p className="text-xs text-gray-400 mb-0.5">Per person</p>
            <p className="text-sm font-semibold text-gray-800">~${venue.perPerson}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {venue.tags.slice(0, 2).map(tag => (
            <span key={tag} className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{tag}</span>
          ))}
        </div>

        <button
          onClick={e => { e.stopPropagation(); onClick(); }}
          className="w-full bg-gray-900 text-white text-sm font-medium py-2.5 rounded-xl hover:bg-gray-700 transition-colors mt-auto"
        >
          Request a date
        </button>
      </div>
    </div>
  );
}
