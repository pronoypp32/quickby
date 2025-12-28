'use client';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-16 lg:pt-20"></div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            About DigiStore
          </h1>
          <p className="text-xl sm:text-2xl text-purple-200">
            Your trusted marketplace for premium digital products
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Our Story */}
        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="mb-4">
              Welcome to <span className="font-bold text-purple-600">DigiStore</span>, your premier destination for high-quality digital products. 
              Founded with a vision to make digital resources accessible to everyone, we&apos;ve built a platform that connects 
              creators with customers worldwide.
            </p>
            <p className="mb-4">
              We believe in the power of digital products to transform businesses, enhance creativity, and unlock potential. 
              Whether you&apos;re looking for software tools, educational resources, design templates, or creative assets, 
              we&apos;ve curated a marketplace that delivers value and quality.
            </p>
            <p>
              Our mission is simple: provide instant access to premium digital products with secure transactions, 
              reliable downloads, and exceptional customer support.
            </p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Why Choose Us?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: '🔒',
                title: 'Secure Payment',
                description: 'Your transactions are protected with industry-standard encryption'
              },
              {
                icon: '⚡',
                title: 'Instant Download',
                description: 'Get immediate access to your purchased products'
              },
              {
                icon: '✅',
                title: 'Quality Guaranteed',
                description: 'All products are carefully reviewed and tested'
              },
              {
                icon: '💬',
                title: '24/7 Support',
                description: 'Our team is always here to help you'
              }
            ].map((feature, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Values */}
        <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-2xl shadow-xl p-8 lg:p-12 mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Core Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Trust',
                description: 'We build lasting relationships through transparency and reliability'
              },
              {
                title: 'Quality',
                description: 'Every product meets our high standards of excellence'
              },
              {
                title: 'Innovation',
                description: 'We continuously improve to serve you better'
              }
            ].map((value, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✨</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-purple-100">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Our Impact</h2>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              { number: '10,000+', label: 'Happy Customers' },
              { number: '5,000+', label: 'Digital Products' },
              { number: '50,000+', label: 'Downloads' },
              { number: '24/7', label: 'Support Available' }
            ].map((stat, idx) => (
              <div key={idx} className="text-center p-4">
                <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}