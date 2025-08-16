import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2, ArrowLeft, Eye } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Wishlist() {
  const { state, dispatch } = useApp();

  const handleRemoveFromWishlist = (productId: number) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: productId });
  };

  const handleAddToCart = (product: any) => {
    dispatch({ 
      type: 'ADD_TO_CART', 
      payload: { product, quantity: 1 } 
    });
  };

  const handleMoveAllToCart = () => {
    state.wishlist.forEach(item => {
      dispatch({ 
        type: 'ADD_TO_CART', 
        payload: { product: item.product, quantity: 1 } 
      });
    });
    dispatch({ type: 'CLEAR_WISHLIST' });
  };

  const handleClearWishlist = () => {
    dispatch({ type: 'CLEAR_WISHLIST' });
  };

  if (state.wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 mb-6">
            <Heart size={80} className="mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-8 max-w-md">
            Start building your wishlist by adding products you love. You can save items for later and add them to your cart when you're ready to buy.
          </p>
          <Link to="/products" className="btn-primary inline-flex items-center space-x-2">
            <ArrowLeft size={20} />
            <span>Start Shopping</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">My Wishlist</h1>
              <p className="text-gray-600">
                {state.wishlist.length} {state.wishlist.length === 1 ? 'item' : 'items'} saved
              </p>
            </div>
            
            {state.wishlist.length > 0 && (
              <div className="flex space-x-4">
                <button
                  onClick={handleClearWishlist}
                  className="btn-secondary"
                >
                  Clear Wishlist
                </button>
                <button
                  onClick={handleMoveAllToCart}
                  className="btn-primary btn-large"
                >
                  Move All to Cart
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Wishlist Items */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {state.wishlist.map((item) => (
            <div key={item.product.id} className="card p-4 hover:shadow-xl transition-shadow duration-200 group">
              {/* Product Image */}
              <div className="relative mb-4">
                <Link to={`/product/${item.product.id}`}>
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-200"
                  />
                </Link>
                
                {/* Quick Actions */}
                <div className="absolute top-2 right-2 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    onClick={() => handleRemoveFromWishlist(item.product.id)}
                    className="p-2 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors"
                    title="Remove from wishlist"
                  >
                    <Trash2 size={16} />
                  </button>

                  <button
                    onClick={() => handleAddToCart(item.product)}
                    className="p-2 bg-primary-500 text-white rounded-full shadow-lg hover:bg-primary-600 transition-colors"
                    title="Add to cart"
                  >
                    <ShoppingCart size={16} />
                  </button>

                  <Link
                    to={`/product/${item.product.id}`}
                    className="p-2 bg-gray-500 text-white rounded-full shadow-lg hover:bg-gray-600 transition-colors"
                    title="View details"
                  >
                    <Eye size={16} />
                  </Link>
                </div>

                {/* Discount Badge */}
                {item.product.originalPrice > item.product.price && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {Math.round(((item.product.originalPrice - item.product.price) / item.product.originalPrice) * 100)}% OFF
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{item.product.brand}</span>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-sm ${
                          i < Math.floor(item.product.rating)
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      >
                        ★
                      </span>
                    ))}
                    <span className="text-xs text-gray-500 ml-1">({item.product.reviewCount})</span>
                  </div>
                </div>

                <Link to={`/product/${item.product.id}`}>
                  <h3 className="font-semibold text-gray-900 hover:text-primary-600 transition-colors line-clamp-2">
                    {item.product.name}
                  </h3>
                </Link>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-gray-900">
                      ${item.product.price.toFixed(2)}
                    </span>
                    {item.product.originalPrice > item.product.price && (
                      <span className="text-sm text-gray-500 line-through ml-2">
                        ${item.product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    item.product.inStock 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {item.product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>

                {/* Added Date */}
                <div className="text-xs text-gray-500 pt-2 border-t border-gray-100">
                  Added {item.addedAt.toLocaleDateString()}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => handleAddToCart(item.product)}
                  disabled={!item.product.inStock}
                  className="flex-1 btn-primary py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add to Cart
                </button>
                
                <button
                  onClick={() => handleRemoveFromWishlist(item.product.id)}
                  className="px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                  title="Remove from wishlist"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Actions */}
        <div className="mt-12 text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products" className="btn-secondary inline-flex items-center space-x-2">
              <ArrowLeft size={20} />
              <span>Continue Shopping</span>
            </Link>
            
            {state.wishlist.length > 0 && (
              <button
                onClick={handleMoveAllToCart}
                className="btn-primary inline-flex items-center space-x-2"
              >
                <ShoppingCart size={20} />
                <span>Add All to Cart</span>
              </button>
            )}
          </div>
        </div>

        {/* Recommendations */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">You might also like</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* This would be populated with recommended products based on wishlist items */}
            <div className="card p-4 text-center py-8">
              <p className="text-gray-500">Recommended products will appear here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
