// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Landing from "./components/Landing";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RequireAuth from "./components/RequireAuth";
import Toast from "./components/Toast";
import React, { useEffect, useState } from "react";
import Product from "./pages/Product";
import MyListings from "./pages/MyListings";
import AddListing from "./pages/AddListing";
import Purchases from "./pages/Purchases";

const App = () => {
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      setToast(e.detail);
    };
    window.addEventListener('hc_toast', handler);
    return () => window.removeEventListener('hc_toast', handler);
  }, []);

  return (
    <Router>
      <div className="bg-gray-900 min-h-screen text-white">
        {/* Main Routes */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/"
            element={
              <RequireAuth>
                <Landing />
              </RequireAuth>
            }
          />
          <Route path="/product/:id" element={<RequireAuth><Product /></RequireAuth>} />
          <Route path="/my-listings" element={<RequireAuth><MyListings /></RequireAuth>} />
          <Route path="/add-listing" element={<RequireAuth><AddListing /></RequireAuth>} />
          <Route path="/purchases" element={<RequireAuth><Purchases /></RequireAuth>} />
          <Route
            path="/cart"
            element={
              <RequireAuth>
                <Cart />
              </RequireAuth>
            }
          />
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
        </Routes>
        <Toast message={toast} onClose={() => setToast(null)} />
      </div>
    </Router>
  );
};

export default App;
