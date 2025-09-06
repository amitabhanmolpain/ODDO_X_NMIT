import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signup } from '../utils/auth';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const res = await signup({
        email,
        display_name: displayName,
        password,
        confirm_password: confirmPassword
      });

      console.log('Signup API response:', res);

      if (!res.success) {
        setError(res.error || 'Signup failed');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl mb-4">Sign Up</h2>
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
          type="text"
          placeholder="Display Name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
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

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full mb-3 p-2 rounded text-black"
          required
          disabled={loading}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 py-2 rounded disabled:bg-gray-600"
          disabled={loading}
        >
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>

        <div className="mt-3 text-sm text-gray-300">
          Already have an account? <Link to="/login" className="text-blue-400">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
