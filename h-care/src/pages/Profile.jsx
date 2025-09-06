import React from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Profile</h1>
        <Link to="/" className="text-sm text-gray-300">Back</Link>
      </header>

      <section className="bg-gray-800 rounded-lg p-6 mb-6">
        <div className="flex items-start gap-6">
          <div className="w-28 h-28 rounded-full bg-gray-700" />
          <div className="flex-1">
            <h2 className="text-xl font-semibold">User Name</h2>
            <p className="text-gray-400">user@example.com</p>
            <div className="mt-4">
              <button className="px-3 py-1 bg-gray-700 rounded">Edit</button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Navigations</h3>
        <div className="flex flex-col gap-3">
          <Link to="/my-listings" className="px-4 py-2 bg-gray-700 rounded text-left">My listings</Link>
          <Link to="/purchases" className="px-4 py-2 bg-gray-700 rounded text-left">My purchases</Link>
        </div>
      </section>
    </div>
  );
};

export default Profile;
