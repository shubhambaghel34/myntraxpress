import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Product, CartItem, WishlistItem, User } from '../types';

interface AppState {
  cart: CartItem[];
  wishlist: WishlistItem[];
  user: User | null;
  searchQuery: string;
  filters: {
    category: string;
    subcategory: string;
    minPrice: number;
    maxPrice: number;
    rating: number;
    inStock: boolean;
    sortBy: string;
  };
}

type AppAction =
  | { type: 'ADD_TO_CART'; payload: { product: Product; quantity: number; color?: string; size?: string } }
  | { type: 'REMOVE_FROM_CART'; payload: number }
  | { type: 'UPDATE_CART_QUANTITY'; payload: { productId: number; quantity: number } }
  | { type: 'ADD_TO_WISHLIST'; payload: Product }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: number }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_FILTERS'; payload: Partial<AppState['filters']> }
  | { type: 'CLEAR_CART' }
  | { type: 'CLEAR_WISHLIST' };

const initialState: AppState = {
  cart: [],
  wishlist: [],
  user: null,
  searchQuery: '',
  filters: {
    category: '',
    subcategory: '',
    minPrice: 0,
    maxPrice: 1000,
    rating: 0,
    inStock: false,
    sortBy: 'popular'
  }
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.cart.find(
        item => item.product.id === action.payload.product.id &&
        item.selectedColor === action.payload.color &&
        item.selectedSize === action.payload.size
      );

      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item === existingItem
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          )
        };
      }

      return {
        ...state,
        cart: [...state.cart, {
          product: action.payload.product,
          quantity: action.payload.quantity,
          selectedColor: action.payload.color,
          selectedSize: action.payload.size
        }]
      };
    }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.product.id !== action.payload)
      };

    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.product.id === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };

    case 'ADD_TO_WISHLIST': {
      const exists = state.wishlist.some(item => item.product.id === action.payload.id);
      if (exists) return state;
      
      return {
        ...state,
        wishlist: [...state.wishlist, { product: action.payload, addedAt: new Date() }]
      };
    }

    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        wishlist: state.wishlist.filter(item => item.product.id !== action.payload)
      };

    case 'SET_USER':
      return {
        ...state,
        user: action.payload
      };

    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        searchQuery: action.payload
      };

    case 'SET_FILTERS':
      return {
        ...state,
        filters: { ...state.filters, ...action.payload }
      };

    case 'CLEAR_CART':
      return {
        ...state,
        cart: []
      };

    case 'CLEAR_WISHLIST':
      return {
        ...state,
        wishlist: []
      };

    default:
      return state;
  }
}

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  cartTotal: number;
  cartItemCount: number;
  isInWishlist: (productId: number) => boolean;
  isInCart: (productId: number) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const cartTotal = state.cart.reduce(
    (total, item) => total + (item.product.price * item.quantity),
    0
  );

  const cartItemCount = state.cart.reduce(
    (count, item) => count + item.quantity,
    0
  );

  const isInWishlist = (productId: number) => {
    return state.wishlist.some(item => item.product.id === productId);
  };

  const isInCart = (productId: number) => {
    return state.cart.some(item => item.product.id === productId);
  };

  const value: AppContextType = {
    state,
    dispatch,
    cartTotal,
    cartItemCount,
    isInWishlist,
    isInCart
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
