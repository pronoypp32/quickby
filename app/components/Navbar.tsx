'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { isAuthenticated, removeToken, getCart } from '@/lib/api';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const router = useRouter();
  const pathname = usePathname();

  const loadCartCount = useCallback(async () => {
    if (isAuthenticated()) {
      try {
        const cart = await getCart();
        setCartCount(cart.total_items || 0);
      } catch (error) {
        console.error('Failed to load cart:', error);
      }
    }
  }, []);

  useEffect(() => {
    setIsLoggedIn(isAuthenticated());
    loadCartCount();

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Scrolled state
      setIsScrolled(currentScrollY > 20);
      
      // Hide/Show navbar based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down & past 100px
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadCartCount, lastScrollY]);

  const handleLogout = () => {
    removeToken();
    setIsLoggedIn(false);
    setCartCount(0);
    router.push('/login');
  };

  const isActive = (path: string) => pathname === path;

  if (pathname === '/login' || pathname === '/register') {
    return null;
  }

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-black/95 backdrop-blur-xl shadow-2xl border-b border-purple-500/30' 
            : 'bg-black'
        } ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo - Premium Design */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                {/* Glow Effect */}
                <div className={`absolute inset-0 w-14 h-14 rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-all duration-500 ${
                  isScrolled 
                    ? 'bg-gradient-to-br from-indigo-500 to-purple-500' 
                    : 'bg-gradient-to-br from-yellow-300 to-pink-300'
                }`}></div>
                
                {/* Main Logo */}
                <div className={`relative w-14 h-14 rounded-2xl flex items-center justify-center transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-2xl ${
                  isScrolled 
                    ? 'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500' 
                    : 'bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600'
                }`}>
                  <span className="text-3xl font-black text-white drop-shadow-lg">Q</span>
                </div>
              </div>
              
              <div className="flex flex-col -space-y-1">
                <span className={`text-2xl font-black tracking-tight transition-all duration-300 ${
                  isScrolled 
                    ? 'bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent' 
                    : 'text-white drop-shadow-lg'
                }`}>
                  QuickBY
                </span>
                <span className={`text-xs font-semibold tracking-widest uppercase ${
                  isScrolled ? 'text-purple-400' : 'text-purple-300'
                }`}>
                  Premium Store
                </span>
              </div>
            </Link>

            {/* Desktop Navigation - Modern Style */}
            <div className="hidden lg:flex items-center space-x-2">
              {[
                { path: '/', label: 'Home' },
                { path: '/shop', label: 'Shop' },
                { path: '/about', label: 'About' },
                { path: '/contact', label: 'Contact' },
              ].map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`relative px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 group ${
                    isActive(item.path)
                      ? 'text-white bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg shadow-purple-500/50'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  {isActive(item.path) && (
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-400 to-purple-400 opacity-20 animate-pulse"></div>
                  )}
                </Link>
              ))}
            </div>

            {/* Right Side - Enhanced Icons */}
            <div className="flex items-center space-x-3">
              
              {/* Cart - Premium Badge */}
              {isLoggedIn && (
                <Link 
                  href="/cart" 
                  className={`relative p-3 rounded-xl transition-all duration-300 hover:scale-110 group ${
                    isScrolled 
                      ? 'hover:bg-purple-500/20 text-purple-400' 
                      : 'hover:bg-white/10 text-white'
                  }`}
                >
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 min-w-[24px] h-6 px-1.5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg shadow-red-500/50 animate-bounce">
                      {cartCount}
                    </span>
                  )}
                </Link>
              )}

              {/* Desktop Auth Buttons - Premium */}
              {isLoggedIn ? (
                <div className="hidden lg:flex items-center space-x-3">
                  <Link 
                    href="/orders" 
                    className={`px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 ${
                      isScrolled 
                        ? 'text-gray-300 hover:bg-purple-500/20 hover:text-purple-400' 
                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    My Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="relative px-6 py-2.5 bg-gradient-to-r from-red-500 via-pink-500 to-rose-500 text-white rounded-xl font-bold overflow-hidden group shadow-xl shadow-red-500/50 hover:shadow-2xl hover:shadow-red-500/70 transition-all duration-300"
                  >
                    <span className="relative z-10">Logout</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-pink-600 to-rose-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  </button>
                </div>
              ) : (
                <div className="hidden lg:flex items-center space-x-3">
                  <Link 
                    href="/login" 
                    className={`px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 ${
                      isScrolled 
                        ? 'text-gray-300 hover:bg-purple-500/20 hover:text-purple-400' 
                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    Login
                  </Link>
                  <Link 
                    href="/register" 
                    className="relative px-6 py-2.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-xl font-bold overflow-hidden group shadow-xl shadow-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/70 transition-all duration-300"
                  >
                    <span className="relative z-10">Sign Up</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button - Enhanced */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`lg:hidden p-3 rounded-xl transition-all duration-300 ${
                  isScrolled 
                    ? 'text-purple-400 hover:bg-purple-500/20' 
                    : 'text-white hover:bg-white/10'
                }`}
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu - Premium Design */}
        <div 
          className={`lg:hidden overflow-hidden transition-all duration-500 ${
            isMobileMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className={`px-4 py-6 space-y-2 ${
            isScrolled 
              ? 'bg-black border-t border-purple-500/30' 
              : 'bg-black/95'
          }`}>
            {[
              { path: '/', label: 'Home', icon: '🏠' },
              { path: '/shop', label: 'Shop', icon: '🛍️' },
              { path: '/about', label: 'About', icon: 'ℹ️' },
              { path: '/contact', label: 'Contact', icon: '📧' },
            ].map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-4 px-5 py-4 rounded-xl transition-all duration-300 group ${
                  isActive(item.path)
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-purple-500/50'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span className="text-2xl group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
                <span className="font-semibold text-lg">{item.label}</span>
              </Link>
            ))}
            
            {isLoggedIn ? (
              <>
                <Link
                  href="/orders"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-4 px-5 py-4 rounded-xl transition-all duration-300 group ${
                    isScrolled 
                      ? 'text-gray-300 hover:bg-purple-500/20 hover:text-white' 
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-300">📦</span>
                  <span className="font-semibold text-lg">My Orders</span>
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center space-x-4 px-5 py-4 rounded-xl bg-gradient-to-r from-red-500 via-pink-500 to-rose-500 text-white font-bold shadow-xl shadow-red-500/50 hover:shadow-2xl transition-all duration-300 group"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-300">🚪</span>
                  <span className="text-lg">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-4 px-5 py-4 rounded-xl transition-all duration-300 group ${
                    isScrolled 
                      ? 'text-gray-300 hover:bg-purple-500/20 hover:text-white' 
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-300">🔑</span>
                  <span className="font-semibold text-lg">Login</span>
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full flex items-center space-x-4 px-5 py-4 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold shadow-xl shadow-purple-500/50 hover:shadow-2xl transition-all duration-300 group"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-300">✨</span>
                  <span className="text-lg">Sign Up</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
      
      {/* Spacer to prevent content from going under fixed navbar */}
      <div className="h-20"></div>
    </>
  );
}