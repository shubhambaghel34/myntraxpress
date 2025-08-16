import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Star, TrendingUp, Zap } from 'lucide-react';
import { Product, Category } from '../types';
import ProductCard from '../components/ProductCard';
import ImageSlider from '../components/ImageSlider';

interface LandingPageProps {
  products: Product[];
  categories: Category[];
}

export default function LandingPage({ products, categories }: LandingPageProps) {
  // Get featured products (first 8 products)
  const featuredProducts = products.slice(0, 8);

  // Get trending products (products with high ratings)
  const trendingProducts = products
    .filter(product => product.rating >= 4.5)
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Image Slider */}
      <ImageSlider />

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-dark-900 mb-12">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.slug}`}
                className="group text-center"
              >
                <div className="bg-gray-100 rounded-lg p-6 mb-4 group-hover:bg-primary-50 transition-colors duration-200">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center group-hover:bg-primary-200 transition-colors duration-200">
                    <ShoppingBag size={24} className="text-primary-600" />
                  </div>
                  <h3 className="font-semibold text-dark-900 group-hover:text-primary-600 transition-colors duration-200">
                    {category.name}
                  </h3>
                  <p className="text-sm text-dark-600 mt-2">
                    {category.subcategories.length} subcategories
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-dark-900">
              Featured Products
            </h2>
            <Link
              to="/products"
              className="text-primary-600 hover:text-primary-700 font-semibold flex items-center gap-2"
            >
              View All
              <TrendingUp size={20} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                variant="grid"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-dark-900">
              Trending Now
            </h2>
            <Link
              to="/trending"
              className="text-primary-600 hover:text-primary-700 font-semibold flex items-center gap-2"
            >
              View All
              <Zap size={20} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                variant="grid"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers Section */}
      <section className="py-16 bg-gradient-to-r from-primary-500 to-secondary-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Special Offers
          </h2>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            Get amazing deals on trending products. Limited time offers with up to 70% off!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/deals"
              className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
            >
              View Deals
            </Link>
            <Link
              to="/new-arrivals"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
            >
              New Arrivals
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
