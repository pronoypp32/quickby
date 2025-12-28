'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getCart, removeFromCart, createOrder, isAuthenticated } from '@/lib/api';

interface CartItem {
  id: number;
  product: {
    id: number;
    title: string;
    slug: string;
    short_description: string;
    thumbnail: string;
    price: number;
    discount_price: number | null;
    final_price: number;
    category_name: string;
  };
}

interface Cart {
  id: number;
  items: CartItem[];
  total_price: number;
  total_items: number;
}

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const data = await getCart();
      setCart(data);
    } catch (error) {
      console.error('Failed to load cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (itemId: number) => {
    try {
      const data = await removeFromCart(itemId);
      setCart(data);
    } catch (error) {
      alert('Failed to remove item');
    }
  };

  const handleCheckout = async () => {
    if (!cart || cart.items.length === 0) return;

    setProcessing(true);
    try {
      // Create order first
      const order = await createOrder();
      
      // Redirect to checkout page with order ID
      router.push(`/checkout?order_id=${order.order_id}`);
    } catch (error: any) {
      alert(error.response?.data?.error || 'Failed to create order');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-16 lg:pt-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        {!cart || cart.items.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some products to get started!</p>
            <Link
              href="/shop"
              className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.items.map((item) => (
                <div key={item.id} className="bg-white rounded-xl shadow-md p-4 flex gap-4">
                  
                  {/* Product Image */}
                  <Link href={`/products/${item.product.slug}`} className="flex-shrink-0">
                    <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg overflow-hidden">
                      {item.product.thumbnail ? (
                        <img
                          src={item.product.thumbnail}
                          alt={item.product.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-3xl">
                          📦
                        </div>
                      )}
                    </div>
                  </Link>

                  {/* Product Info */}
                  <div className="flex-1">
                    <Link href={`/products/${item.product.slug}`}>
                      <p className="text-xs text-purple-600 font-semibold mb-1">
                        {item.product.category_name}
                      </p>
                      <h3 className="font-bold text-gray-900 mb-1 hover:text-purple-600 transition">
                        {item.product.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {item.product.short_description}
                      </p>
                    </Link>
                  </div>

                  {/* Price & Remove */}
                  <div className="flex flex-col items-end justify-between">
                    <div className="text-right">
                      {item.product.discount_price ? (
                        <>
                          <p className="text-xl font-bold text-purple-600">
                            ${item.product.discount_price}
                          </p>
                          <p className="text-sm text-gray-400 line-through">
                            ${item.product.price}
                          </p>
                        </>
                      ) : (
                        <p className="text-xl font-bold text-purple-600">
                          ${item.product.price}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-red-600 hover:text-red-700 text-sm font-semibold"
                    >
                      🗑️ Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                
             <div className="space-y-3 mb-6">
  <div className="flex justify-between text-gray-700">
    <span>Items ({cart.total_items})</span>
    <span>${cart.total.toFixed(2)}</span>
  </div>

  <div className="flex justify-between text-gray-700">
    <span>Discount</span>
    <span className="text-green-600">-$0.00</span>
  </div>

  <div className="border-t pt-3">
    <div className="flex justify-between text-xl font-bold">
      <span>Total</span>
      <span className="text-purple-600">
        ${Number(cart.total_price || 0).toFixed(2)}
      </span>
    </div>
  </div>
</div>


                <button
                  onClick={handleCheckout}
                  disabled={processing}
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {processing ? 'Processing...' : '🔒 Proceed to Checkout'}
                </button>

                <div className="mt-4 space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <span className="mr-2">✓</span>
                    <span>Instant download after purchase</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">✓</span>
                    <span>Secure payment</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">✓</span>
                    <span>Money-back guarantee</span>
                  </div>
                </div>

                <Link
                  href="/shop"
                  className="block mt-6 text-center text-purple-600 hover:text-purple-700 font-semibold"
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}