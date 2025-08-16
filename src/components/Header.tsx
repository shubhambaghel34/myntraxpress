import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Heart, ShoppingCart, User, ChevronDown } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Category } from '../types';

interface HeaderProps {
  categories: Category[];
}

const Header: React.FC<HeaderProps> = ({ categories }) => {
  const { state, dispatch } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic here
    console.log('Searching for:', searchQuery);
  };

  const cartItemCount = state.cart.reduce((total: number, item: any) => total + item.quantity, 0);
  const wishlistItemCount = state.wishlist.length;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center justify-between py-4">
          {/* Left side: Logo and Navigation */}
          <div className="flex items-center space-x-8">
            {/* Company Logo */}
            <Link to="/" className="text-2xl font-bold text-gray-800">
              DesiMyntra
            </Link>

            {/* Navigation Links */}
            <nav className="flex items-center space-x-6">
              <Link to="/category/men" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">
                MEN
              </Link>
              <Link to="/category/women" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">
                WOMEN
              </Link>
              <Link to="/category/kids" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">
                KIDS
              </Link>
              <Link to="/category/home" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">
                HOME
              </Link>
              <Link to="/category/beauty" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">
                BEAUTY
              </Link>
              <Link to="/category/genz" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">
                GENZ
              </Link>
            </nav>
          </div>

          {/* Right side: Search, Profile, Wishlist, Cart */}
          <div className="flex items-center space-x-6">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-80 pl-4 pr-12 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff3e6c] focus:border-transparent"
                placeholder="Search for products..."
              />
              <button
                type="submit"
                className="absolute right-0 top-0 h-full px-4 bg-[#ff3e6c] text-white rounded-r-lg hover:bg-[#e6355f] transition-colors"
              >
                <Search size={18} />
              </button>
            </form>

            {/* Profile */}
            <div className="relative">
              {state.user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    <User size={18} />
                    <span className="hidden sm:block">{state.user.name}</span>
                    <ChevronDown size={16} />
                  </button>

                  {isUserDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Profile
                      </Link>
                      <Link
                        to="/orders"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        My Orders
                      </Link>
                      <Link
                        to="/wishlist"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Wishlist
                      </Link>
                      <button
                        onClick={() => {
                          dispatch({ type: 'SET_USER', payload: null });
                          setIsUserDropdownOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-[#ff3e6c] hover:bg-gray-50 transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors"
                >
                  <User size={18} />
                  <span className="hidden sm:block">Profile</span>
                </Link>
              )}
            </div>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors relative"
            >
              <Heart size={18} />
              <span className="hidden sm:block">Wishlist</span>
              {wishlistItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#ff3e6c] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistItemCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors relative"
            >
              <ShoppingCart size={18} />
              <span className="hidden sm:block">Cart</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#ff3e6c] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="text-xl font-bold text-gray-800">
              DesiMyntra
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="relative mt-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff3e6c] focus:border-transparent"
              placeholder="Search for products..."
            />
            <button
              type="submit"
              className="absolute right-0 top-0 h-full px-4 bg-[#ff3e6c] text-white rounded-r-lg hover:bg-[#e6355f] transition-colors"
            >
              <Search size={18} />
            </button>
          </form>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="mt-4 py-4 border-t border-gray-200">
              <nav className="space-y-2">
                <Link
                  to="/category/men"
                  className="block py-2 text-gray-700 hover:text-gray-900 transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  MEN
                </Link>
                <Link
                  to="/category/women"
                  className="block py-2 text-gray-700 hover:text-gray-900 transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  WOMEN
                </Link>
                <Link
                  to="/category/kids"
                  className="block py-2 text-gray-700 hover:text-gray-900 transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  KIDS
                </Link>
                <Link
                  to="/category/home"
                  className="block py-2 text-gray-700 hover:text-gray-900 transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  HOME
                </Link>
                <Link
                  to="/category/beauty"
                  className="block py-2 text-gray-700 hover:text-gray-900 transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  BEAUTY
                </Link>
                <Link
                  to="/category/genz"
                  className="block py-2 text-gray-700 hover:text-gray-900 transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  GENZ
                </Link>
              </nav>

              <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
                {state.user ? (
                  <>
                    <Link
                      to="/profile"
                      className="flex items-center space-x-2 py-2 text-gray-700 hover:text-gray-900 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User size={18} />
                      <span>Profile</span>
                    </Link>
                    <Link
                      to="/orders"
                      className="flex items-center space-x-2 py-2 text-gray-700 hover:text-gray-900 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span>My Orders</span>
                    </Link>
                    <button
                      onClick={() => {
                        dispatch({ type: 'SET_USER', payload: null });
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left py-2 px-4 text-[#ff3e6c] hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 py-2 text-gray-700 hover:text-gray-900 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User size={18} />
                    <span>Profile</span>
                  </Link>
                )}

                <Link
                  to="/wishlist"
                  className="flex items-center space-x-2 py-2 text-gray-700 hover:text-gray-900 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Heart size={18} />
                  <span>Wishlist ({wishlistItemCount})</span>
                </Link>

                <Link
                  to="/cart"
                  className="flex items-center space-x-2 py-2 text-gray-700 hover:text-gray-900 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <ShoppingCart size={18} />
                  <span>Cart ({cartItemCount})</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
