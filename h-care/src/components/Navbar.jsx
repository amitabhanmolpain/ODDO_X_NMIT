import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { productsAPI } from "../utils/api.js";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
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

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    try {
      const result = await productsAPI.search(searchQuery);
      if (result.success) {
        setSearchResults(result.data.results || []);
        setShowResults(true);
      }
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  return (
    <header className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 py-3 shadow-lg relative">
      <div className="max-w-6xl mx-auto px-4 flex items-center gap-4">
        <button className="text-2xl text-white/95">☰</button>

        <div className="text-xl font-semibold text-white">H-Care</div>

        {/* Search - centered and wide like Amazon */}
        <div className="flex-1">
          <form onSubmit={handleSearch} className="flex items-center bg-white rounded-md overflow-hidden">
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 focus:outline-none"
              placeholder="Search for products, categories, and more"
            />
            <button type="submit" className="bg-yellow-400 px-4 py-2 font-semibold">Search</button>
          </form>
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
      
      {/* Search Results Dropdown */}
      {showResults && searchResults.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg z-50 max-h-96 overflow-y-auto">
          <div className="max-w-6xl mx-auto px-4">
            {searchResults.slice(0, 10).map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="block p-3 hover:bg-gray-100 border-b border-gray-200 text-black no-underline"
                onClick={() => setShowResults(false)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                    {product.image ? (
                      <img src={product.image} alt={product.title} className="max-h-10 max-w-10 object-contain" />
                    ) : (
                      <span className="text-gray-400">📦</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{product.title}</div>
                    <div className="text-sm text-gray-600">₹{product.price} • {product.category}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
