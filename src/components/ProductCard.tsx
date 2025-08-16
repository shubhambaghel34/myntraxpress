import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';

interface ProductCardProps {
  product: Product;
  variant?: 'grid' | 'list';
}

export default function ProductCard({ product, variant = 'grid' }: ProductCardProps) {
  const { dispatch, isInWishlist, isInCart } = useApp();

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist(product.id)) {
      dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: product.id });
    } else {
      dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ 
      type: 'ADD_TO_CART', 
      payload: { product, quantity: 1 } 
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" size={14} className="fill-yellow-400 text-yellow-400" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} size={14} className="text-gray-300" />
      );
    }

    return stars;
  };

  if (variant === 'list') {
    return (
      <div className="card p-6 hover:shadow-xl transition-shadow duration-200">
        <div className="flex space-x-6">
          {/* Product Image */}
          <div className="flex-shrink-0">
            <Link to={`/product/${product.id}`}>
              <img
                src={product.image}
                alt={product.name}
                className="w-32 h-32 object-cover rounded-lg"
              />
            </Link>
          </div>

          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <Link to={`/product/${product.id}`}>
                  <h3 className="text-lg font-semibold text-gray-900 hover:text-primary-600 transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-sm text-gray-500 mt-1">{product.brand}</p>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                  {product.description}
                </p>
                
                {/* Rating */}
                <div className="flex items-center mt-3 space-x-2">
                  <div className="flex items-center space-x-1">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-sm text-gray-500">
                    ({product.reviewCount} reviews)
                  </span>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {product.features.slice(0, 3).map((feature, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Price and Actions */}
              <div className="flex flex-col items-end space-y-3">
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </div>
                  {product.originalPrice > product.price && (
                    <div className="text-sm text-gray-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </div>
                  )}
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={handleAddToWishlist}
                    className={`p-2 rounded-full transition-colors ${
                      isInWishlist(product.id)
                        ? 'bg-red-100 text-red-600 hover:bg-red-200'
                        : 'bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600'
                    }`}
                    title={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                  >
                    <Heart size={20} className={isInWishlist(product.id) ? 'fill-current' : ''} />
                  </button>

                  <button
                    onClick={handleAddToCart}
                    className={`p-2 rounded-full transition-colors ${
                      isInCart(product.id)
                        ? 'bg-primary-100 text-primary-600 hover:bg-primary-200'
                        : 'bg-gray-100 text-gray-600 hover:bg-primary-100 hover:text-primary-600'
                    }`}
                    title={isInCart(product.id) ? 'In cart' : 'Add to cart'}
                  >
                    <ShoppingCart size={20} className={isInCart(product.id) ? 'fill-current' : ''} />
                  </button>

                  <Link
                    to={`/product/${product.id}`}
                    className="p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
                    title="View details"
                  >
                    <Eye size={20} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid variant (default)
  return (
    <div className="card p-4 hover:shadow-xl transition-shadow duration-200 group">
      {/* Product Image */}
      <div className="relative mb-4">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-200"
          />
        </Link>
        
        {/* Quick Actions */}
        <div className="absolute top-2 right-2 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={handleAddToWishlist}
            className={`p-2 rounded-full shadow-lg transition-colors ${
              isInWishlist(product.id)
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-white text-gray-600 hover:bg-red-500 hover:text-white'
            }`}
            title={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart size={16} className={isInWishlist(product.id) ? 'fill-current' : ''} />
          </button>

          <button
            onClick={handleAddToCart}
            className={`p-2 rounded-full shadow-lg transition-colors ${
              isInCart(product.id)
                ? 'bg-primary-500 text-white hover:bg-primary-600'
                : 'bg-white text-gray-600 hover:bg-primary-500 hover:text-white'
            }`}
            title={isInCart(product.id) ? 'In cart' : 'Add to cart'}
          >
            <ShoppingCart size={16} className={isInCart(product.id) ? 'fill-current' : ''} />
          </button>
        </div>

        {/* Discount Badge */}
        {product.originalPrice > product.price && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">{product.brand}</span>
          <div className="flex items-center space-x-1">
            {renderStars(product.rating)}
            <span className="text-xs text-gray-500 ml-1">({product.reviewCount})</span>
          </div>
        </div>

        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-gray-900 hover:text-primary-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through ml-2">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          
          <span className={`text-xs px-2 py-1 rounded-full ${
            product.inStock 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
      </div>
    </div>
  );
}
