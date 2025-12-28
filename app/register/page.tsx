'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { register } from '@/lib/api';
import Link from 'next/link';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
    first_name: '',
    last_name: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (formData.password !== formData.password2) {
      setError("Passwords don't match!");
      setLoading(false);
      return;
    }

    try {
      await register(formData);
      setSuccess(true);
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError((err as any /* eslint-disable-line @typescript-eslint/no-explicit-any */)?.response?.data?.username?.[0] || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-linear-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Simplified Background */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-3 sm:p-4">
        <div className="w-full max-w-md">
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-8">
            
            {/* Success Animation */}
            {success && (
              <div className="absolute inset-0 flex items-center justify-center bg-green-500/95 rounded-2xl sm:rounded-3xl z-50">
                <div className="text-center p-4">
                  <div className="text-5xl mb-3">✓</div>
                  <p className="text-white text-lg font-bold">Success!</p>
                  <p className="text-white/90 text-sm mt-2">Redirecting to login...</p>
                </div>
              </div>
            )}

            {/* Header */}
            <div className="text-center mb-4 sm:mb-6">
              <h1 className="text-2xl sm:text-4xl font-bold text-white mb-1 sm:mb-2">
                Create Account
              </h1>
              <p className="text-white/70 text-sm sm:text-base">
                Join us today
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
                <p className="text-red-200 text-xs sm:text-sm text-center">{error}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-2 sm:gap-4">
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  placeholder="First Name"
                  required
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base bg-white/10 border border-white/20 rounded-lg sm:rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:bg-white/20 transition-colors"
                />
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  placeholder="Last Name"
                  required
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base bg-white/10 border border-white/20 rounded-lg sm:rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:bg-white/20 transition-colors"
                />
              </div>

              {/* Username */}
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                required
                className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base bg-white/10 border border-white/20 rounded-lg sm:rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:bg-white/20 transition-colors"
              />

              {/* Email */}
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                required
                className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base bg-white/10 border border-white/20 rounded-lg sm:rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:bg-white/20 transition-colors"
              />

              {/* Password */}
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base bg-white/10 border border-white/20 rounded-lg sm:rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:bg-white/20 transition-colors"
              />

              {/* Confirm Password */}
              <input
                type="password"
                name="password2"
                value={formData.password2}
                onChange={handleChange}
                placeholder="Confirm Password"
                required
                className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base bg-white/10 border border-white/20 rounded-lg sm:rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:bg-white/20 transition-colors"
              />

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 sm:py-3 text-sm sm:text-base bg-linear-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg sm:rounded-xl hover:from-purple-600 hover:to-pink-600 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5 mr-2" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating...
                  </span>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>

            {/* Login Link */}
            <div className="mt-4 sm:mt-6 text-center">
              <p className="text-white/70 text-xs sm:text-sm">
                Already have an account?{' '}
                <Link href="/login" className="text-purple-300 hover:text-purple-200 font-semibold">
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}













