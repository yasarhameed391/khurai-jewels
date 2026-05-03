'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { isAdmin, getStoredToken, logout } from '@/lib/api';

interface Product {
  _id: string;
  name: string;
  slug?: string;
  price: number;
  category: string;
  image: string;
  description: string;
  stock: number;
}

interface Order {
  _id: string;
  orderNumber: string;
  products: Array<{ productId: { name: string }; quantity: number }>;
  totalAmount: number;
  paymentMethod: string;
  paymentStatus: string;
  orderStatus: string;
  shippingAddress: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    pincode: string;
    state: string;
  };
  createdAt: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://khurai-jewels.onrender.com';

const ORDER_STATUSES = ['confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];
const PAYMENT_STATUSES = ['pending', 'paid', 'failed'];

export default function AdminPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products');
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    stock: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState<Product | null>(null);

  useEffect(() => {
    const token = getStoredToken();
    if (!token || !isAdmin()) {
      router.push('/login');
    } else {
      loadProducts();
      loadOrders();
    }
  }, []);

  const loadOrders = async () => {
    try {
      const token = getStoredToken();
      const res = await fetch(`${API_BASE_URL}/api/orders/admin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data.data?.orders) {
        setOrders(data.data.orders);
      } else if (Array.isArray(data.data)) {
        setOrders(data.data);
      }
    } catch (err) {
      console.error('Failed to load orders:', err);
    }
  };

  const updateOrderStatus = async (orderId: string, orderStatus: string, paymentStatus?: string) => {
    try {
      const token = getStoredToken();
      const res = await fetch(`${API_BASE_URL}/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ orderStatus, paymentStatus }),
      });
      if (res.ok) {
        loadOrders();
        setSelectedOrder(null);
      }
    } catch (err) {
      console.error('Failed to update order:', err);
    }
  };

  const loadProducts = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/products`);
      const data = await res.json();
      setProducts(data.data);
    } catch (err) {
      console.error('Failed to load products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    const token = getStoredToken();
    const formDataObj = new FormData();
    formDataObj.append('name', formData.name);
    formDataObj.append('price', formData.price);
    formDataObj.append('category', formData.category);
    formDataObj.append('description', formData.description);
    formDataObj.append('stock', formData.stock);
    if (imageFile) {
      formDataObj.append('image', imageFile);
    }

    try {
      const url = editingProduct 
        ? `${API_BASE_URL}/api/products/${editingProduct._id}`
        : `${API_BASE_URL}/api/products`;
      
      const res = await fetch(url, {
        method: editingProduct ? 'PUT' : 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataObj,
      });

      if (res.ok) {
        loadProducts();
        closeForm();
      }
    } catch (err) {
      console.error('Failed to save product:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = (product: Product) => {
    setDeleteProduct(product);
  };

  const confirmDelete = async () => {
    if (!deleteProduct) return;
    const token = getStoredToken();
    try {
      await fetch(`${API_BASE_URL}/api/products/${deleteProduct._id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      loadProducts();
      setDeleteProduct(null);
    } catch (err) {
      console.error('Failed to delete product:', err);
    }
  };

  const openAddForm = () => {
    setEditingProduct(null);
    setFormData({ name: '', price: '', category: '', description: '', stock: '' });
    setImageFile(null);
    setIsFormOpen(true);
  };

  const openEditForm = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      category: product.category,
      description: product.description || '',
      stock: product.stock.toString(),
    });
    setImageFile(null);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingProduct(null);
    setFormData({ name: '', price: '', category: '', description: '', stock: '' });
    setImageFile(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#7a4538] pt-28 pb-16 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#7a4538] pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl text-white font-light">Admin Dashboard</h1>
            <div className="flex gap-6 mt-2">
              <button
                onClick={() => setActiveTab('products')}
                className={`text-sm uppercase tracking-wider ${activeTab === 'products' ? 'text-white border-b-2 border-white' : 'text-white/60 hover:text-white'}`}
              >
                Products
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`text-sm uppercase tracking-wider ${activeTab === 'orders' ? 'text-white border-b-2 border-white' : 'text-white/60 hover:text-white'}`}
              >
                Orders ({orders.length})
              </button>
            </div>
          </div>
          <div className="flex gap-4">
            {activeTab === 'products' && (
              <button
                onClick={openAddForm}
                className="bg-[#9b5a4a] text-white px-6 py-3 font-medium uppercase tracking-wider hover:bg-[#7a4538]"
              >
                Add Product
              </button>
            )}
            <button
              onClick={handleLogout}
              className="border border-zinc-700 text-white/60 px-6 py-3 hover:text-white"
            >
              Logout
            </button>
          </div>
        </div>

        {activeTab === 'orders' && (
          <div className="bg-zinc-900/50 rounded-xl border border-white/20 overflow-hidden">
            <table className="w-full">
              <thead className="bg-zinc-900/50">
                <tr>
                  <th className="text-left text-white/60 text-sm font-medium px-6 py-4">Order #</th>
                  <th className="text-left text-white/60 text-sm font-medium px-6 py-4">Customer</th>
                  <th className="text-left text-white/60 text-sm font-medium px-6 py-4">Items</th>
                  <th className="text-left text-white/60 text-sm font-medium px-6 py-4">Total</th>
                  <th className="text-left text-white/60 text-sm font-medium px-6 py-4">Payment</th>
                  <th className="text-left text-white/60 text-sm font-medium px-6 py-4">Status</th>
                  <th className="text-left text-white/60 text-sm font-medium px-6 py-4">Date</th>
                  <th className="text-right text-white/60 text-sm font-medium px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="border-t border-white/10 hover:bg-zinc-900/30">
                    <td className="px-6 py-4 text-white">{order.orderNumber}</td>
                    <td className="px-6 py-4 text-white">{order.shippingAddress.firstName} {order.shippingAddress.lastName}</td>
                    <td className="px-6 py-4 text-white/60">
                      {order.products.map((p, i) => (
                        <div key={i}>{p.productId.name} x {p.quantity}</div>
                      ))}
                    </td>
                    <td className="px-6 py-4 text-white">₹{order.totalAmount}</td>
                    <td className="px-6 py-4 text-white/60">{order.paymentMethod}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs uppercase ${
                        order.orderStatus === 'delivered' ? 'bg-green-500/20 text-green-300' :
                        order.orderStatus === 'cancelled' ? 'bg-red-500/20 text-red-300' :
                        order.orderStatus === 'shipped' ? 'bg-blue-500/20 text-blue-300' :
                        'bg-yellow-500/20 text-yellow-300'
                      }`}>
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-white/60">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="text-white/60 hover:text-white"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {selectedOrder && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-zinc-900 border border-white/20 rounded-xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl text-white font-light mb-6">Order Details</h2>
              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-white/60 text-sm">Order Number</p>
                  <p className="text-white">{selectedOrder.orderNumber}</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm">Customer</p>
                  <p className="text-white">{selectedOrder.shippingAddress.firstName} {selectedOrder.shippingAddress.lastName}</p>
                  <p className="text-white/60 text-sm">{selectedOrder.shippingAddress.email}</p>
                  <p className="text-white/60 text-sm">{selectedOrder.shippingAddress.phone}</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm">Address</p>
                  <p className="text-white">{selectedOrder.shippingAddress.address}</p>
                  <p className="text-white">{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} - {selectedOrder.shippingAddress.pincode}</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm">Items</p>
                  {selectedOrder.products.map((p, i) => (
                    <div key={i} className="flex justify-between text-white">
                      <span>{p.productId.name} x {p.quantity}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-white/60 text-sm">Total Amount</p>
                  <p className="text-white font-medium">₹{selectedOrder.totalAmount}</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm">Payment Method</p>
                  <p className="text-white">{selectedOrder.paymentMethod}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-white/60 text-sm mb-2">Order Status</label>
                  <select
                    value={selectedOrder.orderStatus}
                    onChange={(e) => updateOrderStatus(selectedOrder._id, e.target.value, undefined)}
                    className="w-full bg-zinc-900/50 border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-white"
                  >
                    {ORDER_STATUSES.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-2">Payment Status</label>
                  <select
                    value={selectedOrder.paymentStatus}
                    onChange={(e) => updateOrderStatus(selectedOrder._id, selectedOrder.orderStatus, e.target.value)}
                    className="w-full bg-zinc-900/50 border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-white"
                  >
                    {PAYMENT_STATUSES.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="flex-1 px-6 py-3 border border-white/20 text-white hover:text-white"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="bg-zinc-900/50 rounded-xl border border-white/20 overflow-hidden">
            <table className="w-full">
              <thead className="bg-zinc-900/50">
                <tr>
                  <th className="text-left text-white/60 text-sm font-medium px-6 py-4">Product</th>
                  <th className="text-left text-white/60 text-sm font-medium px-6 py-4">Category</th>
                  <th className="text-left text-white/60 text-sm font-medium px-6 py-4">Price</th>
                  <th className="text-left text-white/60 text-sm font-medium px-6 py-4">Stock</th>
                  <th className="text-right text-white/60 text-sm font-medium px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className="border-t border-white/10 hover:bg-zinc-900/30">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        {product.image && (
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                            <Image
                              src={`${API_BASE_URL}${product.image}`}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <span className="text-white">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-white/60">{product.category}</td>
                    <td className="px-6 py-4 text-white">₹{product.price}</td>
                    <td className="px-6 py-4 text-white/60">{product.stock}</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => openEditForm(product)}
                        className="text-white/60 hover:text-white mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product)}
                        className="text-red-400 hover:text-red-300"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {products.length === 0 && (
              <div className="text-center py-12 text-white/50">
                No products found. Click "Add Product" to create one.
              </div>
            )}
          </div>
        )}

        {isFormOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-zinc-900 border border-white/20 rounded-xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl text-white font-light mb-6">
                {editingProduct ? 'Edit Product' : 'Add Product'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-white/60 text-sm mb-2">Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-zinc-900/50 border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-white"
                  />
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-2">Price *</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full bg-zinc-900/50 border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-white"
                  />
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-2">Category *</label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-zinc-900/50 border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-white"
                  >
                    <option value="">Select Category</option>
                    <option value="Charms">Charms</option>
                    <option value="Bracelets">Bracelets</option>
                    <option value="Necklaces">Necklaces</option>
                    <option value="Rings">Rings</option>
                    <option value="Earrings">Earrings</option>
                    <option value="Gifts">Gifts</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-2">Description</label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-zinc-900/50 border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-white resize-none"
                  />
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-2">
                    Product Image {editingProduct ? '(leave empty to keep current)' : '*'}
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                    className="w-full text-white"
                    required={!editingProduct}
                  />
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-2">Stock *</label>
                  <input
                    type="number"
                    required
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full bg-zinc-900/50 border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-white"
                  />
                </div>
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={closeForm}
                    className="flex-1 px-6 py-3 border border-zinc-700 text-white/60 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={uploading}
                    className="flex-1 bg-[#9b5a4a] text-white py-3 font-medium uppercase tracking-wider hover:bg-[#7a4538] disabled:opacity-50"
                  >
                    {uploading ? 'Saving...' : (editingProduct ? 'Update Product' : 'Add Product')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {deleteProduct && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-zinc-900 border border-white/20 rounded-xl p-8 max-w-md w-full mx-4">
              <h3 className="text-xl text-white font-light mb-4">Confirm Delete</h3>
              <p className="text-white/70 mb-2">
                Are you sure you want to delete this product?
              </p>
              <p className="text-white font-medium mb-6">
                {deleteProduct.name}
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setDeleteProduct(null)}
                  className="flex-1 bg-zinc-800 text-white py-3 font-medium uppercase tracking-wider hover:bg-zinc-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 bg-red-600 text-white py-3 font-medium uppercase tracking-wider hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
