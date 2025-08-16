import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Cart() {
  const { state, dispatch, cartTotal } = useApp();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
    } else {
      dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { productId, quantity: newQuantity } });
    }
  };

  const handleRemoveItem = (productId: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const calculateSubtotal = () => {
    return state.cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const calculateShipping = () => {
    return cartTotal >= 50 ? 0 : 5.99;
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.08; // 8% tax
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping() + calculateTax();
  };

  if (state.cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 mb-6">
            <ShoppingBag size={80} className="mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8 max-w-md">
            Looks like you haven't added any products to your cart yet. Start shopping to see items here.
          </p>
          <Link to="/products" className="btn-primary inline-flex items-center space-x-2">
            <ArrowLeft size={20} />
            <span>Continue Shopping</span>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-gray-600">
            {state.cart.reduce((total, item) => total + item.quantity, 0)} items in your cart
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1">
            <div className="card p-6">
              <div className="space-y-6">
                {state.cart.map((item) => (
                  <div key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`} className="flex space-x-4 py-4 border-b border-gray-200 last:border-b-0">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <Link to={`/product/${item.product.id}`}>
                            <h3 className="text-lg font-semibold text-gray-900 hover:text-primary-600 transition-colors">
                              {item.product.name}
                            </h3>
                          </Link>
                          <p className="text-sm text-gray-500 mt-1">{item.product.brand}</p>
                          
                          {/* Selected Options */}
                          <div className="flex flex-wrap gap-2 mt-2">
                            {item.selectedColor && (
                              <span className="text-sm text-gray-600">
                                Color: <span className="font-medium">{item.selectedColor}</span>
                              </span>
                            )}
                            {item.selectedSize && (
                              <span className="text-sm text-gray-600">
                                Size: <span className="font-medium">{item.selectedSize}</span>
                              </span>
                            )}
                          </div>

                          {/* Price */}
                          <div className="mt-2">
                            <span className="text-lg font-bold text-gray-900">
                              {formatPrice(item.product.price)}
                            </span>
                            {item.product.originalPrice > item.product.price && (
                              <span className="text-sm text-gray-500 line-through ml-2">
                                {formatPrice(item.product.originalPrice)}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex flex-col items-end space-y-4">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="w-12 text-center font-medium">{item.quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                              <Plus size={16} />
                            </button>
                          </div>

                          <button
                            onClick={() => handleRemoveItem(item.product.id)}
                            className="text-red-600 hover:text-red-700 transition-colors"
                            title="Remove item"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="card p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Subtotal ({state.cart.reduce((total, item) => total + item.quantity, 0)} items)</span>
                  <span>{formatPrice(calculateSubtotal())}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>
                    {calculateShipping() === 0 ? 'Free' : formatPrice(calculateShipping())}
                  </span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span>{formatPrice(calculateTax())}</span>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>{formatPrice(calculateTotal())}</span>
                  </div>
                </div>
              </div>

              {/* Shipping Info */}
              {cartTotal < 50 && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    Add <strong>{formatPrice(50 - cartTotal)}</strong> more to your cart for free shipping!
                  </p>
                </div>
              )}

              {/* Checkout Button */}
              <button
                onClick={() => setIsCheckingOut(true)}
                disabled={isCheckingOut}
                className="w-full btn-primary mt-6 py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
              </button>

              {/* Continue Shopping */}
              <Link
                to="/products"
                className="block w-full text-center btn-secondary mt-4 py-3"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>

        {/* Recommended Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">You might also like</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* This would be populated with recommended products based on cart items */}
            <div className="card p-4 text-center py-8">
              <p className="text-gray-500">Recommended products will appear here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
