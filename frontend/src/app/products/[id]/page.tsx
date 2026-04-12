'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { fetchProductById, addToCart, addToWishlist, removeFromWishlist, isInWishlist } from '@/lib/api';
import Tooltip from '@/components/Tooltip';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

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

const defaultImage = 'https://images.unsplash.com/photo-1617038224538-2764d5d36d43?auto=format&fit=crop&w=800&q=80';

const galleryImages = [
  'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1603561596112-0a132908c1d8?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=800&q=80',
];

export default function ProductDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    loadProduct();
  }, [params.id]);

  useEffect(() => {
    if (params.id) {
      setIsWishlisted(isInWishlist(params.id as string));
    }
  }, [params.id]);

  const toggleWishlist = () => {
    if (!product) return;
    if (isWishlisted) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product._id);
    }
    setIsWishlisted(!isWishlisted);
  };

  const loadProduct = async () => {
    try {
      setLoading(true);
      const data = await fetchProductById(params.id as string);
      setProduct(data);
    } catch (err) {
      setError('Failed to load product');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    }, quantity);
    window.dispatchEvent(new Event('cartUpdated'));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#7a4538] pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="aspect-square bg-zinc-800 rounded-xl animate-pulse" />
              <div className="flex gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-20 h-20 bg-zinc-800 rounded-lg animate-pulse" />
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div className="h-4 bg-zinc-800 rounded w-24 animate-pulse" />
              <div className="h-10 bg-zinc-800 rounded w-3/4 animate-pulse" />
              <div className="h-8 bg-zinc-800 rounded w-32 animate-pulse" />
              <div className="h-24 bg-zinc-800 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#7a4538] pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <p className="text-red-400 text-lg mb-4">{error || 'Product not found'}</p>
          <Link href="/products" className="text-white hover:text-white inline-block text-sm uppercase tracking-wider">
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const images = product.image ? [`${API_BASE_URL}${product.image}`] : [defaultImage];

  return (
    <div className="min-h-screen bg-[#7a4538] pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-3 text-sm text-zinc-500 mb-10">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-white transition-colors">Shop</Link>
          <span>/</span>
          <Link href={`/products?category=${product.category}`} className="hover:text-white transition-colors">{product.category}</Link>
          <span>/</span>
          <span className="text-white truncate max-w-[200px]">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-xl overflow-hidden bg-zinc-900">
              {images[selectedImage].startsWith(API_BASE_URL) ? (
                <Image 
                  src={images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <Image 
                  src={images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              )}
              {product.stock === 0 && (
                <div className="absolute top-4 left-4 bg-red-500 text-white text-xs px-3 py-1 uppercase tracking-wider">
                  Sold Out
                </div>
              )}
              <div className="absolute top-4 right-4">
                <Tooltip content={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}>
                  <button 
                    onClick={toggleWishlist}
                    className="p-3 bg-[#7a4538]/50 backdrop-blur-sm rounded-full hover:bg-[#7a4538]/70 transition-colors"
                  >
                    <svg 
                      className={`w-5 h-5 transition-colors ${isWishlisted ? 'text-red-500 fill-red-500' : 'text-white'}`} 
                      fill={isWishlisted ? 'currentColor' : 'none'} 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </Tooltip>
              </div>
            </div>
            
            {/* Thumbnail Gallery */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {images.slice(0, 4).map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`flex-shrink-0 relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === idx ? 'border-white' : 'border-transparent hover:border-zinc-700'
                  }`}
                >
                  <Image src={img} alt={`View ${idx + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:py-4">
            <div className="mb-6">
              <span className="text-white text-xs font-medium tracking-[0.3em] uppercase">{product.category}</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl text-white font-light mb-6">{product.name}</h1>
            
            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-3xl sm:text-4xl text-white font-light">₹{product.price?.toLocaleString()}</span>
              {product.price > 50000 && (
                <span className="text-xs text-green-400 bg-green-400/10 px-2 py-1 uppercase tracking-wider">Premium</span>
              )}
            </div>

            {product.description && (
              <div className="mb-8">
                <h3 className="text-white text-sm font-medium uppercase tracking-wider mb-3">Description</h3>
                <p className="text-zinc-400 font-light leading-relaxed">{product.description}</p>
              </div>
            )}

            {/* Product Details */}
            <div className="mb-8 py-6 border-y border-zinc-800">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-zinc-500">Availability</span>
                  <p className={`text-white mt-1 ${product.stock > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
                  </p>
                </div>
                <div>
                  <span className="text-zinc-500">Category</span>
                  <p className="text-white mt-1">{product.category}</p>
                </div>
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="flex items-center border border-zinc-700 rounded-lg">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-5 py-3 text-white hover:bg-zinc-800 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <span className="px-6 py-3 text-white font-medium">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(Math.min(product.stock || 10, quantity + 1))}
                    className="px-5 py-3 text-white hover:bg-zinc-800 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
                
                <span className="text-zinc-500 text-sm">
                  Total: <span className="text-white font-medium">₹{(product.price * quantity)?.toLocaleString()}</span>
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex-1 bg-[#9b5a4a] text-white px-8 py-4 font-medium uppercase tracking-widest hover:bg-[#7a4538] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
                <Tooltip content={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}>
                  <button 
                    onClick={toggleWishlist}
                    className="px-6 py-4 border border-zinc-700 text-white uppercase tracking-wider hover:bg-zinc-800 hover:border-zinc-600 transition-colors"
                  >
                    <svg 
                      className={`w-6 h-6 ${isWishlisted ? 'text-red-500 fill-red-500' : 'text-zinc-400'}`}
                      fill={isWishlisted ? 'currentColor' : 'none'}
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </Tooltip>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-10 pt-6 border-t border-zinc-800">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4">
                  <svg className="w-6 h-6 text-white mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                  <span className="text-zinc-500 text-xs">Free Shipping</span>
                </div>
                <div className="p-4">
                  <svg className="w-6 h-6 text-white mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="text-zinc-500 text-xs">Secure Payment</span>
                </div>
                <div className="p-4">
                  <svg className="w-6 h-6 text-white mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span className="text-zinc-500 text-xs">Easy Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}