import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import { Grid, List, SlidersHorizontal } from 'lucide-react';
import { Product, Category, SearchFilters } from '../types';
import ProductCard from '../components/ProductCard';

interface ProductListingProps {
  products: Product[];
  categories: Category[];
}

export default function ProductListing({ products, categories }: ProductListingProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    category: '',
    subcategory: '',
    brand: '',
    minPrice: Number(searchParams.get('minPrice')) || 0,
    maxPrice: Number(searchParams.get('maxPrice')) || 1000,
    rating: Number(searchParams.get('rating')) || 0,
    inStock: searchParams.get('inStock') === 'true',
    sortBy: (searchParams.get('sortBy') as SearchFilters['sortBy']) || 'popular'
  });

  const searchQuery = searchParams.get('q') || '';

  // Update category filter when route changes
  useEffect(() => {
    if (categorySlug) {
      const category = categories.find(cat => cat.slug === categorySlug);
      if (category) {
        setFilters(prev => ({ ...prev, category: category.name, subcategory: '' }));
      }
    }
  }, [categorySlug, categories]);

  // Get unique brands from filtered products
  const brands = useMemo(() => {
    const categoryProducts = categorySlug ? products.filter(p => {
      const category = categories.find(cat => cat.slug === categorySlug);
      return category ? p.category === category.name : true;
    }) : products;
    
    const uniqueBrands = Array.from(new Set(categoryProducts.map(p => p.brand)));
    return uniqueBrands.sort();
  }, [products, categories, categorySlug]);

  // Get subcategories for a given category
  const getSubcategories = (categoryName: string) => {
    const category = categories.find(c => c.name === categoryName);
    return category?.subcategories || [];
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      // Search query filter
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !product.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !product.brand.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Category filter
      if (filters.category && product.category !== filters.category) {
        return false;
      }

      // Subcategory filter
      if (filters.subcategory && product.subcategory !== filters.subcategory) {
        return false;
      }

      // Brand filter
      if (filters.brand && product.brand !== filters.brand) {
        return false;
      }

      // Price filter
      if (filters.minPrice !== undefined && filters.maxPrice !== undefined &&
          (product.price < filters.minPrice || product.price > filters.maxPrice)) {
        return false;
      }

      // Rating filter
      if (filters.rating !== undefined && product.rating < filters.rating) {
        return false;
      }

      // Stock filter
      if (filters.inStock && !product.inStock) {
        return false;
      }

      return true;
    });

    // Sort products
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      case 'popular':
      default:
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }

    return filtered;
  }, [products, searchQuery, filters]);

  // Update URL params when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (searchQuery) params.set('q', searchQuery);
    if (filters.category) params.set('category', filters.category);
    if (filters.subcategory) params.set('subcategory', filters.subcategory);
    if (filters.brand) params.set('brand', filters.brand);
    if (filters.minPrice !== undefined && filters.minPrice > 0) params.set('minPrice', filters.minPrice.toString());
    if (filters.maxPrice !== undefined && filters.maxPrice < 1000) params.set('maxPrice', filters.maxPrice.toString());
    if (filters.rating !== undefined && filters.rating > 0) params.set('rating', filters.rating.toString());
    if (filters.inStock) params.set('inStock', 'true');
    if (filters.sortBy && filters.sortBy !== 'popular') params.set('sortBy', filters.sortBy);
    
    setSearchParams(params);
  }, [filters, searchQuery, setSearchParams]);

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      category: categorySlug ? categories.find(cat => cat.slug === categorySlug)?.name || '' : '',
      subcategory: '',
      brand: '',
      minPrice: 0,
      maxPrice: 1000,
      rating: 0,
      inStock: false,
      sortBy: 'popular'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        {categorySlug && (
          <div className="mb-8">
            {(() => {
              const category = categories.find(cat => cat.slug === categorySlug);
              return category ? (
                <div className="text-center">
                  <h1 className="text-3xl font-bold text-dark-900 mb-4">{category.name}</h1>
                  <p className="text-lg text-dark-600 max-w-2xl mx-auto mb-6">{category.description}</p>
                  <div className="flex justify-center space-x-4 text-sm text-dark-500">
                    <span>{filteredProducts.length} products</span>
                    <span>•</span>
                    <span>{category.subcategories.length} subcategories</span>
                  </div>
                </div>
              ) : null;
            })()}
          </div>
        )}

        {/* Results Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
          <div className="mb-4 lg:mb-0">
            <h2 className="text-xl font-semibold text-dark-900">
              {filteredProducts.length} products found
            </h2>
          </div>

          {/* Sort */}
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Sort by:</label>
            <select
              value={filters.sortBy || 'popular'}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff3e6c] focus:border-transparent"
            >
              <option value="popular">Most Popular</option>
              <option value="newest">Newest</option>
              <option value="rating">Highest Rated</option>
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
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Grid size={20} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list'
                  ? 'bg-primary-100 text-primary-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <List size={20} />
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="w-full flex items-center justify-center space-x-2 btn-secondary"
              >
                <SlidersHorizontal size={20} />
                <span>{showFilters ? 'Hide' : 'Show'} Filters</span>
              </button>
            </div>

            <div className={`lg:block ${showFilters ? 'block' : 'hidden'}`}>
              <div className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Filters</h3>
                  <button
                    onClick={clearFilters}
                    className="text-sm text-[#ff3e6c] hover:text-[#e6355f]"
                  >
                    Clear All
                  </button>
                </div>

                {/* Subcategory Filter */}
                {filters.category && (
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Subcategory</h4>
                    <select
                      value={filters.subcategory}
                      onChange={(e) => handleFilterChange('subcategory', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff3e6c] focus:border-transparent"
                    >
                      <option value="">All Subcategories</option>
                      {getSubcategories(filters.category).map(subcategory => (
                        <option key={subcategory.id} value={subcategory.name}>
                          {subcategory.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Brand Filter */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Brand</h4>
                  <select
                    value={filters.brand}
                    onChange={(e) => handleFilterChange('brand', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff3e6c] focus:border-transparent"
                  >
                    <option value="">All Brands</option>
                    {brands.map(brand => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range Filter */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Price Range</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Min Price</label>
                      <input
                        type="number"
                        value={filters.minPrice || 0}
                        onChange={(e) => handleFilterChange('minPrice', Number(e.target.value))}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff3e6c] focus:border-transparent"
                        min="0"
                        max={filters.maxPrice || 1000}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Max Price</label>
                      <input
                        type="number"
                        value={filters.maxPrice || 1000}
                        onChange={(e) => handleFilterChange('maxPrice', Number(e.target.value))}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff3e6c] focus:border-transparent"
                        min={filters.minPrice || 0}
                        max="1000"
                      />
                    </div>
                  </div>
                </div>

                {/* Rating Filter */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Minimum Rating</h4>
                  <select
                    value={filters.rating || 0}
                    onChange={(e) => handleFilterChange('rating', Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff3e6c] focus:border-transparent"
                  >
                    <option value={0}>Any Rating</option>
                    <option value={4}>4+ Stars</option>
                    <option value={3}>3+ Stars</option>
                    <option value={2}>2+ Stars</option>
                  </select>
                </div>

                {/* Stock Filter */}
                <div className="mb-6">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={filters.inStock || false}
                      onChange={(e) => handleFilterChange('inStock', e.target.checked)}
                      className="rounded border-gray-300 text-[#ff3e6c] focus:ring-[#ff3e6c]"
                    />
                    <span className="text-sm">In Stock Only</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div className="flex-1">
            {/* Products Grid/List */}
            {filteredProducts.length > 0 ? (
              <div className={viewMode === 'grid' 
                ? 'grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                : 'space-y-6'
              }>
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    variant={viewMode}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-gray-400 mb-4">
                  <SlidersHorizontal size={64} className="mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your filters or search terms
                </p>
                <button
                  onClick={clearFilters}
                  className="btn-primary"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
