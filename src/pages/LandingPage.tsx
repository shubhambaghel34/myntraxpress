import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Shield, RefreshCw } from 'lucide-react';
import { Product, Category } from '../types';
import ProductCard from '../components/ProductCard';

interface LandingPageProps {
  products: Product[];
  categories: Category[];
}

export default function LandingPage({ products, categories }: LandingPageProps) {
  const featuredProducts = products.slice(0, 8);
  const topCategories = categories.slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-primary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome to DesiMyntra
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-100 max-w-3xl mx-auto">
            Discover amazing products with authentic Indian style. Quality products at unbeatable prices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="btn-accent text-lg px-8 py-4 inline-flex items-center space-x-2"
            >
              <span>Shop Now</span>
              <ArrowRight size={20} />
            </Link>
            <Link
              to="/deals"
              className="btn-secondary text-lg px-8 py-4"
            >
              View Deals
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-accent-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck size={32} className="text-accent-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
              <p className="text-dark-600">Free shipping on orders over ₹499</p>
            </div>
            <div className="text-center">
              <div className="bg-warning-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield size={32} className="text-warning-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
              <p className="text-dark-600">100% secure payment processing</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <RefreshCw size={32} className="text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Returns</h3>
              <p className="text-dark-600">30-day return policy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-lg text-dark-600 max-w-2xl mx-auto">
              Explore our wide range of categories and find exactly what you're looking for
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topCategories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.slug}`}
                className="card p-6 hover:shadow-lg transition-all duration-200 group"
              >
                <div className="text-center">
                  <div className="bg-primary-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors">
                    <span className="text-2xl">📱</span>
                  </div>
                  <h3 className="text-xl font-semibold text-dark-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-dark-600 mb-4">{category.description}</p>
                  <div className="text-sm text-primary-600 font-medium">
                    {category.subcategories.reduce((total, sub) => total + sub.productCount, 0)} products
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link
              to="/categories"
              className="btn-primary inline-flex items-center space-x-2"
            >
              <span>View All Categories</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark-900 mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-dark-600 max-w-2xl mx-auto">
              Handpicked products that our customers love
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link
              to="/products"
              className="btn-primary inline-flex items-center space-x-2"
            >
              <span>View All Products</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Deals Section */}
      <section className="py-16 bg-secondary-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark-900 mb-4">
              🔥 Hot Deals
            </h2>
            <p className="text-lg text-dark-600 max-w-2xl mx-auto">
              Limited time offers on popular products
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products
              .filter(product => product.originalPrice > product.price)
              .slice(0, 6)
              .map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
          
          <div className="text-center mt-8">
            <Link
              to="/deals"
              className="btn-warning inline-flex items-center space-x-2"
            >
              <span>View All Deals</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="gradient-accent text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Stay Updated
          </h2>
          <p className="text-xl text-accent-100 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for exclusive deals, new product alerts, and special offers
          </p>
          <div className="max-w-md mx-auto">
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-dark-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-white text-accent-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
