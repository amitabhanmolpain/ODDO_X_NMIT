import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../utils/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const res = await login({ email, password });
      if (!res.ok) {
        setError(res.error);
      } else {
        navigate('/');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl mb-4">Login</h2>
        {error && <div className="mb-3 text-red-400">{error}</div>}
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="w-full mb-3 p-2 rounded text-black" 
          required 
          disabled={loading}
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          className="w-full mb-3 p-2 rounded text-black" 
          required 
          disabled={loading}
        />
        <button 
          type="submit"
          className="w-full bg-blue-600 py-2 rounded disabled:bg-gray-600"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <div className="mt-3 text-sm text-gray-300">
          Don't have an account? <Link to="/signup" className="text-blue-400">Sign up</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
