'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { getProducts, getCategories, searchProducts } from '@/lib/api';

interface Product {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  price: number;
  discount_price: number | null;
  final_price: number;
  discount_percentage: number;
  thumbnail: string;
  rating: number;
  downloads: number;
  category_name: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

export default function ShopPage() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    loadCategories();
    const categoryFromUrl = searchParams.get('category');
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [searchParams]);

  useEffect(() => {
    loadProducts();
  }, [selectedCategory, minPrice, maxPrice]);

  const loadCategories = async () => {
    try {
      const cats = await getCategories();
      console.log('Categories loaded:', cats); // Debug log
      
      // Handle both array and object responses
      if (Array.isArray(cats)) {
        setCategories(cats);
      } else if (cats.results && Array.isArray(cats.results)) {
        setCategories(cats.results);
      } else {
        console.error('Invalid categories format:', cats);
        setCategories([]);
      }
    } catch (error) {
      console.error('Failed to load categories:', error);
      setCategories([]);
    }
  };

  const loadProducts = async () => {
    setLoading(true);
    try {
      const params: any = {};
      if (selectedCategory) params.category = selectedCategory;
      if (minPrice) params.min_price = parseFloat(minPrice);
      if (maxPrice) params.max_price = parseFloat(maxPrice);

      const data = await getProducts(params);
      console.log('Products loaded:', data); // Debug log
      
      // Handle both paginated and non-paginated responses
      if (Array.isArray(data)) {
        setProducts(data);
      } else if (data.results) {
        setProducts(data.results);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error('Failed to load products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      loadProducts();
      return;
    }
    
    setLoading(true);
    try {
      const filters: any = {};
      if (selectedCategory) filters.category = selectedCategory;
      if (minPrice) filters.min_price = parseFloat(minPrice);
      if (maxPrice) filters.max_price = parseFloat(maxPrice);

      const data = await searchProducts(searchQuery, filters);
      setProducts(data);
    } catch (error) {
      console.error('Search failed:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setMinPrice('');
    setMaxPrice('');
    setSearchQuery('');
    loadProducts();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Padding for fixed navbar */}
      <div className="pt-16 lg:pt-20"></div>

      {/* Page Header */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Browse Products
          </h1>
          <p className="text-lg text-purple-100">
            Discover amazing digital products
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <aside className="lg:w-64 space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              
              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  🔍 Search
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    placeholder="Search products..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleSearch}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                  >
                    Go
                  </button>
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  📦 Categories
                </label>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory('')}
                    className={`w-full text-left px-4 py-2 rounded-lg transition ${
                      !selectedCategory
                        ? 'bg-purple-100 text-purple-700 font-semibold'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    All Products
                  </button>
                  {Array.isArray(categories) && categories.length > 0 ? (
                    categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.slug)}
                        className={`w-full text-left px-4 py-2 rounded-lg transition ${
                          selectedCategory === cat.slug
                            ? 'bg-purple-100 text-purple-700 font-semibold'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 px-4 py-2">No categories available</p>
                  )}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  💰 Price Range
                </label>
                <div className="space-y-2">
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    placeholder="Min price"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    placeholder="Max price"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              {/* Clear Filters */}
              <button
                onClick={clearFilters}
                className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-semibold"
              >
                Clear Filters
              </button>
            </div>
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            
            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-600">
                {loading ? 'Loading...' : `${products.length} products found`}
              </p>
            </div>

            {/* Products */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-white rounded-xl shadow-md p-4 animate-pulse">
                    <div className="bg-gray-300 h-48 rounded-lg mb-4"></div>
                    <div className="bg-gray-300 h-4 rounded mb-2"></div>
                    <div className="bg-gray-300 h-4 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.slug}`}
                    className="group"
                  >
                    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition transform hover:-translate-y-2">
                      
                      {/* Product Image */}
                      <div className="relative h-48 bg-gradient-to-br from-purple-100 to-blue-100">
                        {product.thumbnail ? (
                          <img
                            src={product.thumbnail}
                            alt={product.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-6xl">
                            📦
                          </div>
                        )}
                        
                        {/* Discount Badge */}
                        {product.discount_percentage > 0 && (
                          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-lg text-sm font-bold">
                            -{product.discount_percentage}%
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="p-4">
                        <p className="text-xs text-purple-600 font-semibold mb-1">
                          {product.category_name}
                        </p>
                        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition">
                          {product.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {product.short_description}
                        </p>

                        {/* Rating & Downloads */}
                        <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                          <span className="flex items-center">
                            ⭐ {parseFloat(product.rating || 0).toFixed(1)}
                          </span>
                          <span>📥 {product.downloads || 0}</span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center justify-between">
                          <div>
                            {product.discount_price ? (
                              <>
                                <span className="text-xl font-bold text-purple-600">
                                  ${product.discount_price}
                                </span>
                                <span className="text-sm text-gray-400 line-through ml-2">
                                  ${product.price}
                                </span>
                              </>
                            ) : (
                              <span className="text-xl font-bold text-purple-600">
                                ${product.price}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your filters or search query</p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}