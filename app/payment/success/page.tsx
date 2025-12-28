'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { confirmPaymentSuccess } from '@/lib/api';

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [processing, setProcessing] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    handlePaymentSuccess();
  }, []);

  const handlePaymentSuccess = async () => {
    const paymentId = searchParams.get('payment_id');
    const tranId = searchParams.get('tran_id');
    const valId = searchParams.get('val_id');
    const amount = searchParams.get('amount');
    const cardType = searchParams.get('card_type');

    if (!tranId || !valId) {
      setError('Invalid payment response');
      setProcessing(false);
      return;
    }

    try {
      await confirmPaymentSuccess({
        tran_id: tranId,
        val_id: valId,
        amount: amount,
        card_type: cardType,
        bank_tran_id: searchParams.get('bank_tran_id'),
        card_no: searchParams.get('card_no'),
        card_issuer: searchParams.get('card_issuer'),
        card_brand: searchParams.get('card_brand'),
        store_amount: searchParams.get('store_amount'),
      });

      setProcessing(false);
    } catch (err) {
      console.error('Payment confirmation error:', err);
      setError('Failed to confirm payment');
      setProcessing(false);
    }
  };

  if (processing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Processing your payment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Error</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link
            href="/cart"
            className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition"
          >
            Back to Cart
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
          
          {/* Success Animation */}
          <div className="mb-6">
            <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
            <p className="text-gray-600">
              Your order has been confirmed and you can now download your products.
            </p>
          </div>

          {/* Order Details */}
          <div className="bg-green-50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center text-sm text-gray-600 mb-2">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Payment Confirmed
            </div>
            <p className="text-xs text-gray-500">
              Transaction ID: {searchParams.get('tran_id')}
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Link
              href="/orders"
              className="block w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition"
            >
              View My Orders
            </Link>
            <Link
              href="/shop"
              className="block w-full py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition"
            >
              Continue Shopping
            </Link>
          </div>

          {/* Features */}
          <div className="mt-8 pt-6 border-t space-y-2 text-sm text-gray-600">
            <div className="flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Instant download available
            </div>
            <div className="flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Receipt sent to your email
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}