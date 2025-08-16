export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  category: string;
  subcategory: string;
  brand: string;
  rating: number;
  reviewCount: number;
  image: string;
  images: string[];
  inStock: boolean;
  stockCount: number;
  features: string[];
  colors: string[];
  sizes: string[];
  tags: string[];
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  icon: string;
  description: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
  id: number;
  name: string;
  slug: string;
  productCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface WishlistItem {
  product: Product;
  addedAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface SearchFilters {
  category?: string;
  subcategory?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  inStock?: boolean;
  sortBy?: 'price-low' | 'price-high' | 'rating' | 'newest' | 'popular';
}

export interface ProductReview {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: Date;
  helpful: number;
}
