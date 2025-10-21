import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import logo from "/Uniclearlogo.png";
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

function LoginPage() {
  const [formData, setFormData] = useState({
    regNo: '',
    password: ''
  });
  const [error, setError] = useState('');
  const { login, isLoading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isLoading, isAuthenticated, navigate]);

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
      toast.error(err.message || "Login failed. Please check your credentials", { position: "top-right", autoClose: 3000 });
    }
  };

  if (isLoading) {
    return (
      <div className="relative min-h-screen flex items-center justify-center px-2 overflow-hidden bg-gradient-to-b from-white from-50% to-blue-500 to-100%">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center px-2 overflow-hidden bg-gradient-to-b from-white from-50% to-blue-500 to-100%">
      {/* Brand at top-left */}
      <div className="absolute top-4 left-4 flex items-center space-x-2 z-20">
        <img src={logo} alt="App Logo" className="h-8 w-auto" />
      </div>

      {/* Background */}
      <div className="absolute inset-0 z-[-1]" style={{ backgroundColor: '#fff' }} />

      {/* Login Card */}
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg p-6 sm:p-8 md:p-10 rounded-lg shadow-lg z-10">
        <h2 className="text-xl sm:text-4xl font-semibold text-center text-black mb-6">Login</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4 text-left">
            <label className="block text-black mb-2 text-base sm:text-xl font-medium">Reg No:</label>
            <input
              id="regNo"
              name="regNo"
              type="text"
              maxLength="11"
              pattern="[0-9]*"
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              placeholder="e.g. 20231234567"
              value={formData.regNo}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>

          <div className="mb-6 text-left">
            <label className="block text-black mb-2 text-base sm:text-xl font-medium">Password:</label>
            <input
              id="password"
              name="password"
              type="password"
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded text-base sm:text-xl font-medium transition duration-200 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="mt-5 text-sm text-center text-black">
          Don't have an account?{' '}
          <Link to="/signup" className="text-black hover:underline">
            Register here
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}

export default LoginPage;