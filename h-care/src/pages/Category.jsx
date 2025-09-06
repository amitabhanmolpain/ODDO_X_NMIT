import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import products from '../constants/products';

const Category = () => {
  const { name } = useParams();
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!name) return;
    const matched = products.filter(p => (p.category || '').toLowerCase() === decodeURIComponent(name).toLowerCase());
    // If no exact matches, try substring match
    let results = matched;
    if (results.length === 0) {
      results = products.filter(p => (p.category || '').toLowerCase().includes(decodeURIComponent(name).toLowerCase()));
    }
    setItems(results.slice(0, 10));
  }, [name]);

  const addToCart = (p) => {
    try {
      const raw = localStorage.getItem('hc_cart') || '[]';
      const cart = JSON.parse(raw);
      cart.push(p);
      localStorage.setItem('hc_cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('hc_cart_updated'));
      window.dispatchEvent(new CustomEvent('hc_toast', { detail: `${p.title} added to cart` }));
    } catch (e) {
      // ignore
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <header className="max-w-6xl mx-auto mb-6">
        <h1 className="text-2xl font-semibold">Category: {decodeURIComponent(name)}</h1>
        <p className="text-sm text-gray-300">Showing up to 10 items related to {decodeURIComponent(name)}</p>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.length === 0 && (
          <div className="text-gray-400">No items found for this category.</div>
        )}

        {items.map(p => (
          <div key={p.id} className="bg-gray-800 rounded p-4 flex flex-col">
            <Link to={`/product/${p.id}`} className="no-underline text-inherit">
              <div className="h-40 bg-white/5 rounded mb-3 flex items-center justify-center">
                <img src={p.image} alt={p.title} className="max-h-36 object-contain" />
              </div>
              <div className="font-semibold">{p.title}</div>
              <div className="text-sm text-gray-300">₹{p.price}</div>
            </Link>
            <div className="mt-auto flex items-center justify-between pt-3">
              <button onClick={() => addToCart(p)} className="px-3 py-1 rounded bg-green-600">Add</button>
              {p.discounted && <div className="text-sm text-yellow-300">Discount</div>}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Category;
