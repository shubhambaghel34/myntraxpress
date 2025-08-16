import React, { useState, useMemo } from 'react';
import { Filter, Grid, List, SlidersHorizontal } from 'lucide-react';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';

interface DealsProps {
  products: Product[];
}

export default function Deals({ products }: DealsProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<'discount-high' | 'discount-low' | 'price-low' | 'price-high'>('discount-high');

  // Filter products that have discounts
  const discountedProducts = useMemo(() => {
    return products
      .filter(product => product.originalPrice > product.price)
      .map(product => ({
        ...product,
        discountPercentage: Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      }))
      .sort((a, b) => {
        switch (sortBy) {
          case 'discount-high':
            return b.discountPercentage - a.discountPercentage;
          case 'discount-low':
            return a.discountPercentage - b.discountPercentage;
          case 'price-low':
            return a.price - b.price;
          case 'price-high':
            return b.price - a.price;
          default:
            return b.discountPercentage - a.discountPercentage;
        }
      });
  }, [products, sortBy]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-dark-900 mb-2">🔥 Hot Deals & Offers</h1>
          <p className="text-dark-600">
            {discountedProducts.length} discounted products available
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
              <option value="discount-high">Highest Discount</option>
              <option value="discount-low">Lowest Discount</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
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

        {/* Deals Banner */}
        <div className="gradient-accent text-white p-6 rounded-lg mb-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Limited Time Offers!</h2>
            <p className="text-lg opacity-90">
              Don't miss out on these amazing deals. Prices are slashed for a limited time only!
            </p>
          </div>
        </div>

        {/* Products Grid/List */}
        {discountedProducts.length > 0 ? (
          <div className={viewMode === 'grid' 
            ? 'grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
            : 'space-y-6'
          }>
            {discountedProducts.map((product) => (
              <div key={product.id} className="relative">
                {/* Discount Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <div className="bg-secondary-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg">
                    {product.discountPercentage}% OFF
                  </div>
                </div>
                
                <ProductCard product={product} variant={viewMode} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <SlidersHorizontal size={64} className="mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-dark-900 mb-2">
              No deals available at the moment
            </h3>
            <p className="text-dark-600 mb-6">
              Check back later for amazing offers and discounts!
            </p>
          </div>
        )}

        {/* Additional Deals Info */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="card p-6 text-center">
            <div className="bg-accent-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⏰</span>
            </div>
            <h3 className="text-lg font-semibold text-dark-900 mb-2">Flash Sales</h3>
            <p className="text-dark-600">Limited time offers that disappear quickly</p>
          </div>
          
          <div className="card p-6 text-center">
            <div className="bg-warning-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="text-lg font-semibold text-dark-900 mb-2">Daily Deals</h3>
            <p className="text-dark-600">New offers every day at midnight</p>
          </div>
          
          <div className="card p-6 text-center">
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎉</span>
            </div>
            <h3 className="text-lg font-semibold text-dark-900 mb-2">Seasonal Sales</h3>
            <p className="text-dark-600">Biggest discounts during festivals</p>
          </div>
        </div>
      </div>
    </div>
  );
}
