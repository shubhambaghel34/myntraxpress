import React, { useState, useMemo } from 'react';
import { Grid, List, Clock, Star, TrendingUp } from 'lucide-react';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';

interface NewArrivalsProps {
  products: Product[];
}

export default function NewArrivals({ products }: NewArrivalsProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'newest' | 'rating' | 'popular'>('newest');

  // Filter and sort new arrivals (using ID as proxy for newness)
  const newArrivals = useMemo(() => {
    return products
      .sort((a, b) => {
        switch (sortBy) {
          case 'newest':
            return b.id - a.id; // Higher ID = newer
          case 'rating':
            return b.rating - a.rating;
          case 'popular':
            return b.reviewCount - a.reviewCount;
          default:
            return b.id - a.id;
        }
      })
      .slice(0, 20); // Show top 20 newest products
  }, [products, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-dark-900 mb-2">🆕 New Arrivals</h1>
          <p className="text-dark-600">
            Discover the latest products just added to our collection
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
          {/* Sort */}
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-dark-700">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="newest">Newest First</option>
              <option value="rating">Highest Rated</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>

          {/* View Mode */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid'
                  ? 'bg-primary-100 text-primary-600'
                  : 'bg-gray-100 text-dark-600 hover:bg-gray-200'
              }`}
            >
              <Grid size={20} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list'
                  ? 'bg-primary-100 text-primary-600'
                  : 'bg-gray-100 text-dark-600 hover:bg-gray-200'
              }`}
            >
              <List size={20} />
            </button>
          </div>
        </div>

        {/* New Arrivals Banner */}
        <div className="gradient-primary text-white p-6 rounded-lg mb-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Fresh & Trending!</h2>
            <p className="text-lg opacity-90">
              Be the first to discover these amazing new products
            </p>
          </div>
        </div>

        {/* Products Grid/List */}
        {newArrivals.length > 0 ? (
          <div className={viewMode === 'grid' 
            ? 'grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
            : 'space-y-6'
          }>
            {newArrivals.map((product, index) => (
              <div key={product.id} className="relative">
                {/* New Badge */}
                {index < 5 && (
                  <div className="absolute top-4 left-4 z-10">
                    <div className="bg-accent-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg">
                      NEW
                    </div>
                  </div>
                )}
                
                <ProductCard product={product} variant={viewMode} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Clock size={64} className="mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-dark-900 mb-2">
              No new arrivals at the moment
            </h3>
            <p className="text-dark-600 mb-6">
              Check back soon for fresh products!
            </p>
          </div>
        )}

        {/* Features Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="card p-6 text-center">
            <div className="bg-accent-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock size={32} className="text-accent-600" />
            </div>
            <h3 className="text-lg font-semibold text-dark-900 mb-2">Updated Daily</h3>
            <p className="text-dark-600">New products added every day</p>
          </div>
          
          <div className="card p-6 text-center">
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star size={32} className="text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold text-dark-900 mb-2">Quality Assured</h3>
            <p className="text-dark-600">All new arrivals are quality tested</p>
          </div>
          
          <div className="card p-6 text-center">
            <div className="bg-warning-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp size={32} className="text-warning-600" />
            </div>
            <h3 className="text-lg font-semibold text-dark-900 mb-2">Trending Now</h3>
            <p className="text-dark-600">Latest trends and popular items</p>
          </div>
        </div>

        {/* Newsletter for New Arrivals */}
        <div className="mt-16 bg-white rounded-lg p-8 shadow-md">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-dark-900 mb-4">Stay Updated!</h3>
            <p className="text-dark-600 mb-6">
              Get notified about new arrivals and exclusive early access
            </p>
            <div className="max-w-md mx-auto">
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="btn-primary px-6 py-3"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
