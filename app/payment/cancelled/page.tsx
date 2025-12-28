'use client';

import Link from 'next/link';

export default function PaymentCancelledPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
          
          {/* Cancelled Icon */}
          <div className="mb-6">
            <div className="mx-auto w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-12 h-12 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Cancelled</h1>
            <p className="text-gray-600">
              You have cancelled the payment process.
            </p>
          </div>

          {/* Info */}
          <div className="bg-yellow-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600">
              Your order has been saved in your cart. You can complete it anytime.
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Link
              href="/cart"
              className="block w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition"
            >
              Back to Cart
            </Link>
            <Link
              href="/shop"
              className="block w-full py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition"
            >
              Continue Shopping
            </Link>
          </div>

          {/* Help */}
          <div className="mt-8 pt-6 border-t">
            <p className="text-sm text-gray-600 mb-2">Need help?</p>
            <Link
              href="/contact"
              className="text-purple-600 hover:text-purple-700 font-semibold text-sm"
            >
              Contact Support →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}