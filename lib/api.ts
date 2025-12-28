import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

// Token management
export const setToken = (token: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('access_token', token);
  }
};

export const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('access_token');
  }
  return null;
};

export const removeToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('access_token');
  }
};

export const isAuthenticated = () => {
  return !!getToken();
};

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to all requests
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ============ AUTH APIs ============
export const register = async (userData: {
  username: string;
  email: string;
  password: string;
  password2: string;
  first_name: string;
  last_name: string;
}) => {
  const response = await axios.post(`${API_BASE_URL}/users/register/`, userData);
  return response.data;
};

export const login = async (username: string, password: string) => {
  const response = await axios.post(`${API_BASE_URL}/users/login/`, {
    username,
    password,
  });
  return response.data;
};

export const getProfile = async () => {
  const response = await api.get('/users/profile/');
  return response.data;
};

// ============ E-COMMERCE APIs ============

// Categories
export const getCategories = async () => {
  const response = await api.get('/shop/categories/');
  return response.data;
};

export const getCategoryBySlug = async (slug: string) => {
  const response = await api.get(`/shop/categories/${slug}/`);
  return response.data;
};

// Products
export const getProducts = async (params?: {
  category?: string;
  search?: string;
  min_price?: number;
  max_price?: number;
  page?: number;
}) => {
  const response = await api.get('/shop/products/', { params });
  return response.data;
};

export const getFeaturedProducts = async () => {
  const response = await api.get('/shop/products/featured/');
  return response.data;
};

export const getProductBySlug = async (slug: string) => {
  const response = await api.get(`/shop/products/${slug}/`);
  return response.data;
};

export const searchProducts = async (query: string, filters?: {
  category?: string;
  min_price?: number;
  max_price?: number;
}) => {
  const response = await api.get('/shop/products/search/', {
    params: { q: query, ...filters }
  });
  return response.data;
};

// Cart
export const getCart = async () => {
  const response = await api.get('/shop/cart/');
  return response.data;
};

export const addToCart = async (productId: number) => {
  const response = await api.post('/shop/cart/add/', { product_id: productId });
  return response.data;
};

export const removeFromCart = async (itemId: number) => {
  const response = await api.delete(`/shop/cart/remove/${itemId}/`);
  return response.data;
};

export const clearCart = async () => {
  const response = await api.delete('/shop/cart/clear/');
  return response.data;
};

// Orders
export const getOrders = async () => {
  const response = await api.get('/shop/orders/');
  return response.data;
};

export const createOrder = async () => {
  const response = await api.post('/shop/orders/create/');
  return response.data;
};

export const getOrderDetail = async (orderId: string) => {
  const response = await api.get(`/shop/orders/${orderId}/`);
  return response.data;
};

export const downloadProduct = async (orderItemId: number) => {
  const response = await api.get(`/shop/orders/download/${orderItemId}/`);
  return response.data;
};

// ============ PAYMENT APIs ============

// Initiate SSLCommerz Payment
export const initiatePayment = async (orderData: {
  order_id: string;
  phone: string;
  address: string;
  city: string;
  postcode: string;
  frontend_url?: string;
}) => {
  const response = await api.post('/payments/initiate/', {
    ...orderData,
    frontend_url: orderData.frontend_url || window.location.origin
  });
  return response.data;
};

// Get Payment Status
export const getPaymentStatus = async (paymentId: string) => {
  const response = await api.get(`/payments/status/${paymentId}/`);
  return response.data;
};

// Payment Success Callback
export const confirmPaymentSuccess = async (paymentData: any) => {
  const response = await api.post('/payments/success/', paymentData);
  return response.data;
};

// Reviews
export const getProductReviews = async (productId: number) => {
  const response = await api.get(`/shop/products/${productId}/reviews/`);
  return response.data;
};

export const addReview = async (productId: number, rating: number, comment: string) => {
  const response = await api.post(`/shop/products/${productId}/review/`, {
    product: productId,
    rating,
    comment
  });
  return response.data;
};

// Wishlist
export const getWishlist = async () => {
  const response = await api.get('/shop/wishlist/');
  return response.data;
};

export const toggleWishlist = async (productId: number) => {
  const response = await api.post(`/shop/wishlist/toggle/${productId}/`);
  return response.data;
};