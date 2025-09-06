import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LISTINGS_KEY = 'hc_listings';

function loadListings() {
  try { return JSON.parse(localStorage.getItem(LISTINGS_KEY) || '[]'); } catch (e) { return []; }
}

function saveListings(list) {
  localStorage.setItem(LISTINGS_KEY, JSON.stringify(list));
  window.dispatchEvent(new Event('hc_listings_updated'));
}

const AddListing = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Furniture');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [status, setStatus] = useState('Available');
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    const session = JSON.parse(localStorage.getItem('hc_session') || 'null');
    const seller = session ? session.email : 'unknown';
    const listings = loadListings();
    listings.push({ title, category, description, price: Number(price), status, seller });
    saveListings(listings);
    navigate('/my-listings');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Add a new Product</h1>
      </header>

      <form onSubmit={submit} className="bg-gray-800 p-6 rounded max-w-3xl">
        <div className="mb-4">
          <label className="block text-sm mb-1">Product Title</label>
          <input value={title} onChange={e=>setTitle(e.target.value)} className="w-full p-2 rounded text-black" required />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">Category</label>
          <select value={category} onChange={e=>setCategory(e.target.value)} className="w-full p-2 rounded text-black">
            <option>Furniture</option>
            <option>Clothing</option>
            <option>Electronics</option>
            <option>Books</option>
            <option>Cycles & Gear</option>
            <option>Starter Packs</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">Product Description</label>
          <textarea value={description} onChange={e=>setDescription(e.target.value)} className="w-full p-2 rounded text-black" rows={6}></textarea>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Price</label>
            <input value={price} onChange={e=>setPrice(e.target.value)} type="number" className="w-full p-2 rounded text-black" required />
          </div>
          <div>
            <label className="block text-sm mb-1">Status</label>
            <select value={status} onChange={e=>setStatus(e.target.value)} className="w-full p-2 rounded text-black">
              <option>Available</option>
              <option>Sold</option>
            </select>
          </div>
        </div>

        <div className="mt-4">
          <button type="submit" className="px-4 py-2 bg-green-600 rounded">Add Item</button>
        </div>
      </form>
    </div>
  );
};

export default AddListing;
