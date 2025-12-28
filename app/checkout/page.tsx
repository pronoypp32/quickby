'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getOrderDetail, initiatePayment, isAuthenticated } from '@/lib/api';

interface OrderItem {
  id: number;
  product: {
    title: string;
    thumbnail: string;
  };
  price: number;
}

interface Order {
  order_id: string;
  items: OrderItem[];
  total_amount: number;
  status: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id');

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  
  const [formData, setFormData] = useState({
    phone: '',
    address: '',
    city: 'Dhaka',
    postcode: '1000'
  });

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }
    
    if (!orderId) {
      router.push('/cart');
      return;
    }

    loadOrder();
  }, [orderId]);

  const loadOrder = async () => {
    if (!orderId) return;
    
    try {
      const data = await getOrderDetail(orderId);
      
      if (data.status === 'COMPLETED') {
        router.push('/orders');
        return;
      }
      
      setOrder(data);
    } catch (error) {
      console.error('Failed to load order:', error);
      router.push('/cart');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePayment = async () => {
    if (!order) {
      alert('Order not found');
      return;
    }

    // Validate form
    if (!formData.phone || !formData.address) {
      alert('Please fill all required fields (Phone and Address)');
      return;
    }

    // Validate phone number format
    if (formData.phone.length < 11) {
      alert('Please enter a valid phone number');
      return;
    }

    setProcessing(true);
    
    try {
      // Prepare payment data with all required fields
      const paymentData = {
        order_id: order.order_id,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        postcode: formData.postcode,
        frontend_url: window.location.origin
      };

      console.log('🔄 Initiating payment with data:', paymentData);

      // Call API to initiate payment
      const response = await initiatePayment(paymentData);
      
      console.log('✅ Payment API Response:', response);

      // Check if response is valid
      if (response && response.success && response.gateway_url) {
        console.log('🌐 Redirecting to payment gateway:', response.gateway_url);
        
        // Add small delay to ensure console logs are visible
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Redirect to payment gateway (test or real)
        window.location.href = response.gateway_url;
      } else {
        console.error('❌ Invalid payment response:', response);
        alert('Failed to initiate payment. Please try again.');
        setProcessing(false);
      }
    } catch (error: any) {
      console.error('❌ Payment initiation error:', error);
      
      // Get detailed error message
      let errorMessage = 'Payment initiation failed. Please try again.';
      
      if (error.response) {
        console.error('Error response:', error.response.data);
        errorMessage = error.response.data?.error || error.response.data?.message || errorMessage;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      alert(errorMessage);
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading checkout...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Order not found</p>
          <button
            onClick={() => router.push('/cart')}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg"
          >
            Go to Cart
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-16 lg:pt-20"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Billing Information Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-6">Billing Information</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="01XXXXXXXXX"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your address"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      City
                    </label>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option>Dhaka</option>
                      <option>Chittagong</option>
                      <option>Sylhet</option>
                      <option>Khulna</option>
                      <option>Rajshahi</option>
                      <option>Barisal</option>
                      <option>Rangpur</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Postcode
                    </label>
                    <input
                      type="text"
                      name="postcode"
                      value={formData.postcode}
                      onChange={handleChange}
                      placeholder="1000"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Methods Info */}
              <div className="mt-8 p-4 bg-purple-50 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-3">Accepted Payment Methods</h3>
                <div className="flex flex-wrap gap-3">
                  {['💳 Cards', '📱 bKash', '💰 Nagad', '🚀 Rocket', '🏦 Bank'].map((method) => (
                    <div key={method} className="px-3 py-1 bg-white rounded-lg text-sm font-semibold">
                      {method}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              <div className="space-y-3 mb-6">
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      {item.product.thumbnail ? (
                        <img src={item.product.thumbnail} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-2xl">📦</div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm line-clamp-2">{item.product.title}</p>
                      <p className="text-purple-600 font-bold">${item.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal ({order.items.length} items)</span>
                  <span>${order.total_amount}</span>
                </div>
                <div className="flex justify-between font-bold text-xl text-purple-600">
                  <span>Total</span>
                  <span>৳{(parseFloat(order.total_amount.toString()) * 110).toFixed(2)}</span>
                </div>
                <p className="text-xs text-gray-500">≈ ${order.total_amount} USD</p>
              </div>

              <button
                onClick={handlePayment}
                disabled={processing}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {processing ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  '🔒 Proceed to Payment'
                )}
              </button>

              <div className="mt-4 space-y-2 text-xs text-gray-600">
                <div className="flex items-center">
                  <span className="mr-2">✓</span>
                  <span>Secure SSL encrypted payment</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">✓</span>
                  <span>Instant download after payment</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">✓</span>
                  <span>Money-back guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}