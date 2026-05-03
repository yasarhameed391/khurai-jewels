'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getWishlist, removeFromWishlist, fetchProductById } from '@/lib/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://khurai-jewels.onrender.com';

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

export default function WishlistPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = async () => {
    try {
      const wishlistIds = getWishlist();
      if (wishlistIds.length === 0) {
        setProducts([]);
        setLoading(false);
        return;
      }

      const productPromises = wishlistIds.map(id => fetchProductById(id));
      const fetchedProducts = await Promise.all(productPromises);
      setProducts(fetchedProducts.filter(p => p));
    } catch (err) {
      console.error('Failed to load wishlist', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = (productId: string) => {
    removeFromWishlist(productId);
    setProducts(products.filter(p => p._id !== productId));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#8F4B43] pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex gap-6 p-6 bg-[#8F4B43]/50 rounded-xl">
                <div className="w-32 h-32 bg-[#8F4B43]/50 rounded-lg" />
                <div className="flex-1 space-y-3">
                  <div className="h-4 bg-[#8F4B43]/50 rounded w-1/4" />
                  <div className="h-6 bg-[#8F4B43]/50 rounded w-1/2" />
                  <div className="h-4 bg-[#8F4B43]/50 rounded w-1/4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#8F4B43] pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl text-[#F5EDE6] font-light mb-10">My Wishlist</h1>

        {products.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#8F4B43]/50 flex items-center justify-center">
              <svg className="w-10 h-10 text-[#F5EDE6]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h2 className="text-xl text-[#F5EDE6] font-light mb-2">Your wishlist is empty</h2>
            <p className="text-[#F5EDE6]/60 mb-8">Save your favorite items to revisit later</p>
            <Link 
              href="/products"
              className="inline-block bg-[#8F4B43] text-[#F5EDE6] px-8 py-3 font-medium uppercase tracking-wider hover:bg-[#8F4B43] transition-opacity"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {products.map((product) => (
              <div 
                key={product._id}
                className="flex flex-col sm:flex-row gap-6 p-6 bg-[#8F4B43]/50/50 rounded-xl border border-[#F5EDE6]/20"
              >
                <Link href={`/products/${product.slug || product._id}`} className="flex-shrink-0">
                  <div className="relative w-32 h-32 rounded-lg overflow-hidden bg-[#8F4B43]/50">
                    {product.image ? (
                      <Image 
                        src={`${API_BASE_URL}${product.image}`}
                        alt={product.name}
                        fill
                        className="object-cover hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <Image 
                        src="https://images.unsplash.com/photo-1617038224538-2764d5d36d43?auto=format&fit=crop&w=400&q=80"
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                </Link>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[#F5EDE6] text-xs tracking-[0.2em] uppercase mb-2">{product.category}</p>
                      <Link href={`/products/${product.slug || product._id}`}>
                        <h3 className="text-[#F5EDE6] text-lg font-light hover:text-[#F5EDE6] transition-colors">{product.name}</h3>
                      </Link>
                      <p className="text-[#F5EDE6] text-xl font-light mt-2">₹{product.price?.toLocaleString()}</p>
                    </div>
                    <button
                      onClick={() => handleRemove(product._id)}
                      className="p-2 text-[#F5EDE6]/50 hover:text-red-400 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {product.stock === 0 && (
                    <div className="mt-3">
                      <span className="text-red-400 text-sm">Out of Stock</span>
                    </div>
                  )}

                  <div className="mt-4">
                    <Link 
                      href={`/products/${product.slug || product._id}`}
                      className="inline-block bg-[#8F4B43] text-[#F5EDE6] px-6 py-2 text-sm font-medium uppercase tracking-wider hover:bg-[#8F4B43] transition-opacity"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}