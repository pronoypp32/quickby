'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getFeaturedProducts, getCategories } from '@/lib/api';

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
  image: string;
  products_count: number;
}

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [products, cats] = await Promise.all([
        getFeaturedProducts(),
        getCategories()
      ]);
      
      console.log('Featured products:', products);
      console.log('Categories:', cats);
      
      // Handle array or paginated response
      const productList = Array.isArray(products) ? products : products.results || [];
      const categoryList = Array.isArray(cats) ? cats : cats.results || [];
      
      setFeaturedProducts(productList);
      setCategories(categoryList);
    } catch (error) {
      console.error('Failed to load data:', error);
      setFeaturedProducts([]);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-pink-50/30">
      
      {/* Hero Section - Premium 3D Design */}
      <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-40 left-1/2 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-lg rounded-full shadow-lg mb-8 border border-purple-100">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
              </span>
              <span className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                New Products Added Daily
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent drop-shadow-sm">
                Premium Digital
              </span>
              <br />
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Products Store
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Discover amazing <span className="font-bold text-purple-600">software</span>, <span className="font-bold text-pink-600">ebooks</span>, <span className="font-bold text-indigo-600">templates</span> and more. 
              <span className="block mt-2 text-lg">⚡ Instant download after purchase</span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/shop"
                className="group relative px-8 py-4 rounded-xl font-bold text-lg text-white overflow-hidden transition-all duration-300 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)',
                  boxShadow: '0 20px 40px -15px rgba(168, 85, 247, 0.5)'
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Browse Products
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>

              <Link 
                href="/about"
                className="px-8 py-4 rounded-xl font-bold text-lg text-gray-700 bg-white hover:bg-gray-50 transition-all duration-300 shadow-xl hover:shadow-2xl border border-gray-200 hover:scale-105"
              >
                Learn More
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              {[
                { number: '1000+', label: 'Products' },
                { number: '5000+', label: 'Happy Customers' },
                { number: '24/7', label: 'Support' }
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600 font-semibold mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section - Modern Grid */}
      {categories.length > 0 && (
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl lg:text-5xl font-black mb-4">
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Shop by Category
                </span>
              </h2>
              <p className="text-gray-600 text-lg">Find exactly what you&apos;re looking for</p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 lg:gap-6">
              {categories.map((category, idx) => (
                <Link
                  key={category.id}
                  href={`/shop?category=${category.slug}`}
                  className="group"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div 
                    className="relative bg-white rounded-2xl p-6 text-center transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden border border-gray-100"
                    style={{
                      boxShadow: '0 10px 30px -15px rgba(168, 85, 247, 0.2)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-8px) scale(1.05)';
                      e.currentTarget.style.boxShadow = '0 20px 50px -15px rgba(168, 85, 247, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.boxShadow = '0 10px 30px -15px rgba(168, 85, 247, 0.2)';
                    }}
                  >
                    {/* Hover Gradient Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="relative z-10">
                      <div className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">📦</div>
                      <h3 className="font-bold text-gray-900 mb-1 group-hover:text-purple-600 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-500">{category.products_count} items</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Products - Premium Cards */}
      <section className="py-20 bg-gradient-to-br from-white to-purple-50/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl lg:text-5xl font-black mb-2">
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Featured Products
                </span>
              </h2>
              <p className="text-gray-600">Handpicked for you</p>
            </div>
            <Link 
              href="/shop" 
              className="mt-4 sm:mt-0 group flex items-center gap-2 text-purple-600 hover:text-purple-700 font-bold text-lg"
            >
              View All 
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-2xl shadow-lg p-4 animate-pulse">
                  <div className="bg-gray-200 h-56 rounded-xl mb-4"></div>
                  <div className="bg-gray-200 h-4 rounded mb-3"></div>
                  <div className="bg-gray-200 h-4 rounded w-2/3 mb-3"></div>
                  <div className="bg-gray-200 h-8 rounded"></div>
                </div>
              ))}
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredProducts.map((product, idx) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="group"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <div 
                    className="bg-white rounded-2xl overflow-hidden transition-all duration-300 border border-gray-100"
                    style={{
                      boxShadow: '0 10px 30px -15px rgba(168, 85, 247, 0.2)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-8px)';
                      e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(168, 85, 247, 0.35)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 10px 30px -15px rgba(168, 85, 247, 0.2)';
                    }}
                  >
                    
                    {/* Product Image */}
                    <div className="relative h-56 bg-gradient-to-br from-purple-100 via-pink-100 to-indigo-100 overflow-hidden">
                      {product.thumbnail ? (
                        <img
                          src={product.thumbnail}
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-7xl group-hover:scale-110 transition-transform duration-500">
                          📦
                        </div>
                      )}
                      
                      {/* Discount Badge */}
                      {product.discount_percentage > 0 && (
                        <div 
                          className="absolute top-3 right-3 px-3 py-1.5 rounded-lg text-sm font-black text-white shadow-lg"
                          style={{
                            background: 'linear-gradient(135deg, #ef4444 0%, #ec4899 100%)',
                            boxShadow: '0 8px 20px -8px rgba(239, 68, 68, 0.6)'
                          }}
                        >
                          -{product.discount_percentage}%
                        </div>
                      )}

                      {/* Category Badge */}
                      <div className="absolute top-3 left-3 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-lg text-xs font-bold text-purple-600 shadow-md">
                        {product.category_name}
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-5">
                      <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 text-lg group-hover:text-purple-600 transition-colors leading-tight">
                        {product.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                        {product.short_description}
                      </p>

                      {/* Rating & Downloads */}
                      <div className="flex items-center gap-4 text-sm mb-4">
                        <span className="flex items-center gap-1 text-yellow-500 font-semibold">
                      ⭐ {Number(product.rating || 0).toFixed(1)}
                        </span>
                        <span className="flex items-center gap-1 text-gray-500">
                          📥 {product.downloads || 0}
                        </span>
                      </div>

                      {/* Price & Button */}
                      <div className="flex items-center justify-between">
                        <div>
                          {product.discount_price ? (
                            <div className="flex flex-col">
                              <span className="text-2xl font-black text-purple-600">
                                ${product.discount_price}
                              </span>
                              <span className="text-sm text-gray-400 line-through">
                                ${product.price}
                              </span>
                            </div>
                          ) : (
                            <span className="text-2xl font-black text-purple-600">
                              ${product.price}
                            </span>
                          )}
                        </div>
                        <button 
                          className="px-4 py-2 rounded-lg font-bold text-white text-sm group-hover:scale-105 transition-transform"
                          style={{
                            background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                            boxShadow: '0 8px 20px -8px rgba(168, 85, 247, 0.5)'
                          }}
                        >
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📦</div>
              <p className="text-gray-600 text-lg">No featured products available at the moment</p>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Why Choose Us?
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '⚡', title: 'Instant Delivery', desc: 'Get your digital products immediately after purchase' },
              { icon: '🔒', title: 'Secure Payments', desc: 'Your transactions are 100% secure and encrypted' },
              { icon: '🎯', title: 'Quality Products', desc: 'Handpicked premium products from verified sellers' }
            ].map((feature, idx) => (
              <div 
                key={idx}
                className="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 transition-all duration-300"
                style={{
                  boxShadow: '0 10px 30px -15px rgba(168, 85, 247, 0.2)'
                }}
              >
                <div className="text-6xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Premium */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/90 mb-10 leading-relaxed">
            Join thousands of satisfied customers and download premium digital products instantly.
          </p>
          <Link
            href="/register"
            className="inline-block px-10 py-5 bg-white text-purple-600 rounded-xl text-lg font-black hover:bg-gray-50 transition-all duration-300 shadow-2xl hover:scale-105"
          >
            Create Free Account →
          </Link>
        </div>
      </section>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(168, 85, 247, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(168, 85, 247, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
        }
      `}</style>
    </div>
  );
}