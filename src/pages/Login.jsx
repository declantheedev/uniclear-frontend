import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LandingNav from '../components/LandingNav';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    regNo: '',
    password: ''
  });
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      await login(formData.regNo, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-primary-custom flex flex-col">
      <LandingNav />
      <div className="flex-1 flex flex-col justify-center items-center relative">
        <h1 className="text-3xl font-bold text-white mb-8 mt-8">Login</h1>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 w-full max-w-md">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
          <div>
            <label htmlFor="regNo" className="block text-white font-semibold mb-2">Reg No:</label>
            <input
              type="text"
              id="regNo"
              name="regNo"
              value={formData.regNo}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-white text-gray-900 border-none focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Your registration number"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-white font-semibold mb-2">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-white text-gray-900 border-none focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Your registration password"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 bg-white text-primary-custom font-bold rounded-md hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="mt-8 text-white text-center">
          Don't have an account?{' '}
          <Link to="/signup" className="underline font-semibold">
            click here to register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;