import React, { useState } from 'react';
import { User, LogIn, LogOut, Settings, Heart, ShoppingBag, Package, CreditCard, MapPin, Bell } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Profile() {
  const { state, dispatch } = useApp();
  const [isLoginForm, setIsLoginForm] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login - in real app, this would be an API call
    const mockUser = {
      id: '1',
      name: 'John Doe',
      email: loginData.email,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
    };
    dispatch({ type: 'SET_USER', payload: mockUser });
    setLoginData({ email: '', password: '' });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    // Simulate registration - in real app, this would be an API call
    const mockUser = {
      id: '1',
      name: registerData.name,
      email: registerData.email,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
    };
    dispatch({ type: 'SET_USER', payload: mockUser });
    setRegisterData({ name: '', email: '', password: '', confirmPassword: '' });
  };

  const handleLogout = () => {
    dispatch({ type: 'SET_USER', payload: null });
  };

  if (!state.user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="bg-primary-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <User size={40} className="text-primary-600" />
            </div>
            <h2 className="text-3xl font-bold text-dark-900 mb-2">
              {isLoginForm ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-dark-600">
              {isLoginForm ? 'Sign in to your account' : 'Join DesiMyntra today'}
            </p>
          </div>

          {/* Toggle between Login and Register */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setIsLoginForm(true)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                isLoginForm
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-dark-600 hover:text-dark-900'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLoginForm(false)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                !isLoginForm
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-dark-600 hover:text-dark-900'
              }`}
            >
              Register
            </button>
          </div>

          {isLoginForm ? (
            /* Login Form */
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-dark-700 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff3e6c] focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-dark-700 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff3e6c] focus:border-transparent"
                  placeholder="Enter your password"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-[#ff3e6c] focus:ring-[#ff3e6c]" />
                  <span className="ml-2 text-sm text-dark-600">Remember me</span>
                </label>
                <button
                  type="button"
                  className="text-sm text-primary-600 hover:text-primary-500"
                >
                  Forgot password?
                </button>
              </div>

              <button type="submit" className="w-full btn-primary btn-large">
                <LogIn size={18} />
                Sign In
              </button>
            </form>
          ) : (
            /* Register Form */
            <form onSubmit={handleRegister} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-dark-700 mb-2">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={registerData.name}
                  onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff3e6c] focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="reg-email" className="block text-sm font-medium text-dark-700 mb-2">
                  Email Address
                </label>
                <input
                  id="reg-email"
                  type="email"
                  required
                  value={registerData.email}
                  onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff3e6c] focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <label htmlFor="reg-password" className="block text-sm font-medium text-dark-700 mb-2">
                  Password
                </label>
                <input
                  id="reg-password"
                  type="password"
                  required
                  value={registerData.password}
                  onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff3e6c] focus:border-transparent"
                  placeholder="Create a password"
                />
              </div>

              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-dark-700 mb-2">
                  Confirm Password
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  required
                  value={registerData.confirmPassword}
                  onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff3e6c] focus:border-transparent"
                  placeholder="Confirm your password"
                />
              </div>

              <button type="submit" className="w-full btn-primary btn-large">
                <User size={18} />
                Create Account
              </button>
            </form>
          )}

          <div className="text-center">
            <p className="text-sm text-dark-500">
              By continuing, you agree to our{' '}
              <button
                type="button"
                className="text-primary-600 hover:text-primary-500"
              >
                Terms of Service
              </button>
              {' '}and{' '}
              <button
                type="button"
                className="text-primary-600 hover:text-primary-500"
              >
                Privacy Policy
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // User is logged in - show profile
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center space-x-6">
            <img
              src={state.user.avatar}
              alt={state.user.name}
              className="w-20 h-20 rounded-full object-cover"
            />
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-dark-900">{state.user.name}</h1>
              <p className="text-dark-600">{state.user.email}</p>
              <p className="text-sm text-dark-500">Member since 2024</p>
            </div>
            <button
              onClick={handleLogout}
              className="btn-primary"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>

        {/* Profile Navigation */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag size={32} className="text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold text-dark-900 mb-2">My Orders</h3>
            <p className="text-dark-600 text-sm">Track your orders</p>
          </div>
          
          <div className="card p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
            <div className="bg-secondary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart size={32} className="text-secondary-600" />
            </div>
            <h3 className="text-lg font-semibold text-dark-900 mb-2">Wishlist</h3>
            <p className="text-dark-600 text-sm">{state.wishlist.length} items saved</p>
          </div>
          
          <div className="card p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
            <div className="bg-accent-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package size={32} className="text-accent-600" />
            </div>
            <h3 className="text-lg font-semibold text-dark-900 mb-2">Returns</h3>
            <p className="text-dark-600 text-sm">Manage returns</p>
          </div>
          
          <div className="card p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
            <div className="bg-warning-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard size={32} className="text-warning-600" />
            </div>
            <h3 className="text-lg font-semibold text-dark-900 mb-2">Payment</h3>
            <p className="text-dark-600 text-sm">Saved cards</p>
          </div>
        </div>

        {/* Account Settings */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Personal Information */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-dark-900 mb-6 flex items-center">
              <Settings size={24} className="mr-2 text-primary-600" />
              Personal Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark-700 mb-2">Full Name</label>
                <input
                  type="text"
                  defaultValue={state.user.name}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff3e6c] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-700 mb-2">Email</label>
                <input
                  type="email"
                  defaultValue={state.user.email}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff3e6c] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-700 mb-2">Phone</label>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff3e6c] focus:border-transparent"
                />
              </div>
              <button className="btn-primary">Update Information</button>
            </div>
          </div>

          {/* Addresses */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-dark-900 mb-6 flex items-center">
              <MapPin size={24} className="mr-2 text-primary-600" />
              Addresses
            </h2>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-dark-900 mb-2">Default Address</h3>
                <p className="text-dark-600 text-sm mb-2">123 Main Street, City, State 12345</p>
                <button className="text-sm text-primary-600 hover:text-primary-500">Edit</button>
              </div>
              <button className="btn-secondary w-full">Add New Address</button>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="mt-8 card p-6">
          <h2 className="text-xl font-semibold text-dark-900 mb-6 flex items-center">
            <Bell size={24} className="mr-2 text-primary-600" />
            Preferences
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-[#ff3e6c] focus:ring-[#ff3e6c]" defaultChecked />
                <span className="ml-2 text-dark-700">Email notifications</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-[#ff3e6c] focus:ring-[#ff3e6c]" defaultChecked />
                <span className="ml-2 text-dark-700">SMS notifications</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-[#ff3e6c] focus:ring-[#ff3e6c]" />
                <span className="ml-2 text-dark-700">Push notifications</span>
              </label>
            </div>
            <div className="space-y-4">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-[#ff3e6c] focus:ring-[#ff3e6c]" defaultChecked />
                <span className="ml-2 text-dark-700">Deals and offers</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-[#ff3e6c] focus:ring-[#ff3e6c]" defaultChecked />
                <span className="ml-2 text-dark-700">New arrivals</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-[#ff3e6c] focus:ring-[#ff3e6c]" />
                <span className="ml-2 text-dark-700">Newsletter</span>
              </label>
            </div>
          </div>
          <button className="btn-primary mt-6">Save Preferences</button>
        </div>
      </div>
    </div>
  );
}
