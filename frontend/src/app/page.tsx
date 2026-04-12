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
    <div className="min-h-screen bg-[#7a4538]">
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1617038224538-2764d5d36d43?auto=format&fit=crop&w=2400&q=80" 
            alt="Luxury Jewelry" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#5c3528]/80 via-[#5c3528]/60 to-[#5c3528]/90" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#5c3528_100%)]" />
        </div>
        
        <div className="relative z-10 text-center max-w-5xl mx-auto px-4">
          <div className="mb-6">
            <span className="inline-block w-20 h-px bg-white/50 mr-4" />
            <span className="text-white text-xs font-medium tracking-[0.5em] uppercase">Est. 2026 • Kochi</span>
          <span className="inline-block w-20 h-px bg-white/50 ml-4" />
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white mb-8 tracking-wide">
            <span className="block">Timeless</span>
            <span className="text-white font-normal">Elegance</span>
          </h1>
          
          <p className="text-white-60 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-light">
            Discover our curated collection of brand new luxury jewelry, sourced directly from trusted wholesale dealers
          </p>
          
          <Link 
            href="/products" 
            className="inline-flex items-center gap-3 bg-[#9b5a4a] text-white px-8 py-4 text-sm font-medium uppercase tracking-widest hover:bg-[#7a4538] transition-all duration-500"
          >
            Explore Collection
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span className="text-white/60 text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white to-transparent animate-pulse" />
        </div>
      </section>

      {/* Features Bar */}
      <section className="py-12 bg-zinc-950 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <span className="text-2xl text-white">{feature.icon}</span>
                <div>
                  <h3 className="text-white text-sm font-medium tracking-wide">{feature.title}</h3>
                  <p className="text-white-50 text-xs">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 sm:py-28 bg-[#7a4538]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-white text-xs font-medium tracking-[0.4em] uppercase">Discover</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl text-white mt-3 font-light">Shop by Category</h2>
            <div className="w-16 h-px bg-white/50 mx-auto mt-6" />
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
                  <div className="absolute inset-0 bg-gradient-to-t from-[#5c3528] via-[#5c3528]/40 to-transparent" />
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                  <h3 className="text-white text-xl font-light tracking-wider mb-2">{cat.name}</h3>
                  <p className="text-white/80 text-sm">{cat.count > 0 ? `${cat.count} Pieces` : 'Coming Soon'}</p>
                </div>
                <div className="absolute inset-0 border border-white/0 group-hover:border-white/50 transition-colors duration-500" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 sm:py-28 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <span className="text-white text-xs font-medium tracking-[0.4em] uppercase">Curated</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl text-white mt-3 font-light">Featured Pieces</h2>
            </div>
            <Link 
              href="/products" 
              className="group inline-flex items-center gap-3 text-white-60 hover:text-white transition-colors"
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
                  <div className="aspect-square bg-zinc-800 rounded-lg mb-4" />
                  <div className="h-3 bg-zinc-800 rounded w-16 mb-2" />
                  <div className="h-4 bg-zinc-800 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-zinc-800 rounded w-20" />
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
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
                  <div className="relative aspect-square overflow-hidden rounded-lg bg-zinc-900 mb-4">
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
                    <div className="absolute inset-0 bg-gradient-to-t from-[#5c3528]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="bg-[#9b5a4a] text-white px-6 py-2 text-sm uppercase tracking-wider">View</span>
                    </div>
                  </div>
                  <p className="text-white text-xs tracking-[0.2em] uppercase mb-2">{product.category}</p>
                  <h3 className="text-white font-light text-base mb-2 group-hover:text-white transition-colors">{product.name}</h3>
                  <p className="text-white-60 font-light">₹{product.price?.toLocaleString()}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-[#7a4538]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            {/* Quick Links - Modern Style */}
            <div>
              <h4 className="text-white font-medium mb-6">Explore</h4>
              <div className="grid grid-cols-2 gap-4">
                <Link href="/" className="text-white-70 hover:text-white text-lg transition-colors">Home</Link>
                <Link href="/products" className="text-white-70 hover:text-white text-lg transition-colors">Shop All</Link>
                <Link href="/products?category=Rings" className="text-white-70 hover:text-white text-lg transition-colors">Rings</Link>
                <Link href="/products?category=Necklaces" className="text-white-70 hover:text-white text-lg transition-colors">Necklaces</Link>
                <Link href="/products?category=Earrings" className="text-white-70 hover:text-white text-lg transition-colors">Earrings</Link>
                <Link href="/products?category=Bracelets" className="text-white-70 hover:text-white text-lg transition-colors">Bracelets</Link>
                <Link href="/about" className="text-white-70 hover:text-white text-lg transition-colors">About Us</Link>
                <Link href="/contact" className="text-white-70 hover:text-white text-lg transition-colors">Contact</Link>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="text-center md:text-right">
              <h4 className="text-white font-medium mb-6">Follow Us</h4>
              <div className="flex justify-center md:justify-end gap-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z"/></svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12,2.16c3.2,0,3.58,0,4.85.07,3.25.15,4.77,1.69,4.92,4.92.06,1.27.07,1.65.07,4.85s0,3.58-.07,4.85c-.15,3.23-1.66,4.77-4.92,4.92-1.27.06-1.65.07-4.85.07s-3.58,0-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s0-3.58.07-4.85C2.38,3.92,3.9,2.38,7.15,2.23,8.42,2.18,8.8,2.16,12,2.16ZM12,0C8.74,0,8.33,0,7.05.07c-4.35.2-6.78,2.62-7,7C0,8.33,0,8.74,0,12s0,3.67.07,4.95c.2,4.36,2.62,6.78,7,7C8.33,24,8.74,24,12,24s3.67,0,4.95-.07c4.35-.2,6.78-2.62,7-7C24,15.67,24,15.26,24,12s0-3.67-.07-4.95c-.2-4.35-2.62-6.78-7-7C15.67,0,15.26,0,12,0Zm0,5.84A6.16,6.16,0,1,0,18.16,12,6.16,6.16,0,0,0,12,5.84ZM20.41,4A1.44,1.44,0,1,1,18.58,5.41,1.44,1.44,0,0,0,20.41,4ZM12,16a4,4,0,1,1,4-4A4,4,0,0,1,12,16Zm0-6a2,2,0,1,0,2,2A2,2,0,0,0,12,10Z"/></svg>
                </a>
                <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
              </div>
              <p className="text-white-60 text-sm mt-6">"Adorn Your Every Day"</p>
              <p className="text-white-50 text-xs mt-2">Est. 2026 • Kochi, Kerala</p>
            </div>
          </div>
          
          {/* Divider */}
          <div className="border-t border-white/20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-white text-lg font-light">KHURAI JEWELS</p>
              <p className="text-white-50 text-sm">© 2026 Khurai Jewels. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}