import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import products, { categories } from "../constants/products";
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

  // curated sections: enforce limits per design (max 3 each) and keep them disjoint so landing shows 6 unique items
  const trending = products.filter((p) => p.trending).slice(0, 3);
  const trendingIds = new Set(trending.map((t) => t.id));
  // pick discounted items that are not already in trending
  let discounted = products.filter((p) => p.discounted && !trendingIds.has(p.id)).slice(0, 3);
  // if there are not enough discounted unique items, fill from remaining non-trending products
  if (discounted.length < 3) {
    const taken = new Set(discounted.map((d) => d.id));
    const filler = products.filter((p) => !trendingIds.has(p.id) && !taken.has(p.id)).slice(0, 3 - discounted.length);
    discounted = discounted.concat(filler);
  }

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
                  <img src={p.image} alt={p.title} className="max-h-32" />
                </div>
                <div className="font-semibold text-white">{p.title}</div>
                <div className="text-sm text-gray-300">₹{p.price}</div>
                <div className="mt-auto flex items-center justify-between">
                  <button onClick={(e) => { e.preventDefault(); addToCart(p); }} className="bg-green-600 px-3 py-1 rounded">Add</button>
                  {p.discounted && <div className="text-sm text-yellow-300">Discount</div>}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Banner Carousel between sections */}
        <section className="mb-6">
          <BannerCarousel />
        </section>

        {/* Discounted Products */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Discounted</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {discounted.map(p => (
              <Link key={p.id} to={`/product/${p.id}`} className="bg-gray-800 p-4 rounded flex flex-col no-underline hover:bg-gray-700">
                <div className="h-36 bg-white/5 rounded mb-3 flex items-center justify-center">
                  <img src={p.image} alt={p.title} className="max-h-32" />
                </div>
                <div className="font-semibold text-white">{p.title}</div>
                <div className="text-sm text-gray-300">₹{p.price}</div>
                <div className="mt-auto flex items-center justify-between">
                  <button onClick={(e) => { e.preventDefault(); addToCart(p); }} className="bg-yellow-400 px-3 py-1 rounded">Add</button>
                  <div className="text-sm text-red-400">Save 20%</div>
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
