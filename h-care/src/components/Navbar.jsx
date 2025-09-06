import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [cartCount, setCartCount] = useState(() => {
    try {
      const raw = localStorage.getItem('hc_cart');
      const arr = raw ? JSON.parse(raw) : [];
      return arr.length;
    } catch (e) {
      return 0;
    }
  });

  useEffect(() => {
    const handler = () => {
      try {
        const raw = localStorage.getItem('hc_cart');
        const arr = raw ? JSON.parse(raw) : [];
        setCartCount(arr.length);
      } catch (e) {
        setCartCount(0);
      }
    };
    window.addEventListener('hc_cart_updated', handler);
    return () => window.removeEventListener('hc_cart_updated', handler);
  }, []);

  return (
    <header className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 py-3 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 flex items-center gap-4">
        <button className="text-2xl text-white/95">☰</button>

        <div className="text-xl font-semibold text-white">H-Care</div>

        {/* Search - centered and wide like Amazon */}
        <div className="flex-1">
          <div className="flex items-center bg-white rounded-md overflow-hidden">
            <input
              className="flex-1 px-4 py-2 focus:outline-none"
              placeholder="Search for products, categories, and more"
            />
            <button className="bg-yellow-400 px-4 py-2 font-semibold">Search</button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/cart" aria-label="Go to cart" className="relative text-white/95">
            <span className="text-2xl">🛒</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          <Link to="/profile" aria-label="Go to profile" className="inline-block">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-700 to-gray-600 ring-1 ring-white/10" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
