'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getOrders, downloadProduct, isAuthenticated } from '@/lib/api';

interface OrderItem {
  id: number;
  product: {
    id: number;
    title: string;
    slug: string;
    thumbnail: string;
    category_name: string;
  };
  price: number;
  download_count: number;
  download_limit: number;
}

interface Order {
  id: number;
  order_id: string;
  items: OrderItem[];
  total_amount: number;
  status: string;
  created_at: string;
  completed_at: string;
}

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [downloadingItem, setDownloadingItem] = useState<number | null>(null);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (error) {
      console.error('Failed to load orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (orderItemId: number, productTitle: string) => {
    setDownloadingItem(orderItemId);
    try {
      const data = await downloadProduct(orderItemId);
      
      // Open download link in new tab
      window.open(data.download_url, '_blank');
      
      alert(`Download started for "${productTitle}"! 📥\n\nDownloads remaining: ${data.downloads_remaining}`);
      
      // Refresh orders to update download count
      loadOrders();
    } catch (error: any) {
      alert(error.response?.data?.error || 'Failed to download');
    } finally {
      setDownloadingItem(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-16 lg:pt-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
          <p className="text-gray-600">View your purchase history and download products</p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No orders yet</h2>
            <p className="text-gray-600 mb-6">Start shopping to see your orders here!</p>
            <Link
              href="/shop"
              className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                
                {/* Order Header */}
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <p className="text-sm opacity-90">Order ID</p>
                      <p className="font-bold text-lg">{order.order_id}</p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-sm opacity-90">Order Date</p>
                      <p className="font-semibold">
                        {new Date(order.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 mt-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      order.status === 'COMPLETED' 
                        ? 'bg-green-500 text-white' 
                        : 'bg-yellow-500 text-white'
                    }`}>
                      {order.status === 'COMPLETED' ? '✓ Completed' : order.status}
                    </span>
                    <span className="text-sm opacity-90">
                      Total: <span className="font-bold text-lg">${order.total_amount}</span>
                    </span>
                    <span className="text-sm opacity-90">
                      {order.items.length} item{order.items.length > 1 ? 's' : ''}
                    </span>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-4 sm:p-6 space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex flex-col sm:flex-row gap-4 p-4 bg-gray-50 rounded-lg">
                      
                      {/* Product Image */}
                      <Link 
                        href={`/products/${item.product.slug}`}
                        className="flex-shrink-0"
                      >
                        <div className="w-full sm:w-24 h-32 sm:h-24 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg overflow-hidden">
                          {item.product.thumbnail ? (
                            <img
                              src={item.product.thumbnail}
                              alt={item.product.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-4xl">
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
                        </Link>
                        <p className="text-lg font-bold text-purple-600 mb-2">
                          ${item.price}
                        </p>
                        
                        {/* Download Info */}
                        <div className="flex items-center text-sm text-gray-600">
                          <span className="mr-4">
                            📥 Downloads: {item.download_count} / {item.download_limit}
                          </span>
                          {item.download_count >= item.download_limit && (
                            <span className="text-red-600 font-semibold">
                              ⚠️ Limit reached
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Download Button */}
                      <div className="flex items-center">
                        <button
                          onClick={() => handleDownload(item.id, item.product.title)}
                          disabled={
                            item.download_count >= item.download_limit || 
                            downloadingItem === item.id
                          }
                          className={`px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-semibold transition whitespace-nowrap ${
                            item.download_count >= item.download_limit
                              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                              : downloadingItem === item.id
                                ? 'bg-purple-400 text-white cursor-wait'
                                : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'
                          }`}
                        >
                          {downloadingItem === item.id ? (
                            <span className="flex items-center">
                              <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Loading...
                            </span>
                          ) : item.download_count >= item.download_limit ? (
                            '🚫 Limit Reached'
                          ) : (
                            '📥 Download'
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}