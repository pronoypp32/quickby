'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { confirmPaymentSuccess } from '@/lib/api';

export default function TestGatewayPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [processing, setProcessing] = useState(false);

  const paymentId = searchParams.get('payment_id');
  const orderId = searchParams.get('order_id');
  const amount = searchParams.get('amount');

  const handlePaymentSuccess = async () => {
    setProcessing(true);
    
    // Simulate payment processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
      const tranId = paymentId;
      const valId = `TEST_${Date.now()}`;
      
      await confirmPaymentSuccess({
        tran_id: tranId,
        val_id: valId,
        amount: amount,
        card_type: 'TEST-VISA',
        bank_tran_id: `BANK_${Date.now()}`,
        card_no: '4111XXXXXXXX1111',
        card_issuer: 'Test Bank',
        card_brand: 'VISA',
        store_amount: amount,
      });

      router.push(`/payment/success?payment_id=${paymentId}&tran_id=${tranId}&val_id=${valId}&amount=${amount}&card_type=TEST-VISA`);
    } catch (error) {
      console.error('Payment error:', error);
      setProcessing(false);
      alert('Payment failed. Please try again.');
    }
  };

  const handlePaymentFail = () => {
    router.push(`/payment/failed?payment_id=${paymentId}&error=User cancelled payment`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          
          <div className="text-center mb-6">
            <div className="inline-flex items-center px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-bold mb-4">
              <span className="mr-2">🧪</span>
              TEST MODE
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Test Payment Gateway</h1>
            <p className="text-sm text-gray-600">
              Simulate payment for testing
            </p>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-5 mb-6 border border-purple-200">
            <h2 className="font-bold text-gray-900 mb-3 flex items-center">
              <span className="mr-2">📋</span>
              Payment Details
            </h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Order ID:</span>
                <span className="font-mono text-xs bg-white px-2 py-1 rounded">{orderId?.slice(0, 8)}...</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Amount:</span>
                <span className="font-bold text-xl text-purple-600">${amount}</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-200">
            <h3 className="font-semibold text-gray-900 mb-2 text-sm flex items-center">
              <span className="mr-2">💳</span>
              Test Card Info
            </h3>
            <div className="text-xs text-gray-700 space-y-1 font-mono">
              <p>Card: 4111 1111 1111 1111</p>
              <p>CVV: 123 | Expiry: 12/25</p>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <button
              onClick={handlePaymentSuccess}
              disabled={processing}
              className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold text-lg hover:from-green-600 hover:to-emerald-700 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {processing ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <span className="mr-2">✓</span>
                  Pay Now (Test)
                </span>
              )}
            </button>

            <button
              onClick={handlePaymentFail}
              disabled={processing}
              className="w-full py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all disabled:opacity-50"
            >
              <span className="flex items-center justify-center">
                <span className="mr-2">✗</span>
                Cancel Payment
              </span>
            </button>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <p className="text-xs text-orange-800">
              <strong>⚠️ This is test mode.</strong> No real payment will be processed. 
              To enable real payments, configure SSLCommerz credentials and set TEST_MODE = False in views.py
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}