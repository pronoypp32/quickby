'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function PaymentFailedPage() {
  const searchParams = useSearchParams();
  const reason = searchParams.get('error') || 'Payment was not completed';

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center p-4">
      <div className="pt-16 lg:pt-20"></div>
      
      <div className="max-w-lg w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
          
          {/* Failed Icon */}
          <div className="mb-6">
            <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-4 animate-pulse">
              <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Failed</h1>
            <p className="text-gray-600 text-lg">
              {reason}
            </p>
          </div>

          {/* Error Details */}
          <div className="bg-red-50 rounded-lg p-4 mb-6 border border-red-100">
            <p className="text-sm text-gray-700 font-medium">
              Your order has not been charged. Please try again or contact support if the problem persists.
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Link
              href="/cart"
              className="block w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105"
            >
              🔄 Try Again
            </Link>
            <Link
              href="/shop"
              className="block w-full py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-all"
            >
              🛍️ Continue Shopping
            </Link>
            <Link
              href="/contact"
              className="block w-full py-3 text-purple-600 hover:text-purple-700 font-semibold border border-purple-200 rounded-lg hover:bg-purple-50 transition-all"
            >
              💬 Contact Support
            </Link>
          </div>

          {/* Help Info */}
          <div className="mt-8 pt-6 border-t text-sm">
            <p className="text-gray-700 font-semibold mb-3">Common reasons for payment failure:</p>
            <ul className="text-left space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Insufficient funds in your account</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Incorrect card details entered</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Card not enabled for online transactions</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Bank declined the transaction</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Payment gateway timeout</span>
              </li>
            </ul>
          </div>

          {/* Support Info */}
          <div className="mt-6 p-4 bg-purple-50 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Need immediate help?</strong><br />
              Contact our support team at{' '}
              <a href="mailto:support@digistore.com" className="text-purple-600 hover:underline">
                support@digistore.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}