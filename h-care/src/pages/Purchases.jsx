import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const PURCHASES_KEY = 'hc_purchases';

function loadPurchases() {
  try {
    return JSON.parse(localStorage.getItem(PURCHASES_KEY) || '[]');
  } catch (e) { return []; }
}

const Purchases = () => {
  const [purchases, setPurchases] = useState(loadPurchases());

  useEffect(() => {
    const handler = () => setPurchases(loadPurchases());
    window.addEventListener('hc_purchases_updated', handler);
    return () => window.removeEventListener('hc_purchases_updated', handler);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Previous Purchases</h1>
        <Link to="/profile" className="text-sm text-gray-300">Back</Link>
      </header>

      <div className="mb-4">
        <input placeholder="Search..." className="w-full p-2 rounded bg-gray-800 text-white" />
      </div>

      <div className="mb-4 flex gap-3">
        <button className="px-3 py-2 bg-gray-800 rounded">Sort</button>
        <button className="px-3 py-2 bg-gray-800 rounded">Filter</button>
        <button className="px-3 py-2 bg-gray-800 rounded">Group by</button>
      </div>

      {purchases.length === 0 ? (
        <div className="bg-gray-800 rounded-lg p-6 text-center">No purchases yet.</div>
      ) : (
        <div className="space-y-4">
          {purchases.map((p, i) => (
            <div key={i} className="bg-gray-800 p-4 rounded flex gap-4 items-center">
              <div className="w-24 h-24 bg-white/5 flex items-center justify-center">
                {p.image ? <img src={p.image} alt={p.title} className="max-h-20" /> : 'Image'}
              </div>
              <div className="flex-1">
                <div className="font-semibold">{p.title}</div>
                <div className="text-sm text-gray-300">₹{p.price} • {p.category}</div>
                <div className="text-sm text-gray-400">Seller: {p.seller || 'N/A'}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Purchases;
