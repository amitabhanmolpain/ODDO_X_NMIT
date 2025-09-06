import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const LISTINGS_KEY = 'hc_listings';

function loadListings() {
  try {
    return JSON.parse(localStorage.getItem(LISTINGS_KEY) || '[]');
  } catch (e) { return []; }
}

const MyListings = () => {
  const [listings, setListings] = useState(loadListings());

  useEffect(() => {
    const handler = () => setListings(loadListings());
    window.addEventListener('hc_listings_updated', handler);
    return () => window.removeEventListener('hc_listings_updated', handler);
  }, []);

  const myEmail = (() => {
    try {
      const s = localStorage.getItem('hc_session');
      return s ? JSON.parse(s).email : null;
    } catch (e) { return null; }
  })();

  const mine = listings.filter(l => l.seller === myEmail);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">My Listings</h1>
        <Link to="/profile" className="text-sm text-gray-300">Back</Link>
      </header>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Add new listing card */}
        <Link to="/add-listing" className="bg-gray-800 rounded-lg p-6 flex flex-col items-center justify-center hover:bg-gray-700 no-underline text-white">
          <div className="w-20 h-20 rounded-full bg-green-600 flex items-center justify-center text-2xl font-bold">+</div>
          <div className="mt-3 text-sm">Add new listing</div>
        </Link>

        {mine.length === 0 ? (
          <div className="col-span-2 bg-gray-800 rounded-lg p-6 text-center">
            <p className="mb-4">You have not added any listings yet.</p>
            <Link to="/add-listing" className="px-4 py-2 bg-green-600 rounded">Add your item</Link>
          </div>
        ) : (
          mine.map((l, i) => (
            <div key={i} className="bg-gray-800 p-4 rounded flex gap-4 items-center">
              <div className="w-24 h-24 bg-white/5 flex items-center justify-center">
                {l.image ? <img src={l.image} className="max-h-20" alt={l.title} /> : 'Image'}
              </div>
              <div className="flex-1">
                <div className="font-semibold">{l.title}</div>
                <div className="text-sm text-gray-300">₹{l.price} • {l.category} • {l.status || 'Available'}</div>
              </div>
            </div>
          ))
        )}
        </div>
      </div>
    </div>
  );
};

export default MyListings;
