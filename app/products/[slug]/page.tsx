'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getProductBySlug, addToCart, toggleWishlist, getProductReviews, addReview, isAuthenticated } from '@/lib/api';

interface Product {
  id: number;
  title: string;
  slug: string;
  description: string;
  short_description: string;
  category: { id: number; name: string; slug: string };
  product_type: string;
  price: number;
  discount_price: number | null;
  final_price: number;
  discount_percentage: number;
  thumbnail: string;
  preview_images: string[];
  file_size: string;
  version: string;
  requirements: string;
  features: string[];
  downloads: number;
  views: number;
  rating: number;
  total_ratings: number;
  is_featured: boolean;
  stock: number;
  creator: { id: number; username: string; full_name: string };
  is_purchased: boolean;
  is_in_cart: boolean;
  is_in_wishlist: boolean;
}

interface Review {
  id: number;
  user_name: string;
  user_full_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  useEffect(() => {
    loadProduct();
  }, [params.slug]);

  const loadProduct = async () => {
    try {
      const data = await getProductBySlug(params.slug as string);
      setProduct(data);
      loadReviews(data.id);
    } catch (error) {
      console.error('Failed to load product:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadReviews = async (productId: number) => {
    try {
      const data = await getProductReviews(productId);
      setReviews(data);
    } catch (error) {
      console.error('Failed to load reviews:', error);
    }
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }

    setAddingToCart(true);
    try {
      await addToCart(product!.id);
      alert('Added to cart! 🛒');
      loadProduct(); // Refresh to update is_in_cart
    } catch (error: any) {
      alert(error.response?.data?.error || 'Failed to add to cart');
    } finally {
      setAddingToCart(false);
    }
  };

  const handleToggleWishlist = async () => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }

    try {
      await toggleWishlist(product!.id);
      loadProduct(); // Refresh to update is_in_wishlist
    } catch (error) {
      alert('Failed to update wishlist');
    }
  };

  const handleSubmitReview = async () => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }

    try {
      await addReview(product!.id, reviewRating, reviewComment);
      alert('Review submitted! ⭐');
      setShowReviewForm(false);
      setReviewComment('');
      setReviewRating(5);
      loadReviews(product!.id);
    } catch (error: any) {
      alert(error.response?.data?.error || 'Failed to submit review');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
          <Link href="/shop" className="text-purple-600 hover:text-purple-700">
            ← Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const allImages = [product.thumbnail, ...product.preview_images].filter(Boolean);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-16 lg:pt-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-gray-600">
          <Link href="/" className="hover:text-purple-600">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/shop" className="hover:text-purple-600">Shop</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.title}</span>
        </nav>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* Images */}
          <div>
            <div className="bg-white rounded-xl shadow-lg p-4 mb-4">
              <div className="relative h-96 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg overflow-hidden">
                {allImages[selectedImage] ? (
                  <img
                    src={allImages[selectedImage]}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-8xl">
                    📦
                  </div>
                )}
                {product.discount_percentage > 0 && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-lg text-lg font-bold">
                    -{product.discount_percentage}%
                  </div>
                )}
              </div>
            </div>
            
            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
                      selectedImage === idx ? 'border-purple-600' : 'border-gray-300'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-3">
                {product.category.name}
              </span>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.title}</h1>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  <span className="text-yellow-400 text-xl mr-1">⭐</span>
                  <span className="font-semibold">{parseFloat(product.rating || 0).toFixed(1)}</span>
                  <span className="text-gray-600 ml-1">({product.total_ratings || 0} reviews)</span>
                </div>
                <div className="text-gray-600">
                  📥 {product.downloads || 0} downloads
                </div>
              </div>

              <p className="text-gray-700 mb-6">{product.short_description}</p>

              {/* Price */}
              <div className="mb-6">
                {product.discount_price ? (
                  <div>
                    <span className="text-4xl font-bold text-purple-600">
                      ${product.discount_price}
                    </span>
                    <span className="text-2xl text-gray-400 line-through ml-3">
                      ${product.price}
                    </span>
                  </div>
                ) : (
                  <span className="text-4xl font-bold text-purple-600">
                    ${product.price}
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 mb-6">
                {product.is_purchased ? (
                  <Link
                    href="/orders"
                    className="block w-full py-3 bg-green-600 text-white rounded-lg text-center font-semibold hover:bg-green-700 transition"
                  >
                    ✓ Purchased - View in Orders
                  </Link>
                ) : product.is_in_cart ? (
                  <Link
                    href="/cart"
                    className="block w-full py-3 bg-purple-600 text-white rounded-lg text-center font-semibold hover:bg-purple-700 transition"
                  >
                    View in Cart →
                  </Link>
                ) : (
                  <button
                    onClick={handleAddToCart}
                    disabled={addingToCart}
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition disabled:opacity-50"
                  >
                    {addingToCart ? 'Adding...' : '🛒 Add to Cart'}
                  </button>
                )}

                <button
                  onClick={handleToggleWishlist}
                  className={`w-full py-3 rounded-lg font-semibold transition ${
                    product.is_in_wishlist
                      ? 'bg-pink-100 text-pink-700 hover:bg-pink-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {product.is_in_wishlist ? '❤️ In Wishlist' : '🤍 Add to Wishlist'}
                </button>
              </div>

              {/* Product Info */}
              <div className="border-t pt-4 space-y-2 text-sm">
                {product.file_size && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">File Size:</span>
                    <span className="font-semibold">{product.file_size}</span>
                  </div>
                )}
                {product.version && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Version:</span>
                    <span className="font-semibold">{product.version}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-semibold">{product.product_type}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description & Features */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Description</h2>
            <p className="text-gray-700 whitespace-pre-line mb-6">{product.description}</p>

            {product.features.length > 0 && (
              <>
                <h3 className="text-xl font-bold mb-3">Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {product.requirements && (
              <>
                <h3 className="text-xl font-bold mt-6 mb-3">Requirements</h3>
                <p className="text-gray-700 whitespace-pre-line">{product.requirements}</p>
              </>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4">Seller Info</h3>
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-3">
                {product.creator.username[0].toUpperCase()}
              </div>
              <div>
                <p className="font-semibold">{product.creator.full_name || product.creator.username}</p>
                <p className="text-sm text-gray-600">@{product.creator.username}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Customer Reviews ({reviews.length})</h2>
            {product.is_purchased && (
              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              >
                Write Review
              </button>
            )}
          </div>

          {showReviewForm && (
            <div className="mb-6 p-4 bg-purple-50 rounded-lg">
              <div className="mb-3">
                <label className="block text-sm font-semibold mb-2">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setReviewRating(star)}
                      className={`text-2xl ${star <= reviewRating ? 'text-yellow-400' : 'text-gray-300'}`}
                    >
                      ⭐
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-3">
                <label className="block text-sm font-semibold mb-2">Comment</label>
                <textarea
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="Share your experience..."
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleSubmitReview}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                >
                  Submit Review
                </button>
                <button
                  onClick={() => setShowReviewForm(false)}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {reviews.length > 0 ? (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="border-b pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-semibold">{review.user_full_name}</p>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}>
                            ⭐
                          </span>
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(review.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center py-8">No reviews yet. Be the first to review!</p>
          )}
        </div>
      </div>
    </div>
  );
}