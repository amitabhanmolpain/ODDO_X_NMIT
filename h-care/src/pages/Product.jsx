import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { productsAPI } from '../utils/api';

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const result = await productsAPI.getById(id);
        if (result.success) {
          setProduct(result.data);
        } else {
          setError(result.error);
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
      <h1 className="text-2xl font-semibold mb-4">{product.title}</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded p-4 flex flex-col items-center">
          <div className="w-full h-96 bg-white/5 flex items-center justify-center">
            {product.image ? (
              <img src={product.image} alt={product.title} className="max-h-88" />
            ) : (
              <div className="text-gray-500">No Image Available</div>
            )}
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
            <div className="text-xl font-semibold">Price: ₹{product.price}</div>
            <div className="text-sm text-gray-300">Category: {product.category}</div>
            {product.seller_name && (
              <div className="text-sm text-gray-300">Seller: {product.seller_name}</div>
            )}
          </div>
          <div className="mb-4 text-gray-200">
            {product.description || "No description available."}
          </div>

          <div className="flex gap-3">
            <button onClick={addToCart} className="bg-yellow-400 px-4 py-2 rounded text-black">Add to cart</button>
            <a href="/cart" className="bg-green-600 px-4 py-2 rounded">Go to cart</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
