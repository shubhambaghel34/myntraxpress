import React from 'react';
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  variant?: 'grid' | 'list';
}

export default function ProductCard({ product, variant = 'grid' }: ProductCardProps) {
  const { dispatch, isInWishlist, isInCart } = useApp();

  const handleAddToWishlist = () => {
    if (isInWishlist(product.id)) {
      dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: product.id });
    } else {
      dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
    }
  };

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: { product, quantity: 1 } });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" size={16} className="fill-yellow-400 text-yellow-400" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} size={16} className="text-gray-300" />
      );
    }

    return stars;
  };

  if (variant === 'list') {
    return (
      <div className="card p-6">
        <div className="flex space-x-6">
          {/* Product Image */}
          <div className="flex-shrink-0">
            <img
              src={product.image}
              alt={product.name}
              className="w-32 h-32 object-cover rounded-lg"
            />
          </div>

          {/* Product Info */}
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-dark-900 mb-2">
              <Link to={`/product/${product.id}`} className="hover:text-primary-600 transition-colors">
                {product.name}
              </Link>
            </h3>
            <p className="text-dark-600 mb-3">{product.description}</p>
            
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center space-x-1">
                {renderStars(product.rating)}
                <span className="text-sm text-dark-600 ml-2">({product.reviewCount})</span>
              </div>
              <span className="text-sm text-dark-500">•</span>
              <span className="text-sm text-dark-500">{product.brand}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-2xl font-bold text-dark-900">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-lg text-dark-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="btn-primary btn-small disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart size={16} />
                  Add to Cart
                </button>
                
                <button
                  onClick={handleAddToWishlist}
                  className={`wishlist-btn ${
                    isInWishlist(product.id)
                      ? 'wishlist-btn-active'
                      : 'wishlist-btn-inactive'
                  }`}
                >
                  <Heart size={16} className={isInWishlist(product.id) ? 'fill-current' : ''} />
                </button>

                <Link
                  to={`/product/${product.id}`}
                  className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                  title="View details"
                >
                  <Eye size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid view (default)
  return (
    <div className="card p-4">
      {/* Product Image */}
      <div className="relative mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded-lg"
        />
        
        {/* Quick Actions Overlay */}
        <div className="absolute top-2 right-2 flex space-x-1">
          <button
            onClick={handleAddToWishlist}
            className={`p-2 rounded-full transition-colors ${
              isInWishlist(product.id)
                ? 'bg-[#FD913C] text-white hover:bg-[#f0852e]'
                : 'bg-white/90 text-gray-600 hover:bg-[#FD913C] hover:text-white'
            }`}
            title={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart size={16} className={isInWishlist(product.id) ? 'fill-current' : ''} />
          </button>

          <Link
            to={`/product/${product.id}`}
            className="p-2 bg-white/90 text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
            title="View details"
          >
            <Eye size={16} />
          </Link>
        </div>

        {/* Discount Badge */}
        {product.originalPrice > product.price && (
          <div className="absolute top-2 left-2">
            <span className="bg-secondary-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div>
        <h3 className="font-semibold text-dark-900 mb-2 line-clamp-2">
          <Link to={`/product/${product.id}`} className="hover:text-primary-600 transition-colors">
            {product.name}
          </Link>
        </h3>
        
        <div className="flex items-center space-x-1 mb-2">
          {renderStars(product.rating)}
          <span className="text-sm text-dark-600 ml-1">({product.reviewCount})</span>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-dark-900">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-dark-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <span className="text-sm text-dark-500">{product.brand}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="flex-1 btn-primary btn-small disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingCart size={16} />
            Add to Cart
          </button>
          
          <button
            onClick={handleAddToWishlist}
            className={`p-2 rounded-lg border-2 transition-colors ${
              isInWishlist(product.id)
                ? 'border-secondary-500 bg-secondary-50 text-secondary-700'
                : 'border-gray-300 hover:border-secondary-300 hover:bg-secondary-50'
            }`}
          >
            <Heart size={16} className={isInWishlist(product.id) ? 'fill-current' : ''} />
          </button>
        </div>
      </div>
    </div>
  );
}
