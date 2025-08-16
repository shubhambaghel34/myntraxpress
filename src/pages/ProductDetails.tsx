import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star, Truck, Shield, RefreshCw, ChevronLeft, ChevronRight, Minus, Plus } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Product } from '../types';

interface ProductDetailsProps {
  products: Product[];
}

export default function ProductDetails({ products }: ProductDetailsProps) {
  const { productId } = useParams<{ productId: string }>();
  const { dispatch, isInWishlist, isInCart } = useApp();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.id === Number(productId));

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-dark-900 mb-4">Product not found</h2>
          <p className="text-dark-600 mb-8">The product you're looking for doesn't exist.</p>
          <Link to="/products" className="btn-primary">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToWishlist = () => {
    if (isInWishlist(product.id)) {
      dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: product.id });
    } else {
      dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
    }
  };

  const handleAddToCart = () => {
    dispatch({ 
      type: 'ADD_TO_CART', 
      payload: { 
        product, 
        quantity,
        color: selectedColor || undefined,
        size: selectedSize || undefined
      } 
    });
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
        <Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" size={20} className="fill-yellow-400 text-yellow-400" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} size={20} className="text-gray-300" />
      );
    }

    return stars;
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-dark-600">
            <li><Link to="/" className="hover:text-primary-500">Home</Link></li>
            <li><ChevronRight size={16} /></li>
            <li><Link to="/products" className="hover:text-primary-500">Products</Link></li>
            <li><ChevronRight size={16} /></li>
            <li><Link to={`/category/${product.category.toLowerCase().replace(' ', '-')}`} className="hover:text-primary-500">{product.category}</Link></li>
            <li><ChevronRight size={16} /></li>
            <li className="text-dark-900 font-medium">{product.name}</li>
          </ol>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative">
              <img
                src={product.images[selectedImageIndex]}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
              
              {/* Navigation Arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-colors"
                  >
                    <ChevronLeft size={24} className="text-dark-600" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-colors"
                  >
                    <ChevronRight size={24} className="text-dark-600" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      index === selectedImageIndex 
                        ? 'border-primary-500' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Product Header */}
            <div>
              <h1 className="text-3xl font-bold text-dark-900 mb-2">{product.name}</h1>
              <p className="text-lg text-dark-600 mb-4">{product.brand}</p>
              
              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center space-x-1">
                  {renderStars(product.rating)}
                </div>
                <span className="text-dark-600">({product.reviewCount} reviews)</span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <span className="text-3xl font-bold text-dark-900">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="text-xl text-dark-500 line-through ml-3">
                      {formatPrice(product.originalPrice)}
                    </span>
                    <span className="ml-3 px-2 py-1 bg-secondary-100 text-secondary-800 text-sm font-semibold rounded-full">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-dark-900 mb-2">Description</h3>
              <p className="text-dark-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-lg font-semibold text-dark-900 mb-2">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-accent-500 rounded-full"></div>
                    <span className="text-dark-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Color Selection */}
            {product.colors.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-dark-900 mb-3">Color</h3>
                <div className="flex space-x-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                        selectedColor === color
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-dark-900 mb-3">Size</h3>
                <div className="flex space-x-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                        selectedSize === size
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="text-lg font-semibold text-dark-900 mb-3">Quantity</h3>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="w-16 text-center font-medium text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <span className={`w-3 h-3 rounded-full ${
                product.inStock ? 'bg-green-500' : 'bg-red-500'
              }`}></span>
              <span className={`font-medium ${
                product.inStock ? 'text-green-700' : 'text-red-700'
              }`}>
                {product.inStock ? `In Stock (${product.stockCount} available)` : 'Out of Stock'}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 btn-primary py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart size={20} className="mr-2" />
                Add to Cart
              </button>
              
              <button
                onClick={handleAddToWishlist}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  isInWishlist(product.id)
                    ? 'border-secondary-500 bg-secondary-50 text-secondary-700'
                    : 'border-gray-300 hover:border-secondary-300 hover:bg-secondary-50'
                }`}
              >
                <Heart size={20} className={isInWishlist(product.id) ? 'fill-current' : ''} />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="text-center">
                <div className="bg-accent-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Truck size={24} className="text-accent-600" />
                </div>
                <p className="text-sm text-dark-600">Free Shipping</p>
              </div>
              <div className="text-center">
                <div className="bg-warning-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Shield size={24} className="text-warning-600" />
                </div>
                <p className="text-sm text-dark-600">Secure Payment</p>
              </div>
              <div className="text-center">
                <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                  <RefreshCw size={24} className="text-primary-600" />
                </div>
                <p className="text-sm text-dark-600">Easy Returns</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Reviews Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-dark-900 mb-8">Customer Reviews</h2>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="text-center py-8">
              <p className="text-dark-500">Reviews will be displayed here</p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-dark-900 mb-8">You might also like</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* This would be populated with related products */}
            <div className="card p-4 text-center py-8">
              <p className="text-dark-500">Related products will appear here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
