import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signup } from '../utils/auth';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const res = await signup({ email, password, username });
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
        <h2 className="text-2xl mb-4">Sign up</h2>
        {error && <div className="mb-3 text-red-400">{error}</div>}
        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          className="w-full mb-3 p-2 rounded text-black" 
          required 
          disabled={loading}
        />
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
          className="w-full bg-green-600 py-2 rounded disabled:bg-gray-600"
          disabled={loading}
        >
          {loading ? 'Signing up...' : 'Sign up'}
        </button>
        <div className="mt-3 text-sm text-gray-300">
          Already have an account? <Link to="/login" className="text-blue-400">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
