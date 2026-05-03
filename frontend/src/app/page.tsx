'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { fetchProducts } from '@/lib/api';

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

const features = [
  { icon: '💎', title: 'Brand New', desc: 'All items are brand new, directly from wholesalers' },
  { icon: '✨', title: 'Wholesale Sourced', desc: 'Bulk purchases from trusted wholesale dealers' },
  { icon: '📦', title: 'Secure Shipping', desc: 'Insured delivery worldwide' },
  { icon: '🔄', title: 'Easy Returns', desc: '7-day return policy' },
];

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await fetchProducts();
      setAllProducts(data);
      setProducts(data.slice(0, 4));
    } catch (err) {
      console.error('Failed to load products:', err);
    } finally {
      setLoading(false);
    }
  };
  
  const categories = [
    { name: 'Rings', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80', count: allProducts.filter(p => p.category === 'Rings').length },
    { name: 'Necklaces', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80', count: allProducts.filter(p => p.category === 'Necklaces').length },
    { name: 'Earrings', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80', count: allProducts.filter(p => p.category === 'Earrings').length },
    { name: 'Bracelets', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80', count: allProducts.filter(p => p.category === 'Bracelets').length },
  ];

  return (
    <div className="min-h-screen bg-[#8F4B43]">
      <main id="main-content" tabIndex={-1}>
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden" aria-label="Hero section">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1617038224538-2764d5d36d43?auto=format&fit=crop&w=2400&q=80" 
            alt="Luxury jewelry collection by Khurai Jewels" 
            className="w-full h-full object-cover"
            role="presentation"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#8F4B43]/80 via-[#8F4B43]/60 to-[#8F4B43]/90" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#8F4B43_100%)]" />
        </div>
        
        <div className="relative z-10 text-center max-w-5xl mx-auto px-4">
          <div className="mb-6">
            <span className="inline-block w-20 h-px bg-[#F5EDE6]/50 mr-4" />
            <span className="text-[#F5EDE6] text-xs font-medium tracking-[0.5em] uppercase">Est. 2026 • Kochi</span>
          <span className="inline-block w-20 h-px bg-[#F5EDE6]/50 ml-4" />
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-[#F5EDE6] mb-8 tracking-wide">
            <span className="block">Timeless</span>
            <span className="text-[#F5EDE6] font-normal">Elegance</span>
          </h1>
          
          <p className="text-[#F5EDE6]/60 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-light">
            Discover our curated collection of brand new luxury jewelry, sourced directly from trusted wholesale dealers
          </p>
          
          <Link 
            href="/products" 
            className="inline-flex items-center gap-3 bg-[#8F4B43] text-[#F5EDE6] px-8 py-4 text-sm font-medium uppercase tracking-widest hover:bg-[#7A3D36] transition-all duration-500"
          >
            Explore Collection
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span className="text-[#F5EDE6]/60 text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white to-transparent animate-pulse" />
        </div>
      </section>

      {/* Features Bar */}
      <section className="py-12 bg-[#8F4B43]/50 border-y border-[#F5EDE6]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <span className="text-2xl text-[#F5EDE6]">{feature.icon}</span>
                <div>
                  <h3 className="text-[#F5EDE6] text-sm font-medium tracking-wide">{feature.title}</h3>
                  <p className="text-[#F5EDE6]/50 text-xs">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 sm:py-28 bg-[#8F4B43]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#F5EDE6] text-xs font-medium tracking-[0.4em] uppercase">Discover</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl text-[#F5EDE6] mt-3 font-light">Shop by Category</h2>
            <div className="w-16 h-px bg-[#F5EDE6]/50 mx-auto mt-6" />
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <Link 
                key={cat.name} 
                href={`/products?category=${cat.name}`}
                className="group relative overflow-hidden rounded-lg"
              >
                <div className="aspect-[3/4]">
                  <img 
                    src={cat.image} 
                    alt={cat.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#8F4B43] via-[#8F4B43]/40 to-transparent" />
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                  <h3 className="text-[#F5EDE6] text-xl font-light tracking-wider mb-2">{cat.name}</h3>
                  <p className="text-white/80 text-sm">{cat.count > 0 ? `${cat.count} Pieces` : 'Coming Soon'}</p>
                </div>
                <div className="absolute inset-0 border border-[#F5EDE6]/0 group-hover:border-[#F5EDE6]/50 transition-colors duration-500" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 sm:py-28 bg-[#8F4B43]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <span className="text-[#F5EDE6] text-xs font-medium tracking-[0.4em] uppercase">Curated</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl text-[#F5EDE6] mt-3 font-light">Featured Pieces</h2>
            </div>
            <Link 
              href="/products" 
              className="group inline-flex items-center gap-3 text-[#F5EDE6]/60 hover:text-[#F5EDE6] transition-colors"
            >
              <span className="text-sm uppercase tracking-wider">View All</span>
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-square bg-[#8F4B43]/30 rounded-lg mb-4" />
                  <div className="h-3 bg-[#8F4B43]/30 rounded w-16 mb-2" />
                  <div className="h-4 bg-[#8F4B43]/30 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-[#8F4B43]/30 rounded w-20" />
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-16 text-[#F5EDE6]/60">
              <p>No products available yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <Link 
                  key={product._id} 
                  href={`/products/${product.slug || product._id}`}
                  className="group"
                >
                  <div className="relative aspect-square overflow-hidden rounded-lg bg-[#8F4B43]/50 mb-4">
                    {product.image ? (
                      <Image 
                        src={`${API_BASE_URL}${product.image}`}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <Image 
                        src={defaultImage}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#8F4B43]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="bg-[#8F4B43] text-[#F5EDE6] px-6 py-2 text-sm uppercase tracking-wider">View</span>
                    </div>
                  </div>
                  <p className="text-[#F5EDE6] text-xs tracking-[0.2em] uppercase mb-2">{product.category}</p>
                  <h3 className="text-[#F5EDE6] font-light text-base mb-2 group-hover:text-[#F5EDE6] transition-colors">{product.name}</h3>
                  <p className="text-[#F5EDE6]/60 font-light">₹{product.price?.toLocaleString()}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
       </section>
      </main>
    </div>
  );
}