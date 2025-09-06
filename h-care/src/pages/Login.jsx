import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../utils/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = login({ email, password });
    if (!res.ok) return setError(res.error);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl mb-4">Login</h2>
        {error && <div className="mb-3 text-red-400">{error}</div>}
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full mb-3 p-2 rounded text-black" required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full mb-3 p-2 rounded text-black" required />
        <button className="w-full bg-blue-600 py-2 rounded">Login</button>
        <div className="mt-3 text-sm text-gray-300">Don't have an account? <Link to="/signup" className="text-blue-400">Sign up</Link></div>
      </form>
    </div>
  );
};

export default Login;
