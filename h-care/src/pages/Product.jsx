import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { productsAPI } from '../utils/api';
import products from '../constants/products';

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // First try to find the product in local constants
        const localProduct = products.find(p => p.id === id);
        
        if (localProduct) {
          setProduct(localProduct);
          setLoading(false);
          return;
        }

        // If not found locally, try the backend API
        const result = await productsAPI.getById(id);
        if (result.success) {
          setProduct(result.data);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-6 flex items-center justify-center">
        <div className="text-xl">Loading product...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-6 flex items-center justify-center">
        <div className="text-xl text-red-400">Product not found</div>
      </div>
    );
  }

  const addToCart = () => {
    try {
      const raw = localStorage.getItem('hc_cart');
      const arr = raw ? JSON.parse(raw) : [];
      arr.push(product);
      localStorage.setItem('hc_cart', JSON.stringify(arr));
      window.dispatchEvent(new Event('hc_cart_updated'));
      window.dispatchEvent(new CustomEvent('hc_toast', { detail: `${product.title} added to cart` }));
    } catch (e) {}
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <button 
          onClick={() => window.history.back()} 
          className="mb-4 text-gray-300 hover:text-white"
        >
          ← Back
        </button>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="w-full h-96 bg-white/5 rounded-lg flex items-center justify-center mb-4">
              {product.image ? (
                <img src={product.image} alt={product.title} className="max-h-88 max-w-full object-contain" />
              ) : (
                <div className="text-gray-500 text-center">
                  <div className="text-4xl mb-2">📦</div>
                  <div>No Image Available</div>
                </div>
              )}
            </div>
            <div className="flex justify-center gap-2">
              <span className="w-2 h-2 bg-white/50 rounded-full" />
              <span className="w-2 h-2 bg-white/30 rounded-full" />
              <span className="w-2 h-2 bg-white/30 rounded-full" />
            </div>
          </div>

          {/* Product Details */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
            
            <div className="mb-6">
              <div className="text-3xl font-bold text-green-400 mb-2">₹{product.price}</div>
              <div className="flex flex-wrap gap-4 text-sm">
                <span className="bg-gray-700 px-3 py-1 rounded-full">
                  📂 {product.category}
                </span>
                {product.condition && (
                  <span className="bg-blue-600 px-3 py-1 rounded-full">
                    ✨ {product.condition}
                  </span>
                )}
                {product.seller_name && (
                  <span className="bg-purple-600 px-3 py-1 rounded-full">
                    👤 {product.seller_name}
                  </span>
                )}
                {product.seller && (
                  <span className="bg-purple-600 px-3 py-1 rounded-full">
                    👤 {product.seller}
                  </span>
                )}
              </div>
            </div>

            {/* Product Description */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Description</h3>
              <div className="text-gray-300 leading-relaxed">
                {product.description || "This is a quality product in good condition. Perfect for students and anyone looking for affordable options."}
              </div>
            </div>

            {/* Additional Details */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Product Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                {product.brand && (
                  <div>
                    <span className="text-gray-400">Brand:</span>
                    <span className="ml-2">{product.brand}</span>
                  </div>
                )}
                {product.model && (
                  <div>
                    <span className="text-gray-400">Model:</span>
                    <span className="ml-2">{product.model}</span>
                  </div>
                )}
                {product.year && (
                  <div>
                    <span className="text-gray-400">Year:</span>
                    <span className="ml-2">{product.year}</span>
                  </div>
                )}
                {product.color && (
                  <div>
                    <span className="text-gray-400">Color:</span>
                    <span className="ml-2">{product.color}</span>
                  </div>
                )}
                {product.material && (
                  <div>
                    <span className="text-gray-400">Material:</span>
                    <span className="ml-2">{product.material}</span>
                  </div>
                )}
                {product.weight && (
                  <div>
                    <span className="text-gray-400">Weight:</span>
                    <span className="ml-2">{product.weight} kg</span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button 
                onClick={addToCart} 
                className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                🛒 Add to Cart
              </button>
              <button 
                onClick={() => window.location.href = '/cart'} 
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                🛍️ Buy Now
              </button>
            </div>

            {/* Additional Info */}
            <div className="mt-6 p-4 bg-gray-700 rounded-lg">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <span>🚚</span>
                <span>Free pickup available on campus</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300 mt-2">
                <span>💬</span>
                <span>Contact seller for more details</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300 mt-2">
                <span>🔒</span>
                <span>Secure transaction guaranteed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {products
              .filter(p => p.category === product.category && p.id !== product.id)
              .slice(0, 4)
              .map(p => (
                <div key={p.id} className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors">
                  <div className="h-32 bg-white/5 rounded mb-3 flex items-center justify-center">
                    <img src={p.image} alt={p.title} className="max-h-28 object-contain" />
                  </div>
                  <div className="font-semibold text-sm mb-1">{p.title}</div>
                  <div className="text-green-400 font-bold">₹{p.price}</div>
                  <button 
                    onClick={() => window.location.href = `/product/${p.id}`}
                    className="w-full mt-2 bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded text-sm transition-colors"
                  >
                    View Details
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;