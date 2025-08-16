import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Heart, User, Menu, X, ChevronDown } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Category } from '../types';

interface HeaderProps {
  categories: Category[];
}

export default function Header({ categories }: HeaderProps) {
  const { state, dispatch, cartItemCount } = useApp();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      dispatch({ type: 'SET_SEARCH_QUERY', payload: searchQuery });
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const handleCategoryClick = (categorySlug: string) => {
    navigate(`/category/${categorySlug}`);
    setIsCategoryMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Top bar */}
      <div className="gradient-primary text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <span>Free shipping on orders over ₹499</span>
              <span>•</span>
              <span>30-day return policy</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/help" className="hover:text-primary-100">Help</Link>
              <Link to="/contact" className="hover:text-primary-100">Contact</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">
            DesiMyntra
          </Link>

          {/* Search bar */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 h-full px-4 bg-primary-500 text-white rounded-r-lg hover:bg-primary-600 transition-colors"
                >
                  <Search size={20} />
                </button>
              </div>
            </form>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <Link to="/wishlist" className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Heart size={24} className="text-dark-600" />
              {state.wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-secondary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {state.wishlist.length}
                </span>
              )}
            </Link>
            
            <Link to="/cart" className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ShoppingCart size={24} className="text-dark-600" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>

            <div className="relative">
              <button className="flex items-center space-x-1 p-2 hover:bg-gray-100 rounded-full transition-colors">
                <User size={24} className="text-dark-600" />
                <ChevronDown size={16} className="text-dark-600" />
              </button>
              {/* User dropdown would go here */}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-8 py-3">
            {/* Categories dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                className="flex items-center space-x-1 py-2 px-4 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <span>Categories</span>
                <ChevronDown size={16} />
              </button>
              
              {isCategoryMenuOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  {categories.map((category) => (
                    <div key={category.id} className="border-b border-gray-100 last:border-b-0">
                      <button
                        onClick={() => handleCategoryClick(category.slug)}
                        className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors"
                      >
                        <div className="font-medium text-dark-900">{category.name}</div>
                        <div className="text-sm text-dark-500">{category.description}</div>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Link to="/deals" className="py-2 px-4 hover:bg-gray-100 rounded-lg transition-colors">
              Deals
            </Link>
            <Link to="/new-arrivals" className="py-2 px-4 hover:bg-gray-100 rounded-lg transition-colors">
              New Arrivals
            </Link>
            <Link to="/trending" className="py-2 px-4 hover:bg-gray-100 rounded-lg transition-colors">
              Trending
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="container mx-auto px-4 py-4">
            <div className="space-y-4">
              {/* Mobile search */}
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    className="absolute right-0 top-0 h-full px-4 bg-primary-500 text-white rounded-r-lg hover:bg-primary-600 transition-colors"
                  >
                    <Search size={20} />
                  </button>
                </div>
              </form>

              {/* Mobile navigation */}
              <div className="space-y-2">
                <Link to="/deals" className="block py-2 px-4 hover:bg-gray-100 rounded-lg transition-colors">
                  Deals
                </Link>
                <Link to="/new-arrivals" className="block py-2 px-4 hover:bg-gray-100 rounded-lg transition-colors">
                  New Arrivals
                </Link>
                <Link to="/trending" className="block py-2 px-4 hover:bg-gray-100 rounded-lg transition-colors">
                  Trending
                </Link>
              </div>

              {/* Mobile categories */}
              <div className="space-y-2">
                <div className="font-medium text-dark-900 px-4 py-2">Categories</div>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      handleCategoryClick(category.slug);
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
