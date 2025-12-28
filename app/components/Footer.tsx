'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  // Hide footer on login/register pages
  if (pathname === '/login' || pathname === '/register') {
    return null;
  }

  return (
    <footer className="relative bg-linear-to-br from-gray-900 via-purple-900 to-indigo-900 text-white overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-12 h-12 bg-linear-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center transform transition-all duration-300 group-hover:rotate-12 group-hover:scale-110 shadow-2xl">
                  <span className="text-2xl font-bold">D</span>
                </div>
                <div className="absolute inset-0 w-12 h-12 bg-pink-500 rounded-xl blur-lg opacity-50 -z-10"></div>
              </div>
              <span className="text-2xl font-bold">DigiStore</span>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your trusted marketplace for premium digital products. Download instantly, use forever.
            </p>
            
            {/* Social Links with Hover Animation */}
            <div className="flex space-x-4">
              {[
                { icon: '📘', href: '#', label: 'Facebook' },
                { icon: '🐦', href: '#', label: 'Twitter' },
                { icon: '📷', href: '#', label: 'Instagram' },
                { icon: '💼', href: '#', label: 'LinkedIn' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-linear-to-r hover:from-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 backdrop-blur-sm"
                >
                  <span className="text-xl">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <span className="mr-2">🔗</span>
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { href: '/', label: 'Home' },
                { href: '/shop', label: 'Shop' },
                { href: '/about', label: 'About Us' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white hover:translate-x-2 inline-block transition-all duration-300"
                  >
                    → {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <span className="mr-2">📦</span>
              Categories
            </h3>
            <ul className="space-y-2">
              {[
                'Software & Tools',
                'E-books & PDFs',
                'Templates & Graphics',
                'Video Courses',
              ].map((category) => (
                <li key={category}>
                  <Link
                    href="/shop"
                    className="text-gray-300 hover:text-white hover:translate-x-2 inline-block transition-all duration-300"
                  >
                    → {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <span className="mr-2">📬</span>
              Newsletter
            </h3>
            <p className="text-gray-300 text-sm mb-4">
              Subscribe to get updates on new products and exclusive deals.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 backdrop-blur-sm transition-all duration-300"
              />
              <button className="px-6 py-2 bg-linear-to-r from-purple-500 to-pink-500 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Divider with Gradient */}
        <div className="h-px bg-linear-to-r from-transparent via-purple-500 to-transparent mb-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          
          {/* Copyright */}
          <p className="text-gray-400 text-sm text-center md:text-left">
            © {currentYear} <span className="font-semibold text-white">DigiStore</span>. All rights reserved.
          </p>

          {/* Legal Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            {[
              { href: '#', label: 'Privacy Policy' },
              { href: '#', label: 'Terms of Service' },
              { href: '#', label: 'Refund Policy' },
              { href: '#', label: 'Support' },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Payment Methods */}
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-400 mr-2">Secure Payment:</span>
            {['💳', '💰', '🏦', '📱'].map((icon, i) => (
              <div
                key={i}
                className="w-8 h-8 bg-white/10 rounded flex items-center justify-center backdrop-blur-sm"
              >
                <span className="text-sm">{icon}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 pt-8 border-t border-white/10">
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <span className="text-lg">🔒</span>
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-lg">⚡</span>
              <span>Instant Download</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-lg">✅</span>
              <span>Money Back Guarantee</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-lg">💬</span>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="absolute bottom-8 right-8 w-12 h-12 bg-linear-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-110 shadow-2xl"
        aria-label="Scroll to top"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </footer>
  );
}
