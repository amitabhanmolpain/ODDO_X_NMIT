import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const CART_KEY = 'hc_cart';
const PURCHASES_KEY = 'hc_purchases';

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
  } catch (e) {
    return [];
  }
}

function loadPurchases() {
  try { return JSON.parse(localStorage.getItem(PURCHASES_KEY) || '[]'); } catch (e) { return []; }
}

const Cart = () => {
  const [items, setItems] = useState(loadCart());
  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => setItems(loadCart());
    window.addEventListener('hc_cart_updated', handler);
    return () => window.removeEventListener('hc_cart_updated', handler);
  }, []);

  const removeItem = (index) => {
    const next = items.slice();
    next.splice(index, 1);
    localStorage.setItem(CART_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event('hc_cart_updated'));
    setItems(next);
  };

  const clearCartLocal = () => {
    localStorage.removeItem(CART_KEY);
    window.dispatchEvent(new Event('hc_cart_updated'));
    setItems([]);
  };

  const checkout = () => {
    if (items.length === 0) return;
    // move cart items to purchases
    const purchases = loadPurchases();
    const sessionRaw = localStorage.getItem('hc_session');
    let userEmail = null;
    try { userEmail = sessionRaw ? JSON.parse(sessionRaw).email : null; } catch(e){}

    const itemsForPurchase = items.map(it => ({ ...it, purchasedAt: Date.now(), buyer: userEmail }));
    const nextPurchases = [...purchases, ...itemsForPurchase];
    localStorage.setItem(PURCHASES_KEY, JSON.stringify(nextPurchases));
    window.dispatchEvent(new Event('hc_purchases_updated'));

    // clear cart
    localStorage.removeItem(CART_KEY);
    window.dispatchEvent(new Event('hc_cart_updated'));
    setItems([]);

    // show confirmation toast and navigate to purchases
    window.dispatchEvent(new CustomEvent('hc_toast', { detail: 'Checkout successful — items moved to Purchases' }));
    navigate('/purchases');
  };

  const total = items.reduce((s, it) => s + (it.price || 0), 0);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col">
      <h1 className="text-2xl font-semibold mb-4">Cart</h1>

      <div className="flex-1 bg-gray-900">
        {items.length === 0 ? (
          <div className="bg-gray-800 rounded-lg p-6 text-center">No items in cart yet.</div>
        ) : (
          <div className="space-y-4">
            {items.map((it, i) => (
              <div key={i} className="bg-gray-800 rounded-lg p-4 flex gap-4 items-center">
                <div className="w-28 h-20 bg-white/5 flex items-center justify-center rounded">
                  {it.image ? <img src={it.image} alt={it.title} className="max-h-16" /> : <div className="text-gray-400">Image</div>}
                </div>

                <div className="flex-1">
                  <div className="font-semibold">{it.title}</div>
                  <div className="text-sm text-gray-300">{it.category} • {it.condition || 'Used'}</div>
                  <div className="text-sm text-gray-400">Seller: {it.seller || 'N/A'}</div>
                </div>

                <div className="text-right">
                  <div className="text-lg font-semibold">₹{it.price}</div>
                  <button onClick={() => removeItem(i)} className="text-sm text-red-400 mt-2">Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 bg-gray-800 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="text-lg">Total price to pay:</div>
          <div className="text-xl font-bold">₹{total}</div>
        </div>
        <div className="text-right">
          <button onClick={checkout} className="w-full md:w-64 mx-auto bg-green-600 px-6 py-3 rounded text-lg font-semibold">Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
