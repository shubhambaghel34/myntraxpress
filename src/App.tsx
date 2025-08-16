import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import ProductListing from './pages/ProductListing';
import ProductDetails from './pages/ProductDetails';
import Deals from './pages/Deals';
import NewArrivals from './pages/NewArrivals';
import Trending from './pages/Trending';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Profile from './pages/Profile';
import { Product, Category } from './types';

// Import dummy data
import productsData from './data/products.json';
import categoriesData from './data/categories.json';

function AppContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API loading
    const loadData = async () => {
      try {
        // In a real app, this would be API calls
        await new Promise(resolve => setTimeout(resolve, 500));
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading DesiMyntra...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header categories={categories} />
        
        <main>
          <Routes>
            <Route path="/" element={<LandingPage products={products} categories={categories} />} />
            <Route path="/products" element={<ProductListing products={products} categories={categories} />} />
            <Route path="/product/:productId" element={<ProductDetails products={products} />} />
            <Route path="/deals" element={<Deals products={products} />} />
            <Route path="/new-arrivals" element={<NewArrivals products={products} />} />
            <Route path="/trending" element={<Trending products={products} />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/profile" element={<Profile />} />
            
            {/* Category routes */}
            <Route 
              path="/category/:categorySlug" 
              element={<ProductListing products={products} categories={categories} />} 
            />
            
            {/* Search route */}
            <Route 
              path="/search" 
              element={<ProductListing products={products} categories={categories} />} 
            />
            
            {/* Redirect unknown routes to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-dark-900 text-white py-12 mt-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-bold text-primary-400 mb-4">DesiMyntra</h3>
                <p className="text-gray-300 text-sm">
                  Your one-stop destination for quality products at unbeatable prices.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li><Link to="/products" className="hover:text-white transition-colors">All Products</Link></li>
                  <li><Link to="/deals" className="hover:text-white transition-colors">Deals</Link></li>
                  <li><Link to="/new-arrivals" className="hover:text-white transition-colors">New Arrivals</Link></li>
                  <li><Link to="/trending" className="hover:text-white transition-colors">Trending</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Customer Service</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li><Link to="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                  <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                  <li><Link to="/returns" className="hover:text-white transition-colors">Returns</Link></li>
                  <li><Link to="/shipping" className="hover:text-white transition-colors">Shipping Info</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Connect With Us</h4>
                <div className="flex space-x-4">
                  <button className="text-gray-300 hover:text-white transition-colors">
                    <span className="sr-only">Facebook</span>
                    📘
                  </button>
                  <button className="text-gray-300 hover:text-white transition-colors">
                    <span className="sr-only">Twitter</span>
                    🐦
                  </button>
                  <button className="text-gray-300 hover:text-white transition-colors">
                    <span className="sr-only">Instagram</span>
                    📷
                  </button>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
              <p>&copy; 2024 DesiMyntra. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
