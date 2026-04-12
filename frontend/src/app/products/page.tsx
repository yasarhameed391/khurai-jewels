'use client';

import { Suspense, useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
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

const categories = ['All', 'Rings', 'Necklaces', 'Earrings', 'Bracelets'];

const priceRanges = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under ₹10,000', min: 0, max: 10000 },
  { label: '₹10,000 - ₹25,000', min: 10000, max: 25000 },
  { label: '₹25,000 - ₹50,000', min: 25000, max: 50000 },
  { label: '₹50,000 - ₹1,00,000', min: 50000, max: 100000 },
  { label: 'Above ₹1,00,000', min: 100000, max: Infinity },
];

function ProductsContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const searchParams = useSearchParams();

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      const cat = categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1).toLowerCase();
      setCategoryFilter(cat);
    }
  }, [searchParams]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      setError('Failed to load products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (categoryFilter !== 'all') {
      result = result.filter(p => p.category.toLowerCase() === categoryFilter.toLowerCase());
    }

    if (priceFilter > 0) {
      const range = priceRanges[priceFilter];
      result = result.filter(p => p.price >= range.min && p.price < range.max);
    }

    if (searchQuery) {
      result = result.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return result;
  }, [products, categoryFilter, priceFilter, searchQuery, sortBy]);

  const FilterSection = ({ mobile = false }: { mobile?: boolean }) => (
    <div className={`space-y-8 ${mobile ? 'pb-6' : ''}`}>
      {/* Category Filter */}
      <div>
        <h3 className="text-white text-sm font-medium uppercase tracking-wider mb-4">Category</h3>
        <div className="space-y-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat.toLowerCase())}
              className={`block w-full text-left py-2 text-sm transition-colors ${
                categoryFilter === cat.toLowerCase() 
                  ? 'text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      </div>
  );

  return (
    <div className="min-h-screen bg-[#7a4538] pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-white text-xs font-medium tracking-[0.4em] uppercase">Collection</span>
          <h1 className="text-3xl sm:text-4xl text-white mt-2 font-light">Our Jewelry</h1>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-6">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="flex items-center gap-2 text-white bg-zinc-900 px-4 py-3 rounded-lg w-full justify-center"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters & Sort
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-28 bg-zinc-900/50 p-6 rounded-lg border border-zinc-800">
              <FilterSection />
            </div>
          </aside>

          {/* Mobile Sidebar Overlay */}
          {sidebarOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div className="absolute inset-0 bg-[#7a4538]/80" onClick={() => setSidebarOpen(false)} />
              <div className="absolute right-0 top-0 bottom-0 w-80 bg-zinc-900 p-6 overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-white text-lg font-medium">Filters</h2>
                  <button onClick={() => setSidebarOpen(false)} className="text-gray-400">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <FilterSection mobile />
                <button 
                  onClick={() => setSidebarOpen(false)}
                  className="w-full mt-6 bg-[#9b5a4a] text-white py-3 font-medium uppercase tracking-wider hover:bg-[#7a4538] transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1">
            {/* Search & Sort Bar */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <input 
                  type="text" 
                  placeholder="Search jewelry..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-5 py-3 bg-zinc-900 border border-zinc-800 text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors"
                />
                <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-5 py-3 bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-white"
              >
                <option value="default">Sort by: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A-Z</option>
              </select>
            </div>

            {/* Active Filters */}
            {(categoryFilter !== 'all' || priceFilter > 0) && (
              <div className="flex flex-wrap gap-2 mb-6">
                {categoryFilter !== 'all' && (
                  <span className="inline-flex items-center gap-2 bg-zinc-800 text-white px-3 py-1 text-sm rounded-full">
                    {categoryFilter}
                    <button onClick={() => setCategoryFilter('all')} className="text-gray-400 hover:text-white">×</button>
                  </span>
                )}
                {priceFilter > 0 && (
                  <span className="inline-flex items-center gap-2 bg-zinc-800 text-white px-3 py-1 text-sm rounded-full">
                    {priceRanges[priceFilter].label}
                    <button onClick={() => setPriceFilter(0)} className="text-gray-400 hover:text-white">×</button>
                  </span>
                )}
                <button 
                  onClick={() => { setCategoryFilter('all'); setPriceFilter(0); }}
                  className="text-white text-sm hover:text-white-70"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Results Count */}
            <p className="text-gray-500 text-sm mb-6">{filteredProducts.length} products found</p>

            {/* Loading State */}
            {loading && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-square bg-zinc-800 rounded-lg mb-4" />
                    <div className="h-3 bg-zinc-800 rounded w-16 mb-2" />
                    <div className="h-4 bg-zinc-800 rounded w-3/4 mb-2" />
                    <div className="h-4 bg-zinc-800 rounded w-20" />
                  </div>
                ))}
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="text-center py-20">
                <p className="text-red-400">{error}</p>
                <button onClick={loadProducts} className="mt-4 text-white hover:text-white">
                  Try Again
                </button>
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg mb-4">No products found</p>
                <button 
                  onClick={() => { setCategoryFilter('all'); setPriceFilter(0); setSearchQuery(''); }}
                  className="text-white hover:text-white"
                >
                  Clear filters
                </button>
              </div>
            )}

            {/* Product Grid */}
            {!loading && !error && filteredProducts.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {filteredProducts.map((product) => (
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
                          src="https://images.unsplash.com/photo-1617038224538-2764d5d36d43?auto=format&fit=crop&w=600&q=80"
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#5c3528]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="bg-[#9b5a4a] text-white px-5 py-2 text-sm uppercase tracking-wider">View</span>
                      </div>
                      {product.stock === 0 && (
                        <div className="absolute top-3 right-3 bg-red-500 text-white text-xs px-2 py-1 uppercase">Sold Out</div>
                      )}
                    </div>
                    <p className="text-white text-xs tracking-[0.2em] uppercase mb-2">{product.category}</p>
                    <h3 className="text-white font-light text-sm mb-2 group-hover:text-white transition-colors line-clamp-2">{product.name}</h3>
                    <p className="text-gray-400 font-light">₹{product.price?.toLocaleString()}</p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#7a4538] pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-white text-xs font-medium tracking-[0.4em] uppercase">Collection</span>
            <h1 className="text-3xl sm:text-4xl text-white mt-2 font-light">Our Jewelry</h1>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square bg-zinc-800 rounded-lg mb-4" />
                <div className="h-3 bg-zinc-800 rounded w-16 mb-2" />
                <div className="h-4 bg-zinc-800 rounded w-3/4 mb-2" />
                <div className="h-4 bg-zinc-800 rounded w-20" />
              </div>
            ))}
          </div>
        </div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}