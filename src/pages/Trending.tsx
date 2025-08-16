import React, { useState, useMemo } from 'react';
import { Grid, List, TrendingUp, Fire, Star, Eye } from 'lucide-react';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';

interface TrendingProps {
  products: Product[];
}

export default function Trending({ products }: TrendingProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'trending' | 'rating' | 'reviews' | 'views'>('trending');

  // Calculate trending score based on rating, reviews, and popularity
  const trendingProducts = useMemo(() => {
    return products
      .map(product => ({
        ...product,
        trendingScore: (product.rating * 0.4) + (product.reviewCount * 0.4) + (Math.random() * 0.2) // Simulated trending algorithm
      }))
      .sort((a, b) => {
        switch (sortBy) {
          case 'trending':
            return b.trendingScore - a.trendingScore;
          case 'rating':
            return b.rating - a.rating;
          case 'reviews':
            return b.reviewCount - a.reviewCount;
          case 'views':
            return b.trendingScore - a.trendingScore;
          default:
            return b.trendingScore - a.trendingScore;
        }
      })
      .slice(0, 24); // Show top 24 trending products
  }, [products, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-dark-900 mb-2">🔥 Trending Now</h1>
          <p className="text-dark-600">
            Discover what's hot and popular among our customers
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
              <option value="trending">Trending Score</option>
              <option value="rating">Highest Rated</option>
              <option value="reviews">Most Reviewed</option>
              <option value="views">Most Viewed</option>
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

        {/* Trending Banner */}
        <div className="gradient-accent text-white p-6 rounded-lg mb-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">What's Hot Right Now!</h2>
            <p className="text-lg opacity-90">
              These products are flying off the shelves and getting rave reviews
            </p>
          </div>
        </div>

        {/* Top Trending Products */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-dark-900 mb-6">Top Trending</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingProducts.slice(0, 6).map((product, index) => (
              <div key={product.id} className="relative">
                {/* Trending Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <div className={`text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg ${
                    index === 0 ? 'bg-warning-500' : 
                    index === 1 ? 'bg-secondary-500' : 
                    index === 2 ? 'bg-accent-500' : 'bg-primary-500'
                  }`}>
                    {index === 0 ? '🔥 #1' : 
                     index === 1 ? '🔥 #2' : 
                     index === 2 ? '🔥 #3' : '🔥 HOT'}
                  </div>
                </div>
                
                <ProductCard product={product} variant="grid" />
              </div>
            ))}
          </div>
        </div>

        {/* All Trending Products */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-dark-900 mb-6">All Trending Products</h2>
          {trendingProducts.length > 0 ? (
            <div className={viewMode === 'grid' 
              ? 'grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'space-y-6'
            }>
              {trendingProducts.map((product) => (
                <div key={product.id} className="relative">
                  <ProductCard product={product} variant={viewMode} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <TrendingUp size={64} className="mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-dark-900 mb-2">
                No trending products at the moment
              </h3>
              <p className="text-dark-600 mb-6">
                Check back soon for trending items!
              </p>
            </div>
          )}
        </div>

        {/* Trending Categories */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-dark-900 mb-6">Trending Categories</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Fire size={32} className="text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-dark-900 mb-2">Electronics</h3>
              <p className="text-dark-600 text-sm">Latest gadgets & tech</p>
            </div>
            
            <div className="card p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
              <div className="bg-accent-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp size={32} className="text-accent-600" />
              </div>
              <h3 className="text-lg font-semibold text-dark-900 mb-2">Fashion</h3>
              <p className="text-dark-600 text-sm">Trendy clothing & accessories</p>
            </div>
            
            <div className="card p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
              <div className="bg-warning-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star size={32} className="text-warning-600" />
              </div>
              <h3 className="text-lg font-semibold text-dark-900 mb-2">Home & Garden</h3>
              <p className="text-dark-600 text-sm">Stylish home decor</p>
            </div>
            
            <div className="card p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
              <div className="bg-secondary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye size={32} className="text-secondary-600" />
              </div>
              <h3 className="text-lg font-semibold text-dark-900 mb-2">Sports & Fitness</h3>
              <p className="text-dark-600 text-sm">Active lifestyle gear</p>
            </div>
          </div>
        </div>

        {/* Trending Insights */}
        <div className="mt-16 bg-white rounded-lg p-8 shadow-md">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-dark-900 mb-4">Trending Insights</h3>
            <p className="text-dark-600 mb-6">
              Our trending algorithm considers ratings, reviews, and customer engagement
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="text-center">
                <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star size={24} className="text-primary-600" />
                </div>
                <h4 className="font-semibold text-dark-900 mb-2">Customer Ratings</h4>
                <p className="text-dark-600 text-sm">Products with high ratings trend better</p>
              </div>
              
              <div className="text-center">
                <div className="bg-accent-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Eye size={24} className="text-accent-600" />
                </div>
                <h4 className="font-semibold text-dark-900 mb-2">Customer Reviews</h4>
                <p className="text-dark-600 text-sm">More reviews indicate popularity</p>
              </div>
              
              <div className="text-center">
                <div className="bg-warning-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <TrendingUp size={24} className="text-warning-600" />
                </div>
                <h4 className="font-semibold text-dark-900 mb-2">Engagement</h4>
                <p className="text-dark-600 text-sm">Customer interaction and interest</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
