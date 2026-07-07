import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { venues } from '../data/venues';
import Navbar from '../components/Navbar';

const AMENITIES = [
  { label: 'Bar & Drinks', items: ['Full bar setup', 'Cocktail service', 'BYOB option available', 'Beer & wine included in minimum'] },
  { label: 'Space & Setup', items: ['Tables & chairs provided', 'Lounge seating', 'Standing room available', 'Dance floor'] },
  { label: 'AV & Music', items: ['Bluetooth speaker', 'DJ booth available', 'Aux input', 'Microphone on request'] },
  { label: 'Policies', items: ['No outside catering without approval', 'ID required at door', 'Noise ordinance after 2am', 'Security deposit may apply'] },
];

export default function VenueDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const venue = venues.find(v => v.id === Number(id));

  const [form, setForm] = useState({ name: '', email: '', phone: '', date: '', guests: '', occasion: '', notes: '' });
  const [submitted, setSubmitted] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [showFullAbout, setShowFullAbout] = useState(false);

  if (!venue) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Venue not found.</p>
          <button onClick={() => navigate('/')} className="text-sm underline text-gray-900">Back to venues</button>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const aboutText = `${venue.name} is one of NYC's premier private event spaces in ${venue.neighborhood}. With a capacity of up to ${venue.capacity} guests and a ${venue.setting.toLowerCase()} setting, it's ideal for birthdays, corporate gatherings, bachelorette parties, and celebrations of all kinds. The space features a full bar with a $${venue.minSpend.toLocaleString()} minimum spend and an estimated cost of ~$${venue.perPerson} per person. ${venue.bookingFee === 0 ? "Best of all, there's no booking fee to reserve your date." : `A $${venue.bookingFee.toLocaleString()} booking fee applies.`} Our team will confirm your request within 24 hours and walk you through everything you need to make your event unforgettable.`;

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 pt-8 pb-16">

        {/* Back + Title */}
        <button onClick={() => navigate('/')} className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 mb-4 transition-colors whitespace-nowrap">
          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to venues
        </button>

        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{venue.name}</h1>
            <p className="text-gray-500 text-sm mt-1">{venue.neighborhood}, New York, NY · {venue.setting} · Up to {venue.capacity} guests</p>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <button className="flex items-center gap-1.5 hover:text-gray-900 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
              Share
            </button>
            <button className="flex items-center gap-1.5 hover:text-gray-900 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
              Save
            </button>
          </div>
        </div>

        {/* Photo grid */}
        <div className="flex gap-2 rounded-xl overflow-hidden mb-10" style={{ height: '340px' }}>
          <div className="w-1/2 shrink-0 overflow-hidden">
            <img src={venue.image} alt={venue.name} className="w-full h-full object-cover" />
          </div>
          <div className="w-1/2 grid grid-cols-2 grid-rows-2 gap-2">
            {[
              'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=400&q=80',
              'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=400&q=80',
              'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=400&q=80',
              'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=400&q=80',
            ].map((src, i) => (
              <div key={i} className="relative overflow-hidden">
                <img src={src} alt="" className="w-full h-full object-cover" />
                {i === 3 && (
                  <button className="absolute bottom-2 right-2 bg-white text-gray-900 text-xs font-semibold px-2.5 py-1 rounded-full shadow">
                    View all
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">

          {/* Left: 3/5 */}
          <div className="md:col-span-3 space-y-8">

            {/* Rating + badges */}
            <div className="flex items-center justify-between pb-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="flex">
                  {[1,2,3,4,5].map(i => (
                    <svg key={i} className={`w-4 h-4 ${i <= Math.round(venue.rating) ? 'text-yellow-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm font-semibold text-gray-900">{venue.rating}</span>
                <span className="text-sm text-gray-400">({venue.reviews} reviews)</span>
              </div>
              <div className="flex gap-2">
                {venue.bookingFee === 0 && <span className="bg-lime-50 text-lime-700 text-xs font-semibold px-3 py-1 rounded-full">No booking fee</span>}
                <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full">{venue.type}</span>
              </div>
            </div>

            {/* Pricing stats */}
            <div className="grid grid-cols-3 gap-4 pb-8 border-b border-gray-100">
              {[
                { label: 'Bar minimum', value: `$${venue.minSpend.toLocaleString()}` },
                { label: 'Booking fee', value: venue.bookingFee === 0 ? 'Free' : `$${venue.bookingFee.toLocaleString()}` },
                { label: 'Est. per person', value: `~$${venue.perPerson}` },
              ].map(item => (
                <div key={item.label}>
                  <p className="text-xs text-gray-400 mb-1">{item.label}</p>
                  <p className="text-xl font-bold text-gray-900">{item.value}</p>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="pb-8 border-b border-gray-100">
              <h2 className="text-base font-semibold text-gray-900 mb-3">What to expect</h2>
              <div className="flex flex-wrap gap-2">
                {venue.tags.map(tag => (
                  <span key={tag} className="border border-gray-200 text-gray-600 text-sm px-4 py-1.5 rounded-full">{tag}</span>
                ))}
              </div>
            </div>

            {/* About */}
            <div className="pb-8 border-b border-gray-100">
              <h2 className="text-base font-semibold text-gray-900 mb-3">About this venue</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                {showFullAbout ? aboutText : aboutText.slice(0, 200) + '...'}
              </p>
              <button onClick={() => setShowFullAbout(!showFullAbout)} className="text-sm font-semibold text-gray-900 underline mt-2">
                {showFullAbout ? 'Show less' : 'Read more'}
              </button>
            </div>

            {/* Amenity accordions */}
            <div>
              <h2 className="text-base font-semibold text-gray-900 mb-4">Amenities & policies</h2>
              <div className="space-y-0 divide-y divide-gray-100">
                {AMENITIES.map(section => (
                  <div key={section.label}>
                    <button
                      onClick={() => setExpanded(expanded === section.label ? null : section.label)}
                      className="w-full flex items-center justify-between py-4 text-left"
                    >
                      <span className="text-sm font-medium text-gray-800">{section.label}</span>
                      <svg className={`w-4 h-4 shrink-0 text-gray-400 transition-transform ${expanded === section.label ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {expanded === section.label && (
                      <ul className="pb-4 space-y-2 pl-1">
                        {section.items.map(item => (
                          <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                            <svg className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: booking panel */}
          <div className="md:col-span-2">
            <div className="border border-gray-200 rounded-2xl shadow-lg overflow-hidden sticky top-24">
              {submitted ? (
                <div className="p-8 text-center">
                  <div className="w-14 h-14 bg-lime-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-7 h-7 text-lime-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Request sent!</h3>
                  <p className="text-gray-500 text-sm mb-6">The venue will confirm within 24 hours. Check your email for next steps.</p>
                  <button onClick={() => navigate('/')} className="text-sm font-semibold text-gray-900 underline">Browse more venues</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="p-6 space-y-3">
                    <div className="flex items-baseline justify-between mb-1">
                      <span className="text-lg font-bold text-gray-900">${venue.minSpend.toLocaleString()}</span>
                      <span className="text-sm text-gray-400">bar minimum</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Your name</label>
                        <input required type="text" placeholder="Jane Smith" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                          className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Phone</label>
                        <input type="tel" placeholder="(212) 000-0000" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                          className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Email</label>
                      <input required type="email" placeholder="jane@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                        className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900" />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Date</label>
                        <input required type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })}
                          className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Guests</label>
                        <input required type="number" placeholder={`Max ${venue.capacity}`} min={1} max={venue.capacity} value={form.guests} onChange={e => setForm({ ...form, guests: e.target.value })}
                          className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Occasion</label>
                      <select required value={form.occasion} onChange={e => setForm({ ...form, occasion: e.target.value })}
                        className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900">
                        <option value="">Select an occasion</option>
                        <option>Birthday</option>
                        <option>Corporate event</option>
                        <option>Bachelor/Bachelorette</option>
                        <option>Holiday party</option>
                        <option>Graduation</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Notes <span className="text-gray-300">(optional)</span></label>
                      <textarea placeholder="Any special requests..." rows={2} value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })}
                        className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 resize-none" />
                    </div>

                    <button type="submit" className="w-full bg-gray-900 text-white font-semibold py-3.5 rounded-xl hover:bg-gray-700 transition-colors text-sm mt-1">
                      Request this venue
                    </button>

                    <p className="text-xs text-center text-gray-400">You won't be charged yet</p>
                  </div>

                  {/* Trust signals */}
                  <div className="border-t border-gray-100 px-6 py-4 bg-gray-50 space-y-2">
                    {[
                      { icon: '⚡', text: 'Confirmed within 24 hours' },
                      { icon: '🔒', text: 'No payment required to request' },
                      { icon: '✓', text: 'Free to use · No hidden fees' },
                    ].map(item => (
                      <div key={item.text} className="flex items-center gap-2 text-xs text-gray-500">
                        <span>{item.icon}</span>
                        <span>{item.text}</span>
                      </div>
                    ))}
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
