import React from 'react';
import { useParams } from 'react-router-dom';
import products from '../constants/products';

const Product = () => {
  const { id } = useParams();
  const p = products.find(x => x.id === id);
  if (!p) return <div className="min-h-screen p-6 text-white">Product not found</div>;

  const addToCart = () => {
    try {
      const raw = localStorage.getItem('hc_cart');
      const arr = raw ? JSON.parse(raw) : [];
      arr.push(p);
      localStorage.setItem('hc_cart', JSON.stringify(arr));
      window.dispatchEvent(new Event('hc_cart_updated'));
      window.dispatchEvent(new CustomEvent('hc_toast', { detail: `${p.title} added to cart` }));
    } catch (e) {}
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-semibold mb-4">{p.title}</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded p-4 flex flex-col items-center">
          <div className="w-full h-96 bg-white/5 flex items-center justify-center">
            <img src={p.image} alt={p.title} className="max-h-88" />
          </div>
          <div className="flex gap-2 mt-3">
            {/* dots placeholder */}
            <span className="w-2 h-2 bg-white/50 rounded-full" />
            <span className="w-2 h-2 bg-white/30 rounded-full" />
            <span className="w-2 h-2 bg-white/30 rounded-full" />
          </div>
        </div>

        <div className="bg-gray-800 rounded p-4">
          <div className="mb-4">
            <div className="text-xl font-semibold">Price: ₹{p.price}</div>
            <div className="text-sm text-gray-300">Condition: {p.condition}</div>
          </div>
          <div className="mb-4 text-gray-200">Product description goes here. This area should contain all the required fields like seller info, pickup options, and short specs.</div>

          <div className="flex gap-3">
            <button onClick={addToCart} className="bg-yellow-400 px-4 py-2 rounded">Add to cart</button>
            <a href="/cart" className="bg-green-600 px-4 py-2 rounded">Go to cart</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
