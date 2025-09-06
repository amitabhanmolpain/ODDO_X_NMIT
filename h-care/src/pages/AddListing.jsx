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
  const [imageData, setImageData] = useState(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Furniture');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [condition, setCondition] = useState('Used');
  const [year, setYear] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [lengthVal, setLengthVal] = useState('');
  const [widthVal, setWidthVal] = useState('');
  const [heightVal, setHeightVal] = useState('');
  const [weight, setWeight] = useState('');
  const [material, setMaterial] = useState('');
  const [color, setColor] = useState('');
  const [originalPackaging, setOriginalPackaging] = useState(false);
  const [manualIncluded, setManualIncluded] = useState(false);
  const [workingConditionDesc, setWorkingConditionDesc] = useState('');
  const [status, setStatus] = useState('Available');

  const navigate = useNavigate();

  const handleImage = (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImageData(reader.result);
    };
    reader.readAsDataURL(f);
  };

  const submit = (e) => {
    e.preventDefault();
    // basic validation
    if (!title.trim() || !price) {
      window.dispatchEvent(new CustomEvent('hc_toast', { detail: 'Please provide title and price' }));
      return;
    }

    const session = JSON.parse(localStorage.getItem('hc_session') || 'null');
    const seller = session ? session.email : 'unknown';
    const listings = loadListings();
    const id = `L${Date.now()}`;
    const dims = {
      length: lengthVal || null,
      width: widthVal || null,
      height: heightVal || null,
    };

    const item = {
      id,
      image: imageData,
      title,
      category,
      description,
      price: Number(price),
      quantity: Number(quantity || 1),
      condition,
      year: year || null,
      brand: brand || null,
      model: model || null,
      dimensions: dims,
      weight: weight || null,
      material: material || null,
      color: color || null,
      originalPackaging: !!originalPackaging,
      manualIncluded: !!manualIncluded,
      workingConditionDesc: workingConditionDesc || null,
      status,
      seller,
      createdAt: new Date().toISOString(),
    };

    listings.push(item);
    saveListings(listings);
    window.dispatchEvent(new CustomEvent('hc_toast', { detail: 'Listing added' }));
    navigate('/my-listings');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Add a new Product</h1>
      </header>

  <form onSubmit={submit} className="bg-gray-800 p-6 rounded max-w-3xl space-y-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <label className="block text-sm mb-2">Add product image</label>
            <div className="w-full h-48 bg-white/5 rounded flex items-center justify-center mb-2">
              {imageData ? (
                // preview
                <img src={imageData} alt="preview" className="max-h-44 object-contain" />
              ) : (
                <div className="text-gray-400">No image selected</div>
              )}
            </div>
            <input type="file" accept="image/*" onChange={handleImage} className="text-sm text-gray-300" />
          </div>

          <div className="md:col-span-2 space-y-3">
            <div>
              <label className="block text-sm mb-1">Product Title</label>
              <input value={title} onChange={e=>setTitle(e.target.value)} className="w-full p-2 rounded text-black" required />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm mb-1">Category</label>
                <select value={category} onChange={e=>setCategory(e.target.value)} className="w-full p-2 rounded text-black">
                  <option>Furniture</option>
                  <option>Shirts</option>
                  <option>Pants</option>
                  <option>Jackets</option>
                  <option>Kitchen Appliances</option>
                  <option>Study Material</option>
                  <option>Beddings</option>
                </select>
              </div>

              <div>
                <label className="block text-sm mb-1">Price (₹)</label>
                <input value={price} onChange={e=>setPrice(e.target.value)} type="number" className="w-full p-2 rounded text-black" required />
              </div>
            </div>

            <div>
              <label className="block text-sm mb-1">Product Description</label>
              <textarea value={description} onChange={e=>setDescription(e.target.value)} className="w-full p-2 rounded text-black" rows={4}></textarea>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm mb-1">Quantity</label>
            <input value={quantity} onChange={e=>setQuantity(e.target.value)} type="number" min={1} className="w-full p-2 rounded text-black" />
          </div>
          <div>
            <label className="block text-sm mb-1">Condition</label>
            <select value={condition} onChange={e=>setCondition(e.target.value)} className="w-full p-2 rounded text-black">
              <option>New</option>
              <option>Like New</option>
              <option>Used</option>
              <option>Refurbished</option>
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1">Year of Manufacture</label>
            <input value={year} onChange={e=>setYear(e.target.value)} type="number" min={1900} max={2099} className="w-full p-2 rounded text-black" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm mb-1">Brand</label>
            <input value={brand} onChange={e=>setBrand(e.target.value)} className="w-full p-2 rounded text-black" />
          </div>
          <div>
            <label className="block text-sm mb-1">Model</label>
            <input value={model} onChange={e=>setModel(e.target.value)} className="w-full p-2 rounded text-black" />
          </div>
          <div>
            <label className="block text-sm mb-1">Weight (kg)</label>
            <input value={weight} onChange={e=>setWeight(e.target.value)} className="w-full p-2 rounded text-black" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm mb-1">Dimensions (L x W x H) cm</label>
            <div className="grid grid-cols-3 gap-2">
              <input placeholder="L" value={lengthVal} onChange={e=>setLengthVal(e.target.value)} className="p-2 rounded text-black" />
              <input placeholder="W" value={widthVal} onChange={e=>setWidthVal(e.target.value)} className="p-2 rounded text-black" />
              <input placeholder="H" value={heightVal} onChange={e=>setHeightVal(e.target.value)} className="p-2 rounded text-black" />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Material</label>
            <input value={material} onChange={e=>setMaterial(e.target.value)} className="w-full p-2 rounded text-black" />
          </div>

          <div>
            <label className="block text-sm mb-1">Color</label>
            <input value={color} onChange={e=>setColor(e.target.value)} className="w-full p-2 rounded text-black" />
          </div>
        </div>

        <div className="flex gap-4 items-start">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={originalPackaging} onChange={e=>setOriginalPackaging(e.target.checked)} />
            <span className="text-sm">Original Packaging</span>
          </label>

          <label className="flex items-center gap-2">
            <input type="checkbox" checked={manualIncluded} onChange={e=>setManualIncluded(e.target.checked)} />
            <span className="text-sm">Manual / Instructions Included</span>
          </label>
        </div>

        <div>
          <label className="block text-sm mb-1">Working Condition Description</label>
          <textarea value={workingConditionDesc} onChange={e=>setWorkingConditionDesc(e.target.value)} className="w-full p-2 rounded text-black" rows={3}></textarea>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <label className="block text-sm mb-1">Status</label>
            <select value={status} onChange={e=>setStatus(e.target.value)} className="w-full p-2 rounded text-black">
              <option>Available</option>
              <option>Sold</option>
            </select>
          </div>

          <div>
            <button type="submit" className="px-6 py-2 bg-green-600 rounded">Add Item</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddListing;
