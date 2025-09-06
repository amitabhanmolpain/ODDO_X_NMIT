import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { productsAPI } from "../utils/api.js";
import BannerCarousel from './BannerCarousel';

const CART_KEY = "hc_cart";

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

const LandingPage = () => {
  const [cart, setCart] = useState(loadCart());
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await productsAPI.getAll();
        if (result.success) {
          setProducts(result.data);
        } else {
          setError(result.error);
        }
      } catch (err) {
        setError('Failed to load products');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    saveCart(cart);
  }, [cart]);

  const addToCart = (p) => {
    setCart((c) => {
      const next = [...c, p];
      try {
        localStorage.setItem('hc_cart', JSON.stringify(next));
        window.dispatchEvent(new Event('hc_cart_updated'));
        // custom toast event
        window.dispatchEvent(new CustomEvent('hc_toast', { detail: `${p.title} added to cart` }));
      } catch (e) {}
      return next;
    });
  };

  if (loading) {
    return (
      <div className="bg-gray-900 text-white min-h-screen font-sans pt-4">
        <Navbar />
        <div className="flex items-center justify-center h-64">
          <div className="text-xl">Loading products...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-900 text-white min-h-screen font-sans pt-4">
        <Navbar />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="text-xl text-red-400 mb-4">Error: {error}</div>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // For demo purposes, create categories from available products
  const categories = products.length > 0 ? [...new Set(products.map(p => p.category))].map(cat => ({
    id: cat,
    name: cat,
    image: 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg' // Placeholder category image
  })) : [];

  // Curated sections - simple approach for integration
  const recentProducts = products.slice(0, 6);
  const trending = recentProducts.slice(0, 3);
  const featured = recentProducts.slice(3, 6);

  // Eco points demo: 100 points per purchase
  const ecoPoints = cart.length * 100;

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans pt-4">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Hero / Banner */}
        <section className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-lg p-6 mb-6 shadow-md">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold">EcoFinds — Affordable essentials for students</h1>
              <p className="mt-2 text-gray-100">Starter packs, second-hand furniture, books and electronics — curated for students and newcomers.</p>
              <div className="mt-4 flex gap-3">
                <button className="bg-white text-black px-4 py-2 rounded">Shop Starter Packs</button>
                <button className="border border-white/30 px-4 py-2 rounded">Learn More</button>
              </div>
            </div>

            <div className="w-56 h-40 bg-white/10 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="text-xl font-semibold">Eco Points</div>
                <div className="text-2xl mt-2">{ecoPoints}</div>
                <div className="text-sm text-gray-200">You saved ₹{ecoPoints * 10}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Category Slider */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Browse by category</h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {categories.map((c) => (
              <Link key={c.id} to={`/category/${encodeURIComponent(c.name)}`} className="min-w-[140px] bg-gray-800 rounded p-3 flex-shrink-0 text-center no-underline hover:bg-gray-700">
                <div className="w-full h-24 bg-white/5 rounded mb-2 flex items-center justify-center">
                  {/* image placeholder */}
                  <img src={c.image} alt={c.name} className="max-h-20" />
                </div>
                <div className="text-sm">{c.name}</div>
              </Link>
            ))}
          </div>
        </section>

        {/* Trending Products */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Trending</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {trending.map(p => (
              <Link key={p.id} to={`/product/${p.id}`} className="bg-gray-800 p-4 rounded flex flex-col no-underline hover:bg-gray-700">
                <div className="h-36 bg-white/5 rounded mb-3 flex items-center justify-center">
                  {p.image ? (
                    <img src={p.image} alt={p.title} className="max-h-32" />
                  ) : (
                    <div className="text-gray-500">No Image</div>
                  )}
                </div>
                <div className="font-semibold text-white">{p.title}</div>
                <div className="text-sm text-gray-300">₹{p.price}</div>
                <div className="text-xs text-gray-400 mb-2">{p.category}</div>
                <div className="mt-auto flex items-center justify-between">
                  <button onClick={(e) => { e.preventDefault(); addToCart(p); }} className="bg-green-600 px-3 py-1 rounded">Add</button>
                  <div className="text-sm text-green-300">Available</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Banner Carousel between sections */}
        <section className="mb-6">
          <BannerCarousel />
        </section>

        {/* Featured Products */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Featured</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {featured.map(p => (
              <Link key={p.id} to={`/product/${p.id}`} className="bg-gray-800 p-4 rounded flex flex-col no-underline hover:bg-gray-700">
                <div className="h-36 bg-white/5 rounded mb-3 flex items-center justify-center">
                  {p.image ? (
                    <img src={p.image} alt={p.title} className="max-h-32" />
                  ) : (
                    <div className="text-gray-500">No Image</div>
                  )}
                </div>
                <div className="font-semibold text-white">{p.title}</div>
                <div className="text-sm text-gray-300">₹{p.price}</div>
                <div className="text-xs text-gray-400 mb-2">{p.category}</div>
                <div className="mt-auto flex items-center justify-between">
                  <button onClick={(e) => { e.preventDefault(); addToCart(p); }} className="bg-yellow-400 px-3 py-1 rounded text-black">Add</button>
                  <div className="text-sm text-blue-400">Featured</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Banner */}
        <section className="mt-6">
          <div className="w-full h-48 bg-gradient-to-r from-indigo-600 to-pink-600 rounded-lg flex items-center justify-center text-2xl font-bold">Banner Image / Promo</div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
