'use client';

import { Suspense, useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { fetchProducts } from '@/lib/api';

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

const categories = ['All', 'Charms', 'Bracelets', 'Necklaces', 'Rings', 'Earrings', 'Gifts'];

const categoryMap: Record<string, string> = {
  'Charms': 'charms',
  'Bracelets': 'bracelets',
  'Necklaces': 'necklaces',
  'Rings': 'rings',
  'Earrings': 'earrings',
  'Gifts': 'gifts',
};

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
      const mappedCategory = categoryMap[categoryFilter] || categoryFilter.toLowerCase();
      result = result.filter(p => p.category.toLowerCase() === mappedCategory);
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
        <h3 className="text-[#F5EDE6] text-sm font-medium uppercase tracking-wider mb-4">Category</h3>
        <div className="space-y-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat.toLowerCase())}
              className={`block w-full text-left py-2 text-sm transition-colors ${
                categoryFilter === cat.toLowerCase() 
                  ? 'text-[#F5EDE6]' 
                  : 'text-[#F5EDE6]/60 hover:text-[#F5EDE6]'
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
    <div className="min-h-screen bg-[#8F4B43] pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-[#F5EDE6] text-xs font-medium tracking-[0.4em] uppercase">Collection</span>
          <h1 className="text-3xl sm:text-4xl text-[#F5EDE6] mt-2 font-light">Our Jewelry</h1>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-6">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="flex items-center gap-2 text-[#F5EDE6] bg-[#8F4B43]/50 px-4 py-3 rounded-lg w-full justify-center"
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
            <div className="sticky top-28 bg-[#8F4B43]/50/50 p-6 rounded-lg border border-[#F5EDE6]/20">
              <FilterSection />
            </div>
          </aside>

          {/* Mobile Sidebar Overlay */}
          {sidebarOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div className="absolute inset-0 bg-[#8F4B43]/80" onClick={() => setSidebarOpen(false)} />
              <div className="absolute right-0 top-0 bottom-0 w-80 bg-[#8F4B43]/50 p-6 overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-[#F5EDE6] text-lg font-medium">Filters</h2>
                  <button onClick={() => setSidebarOpen(false)} className="text-[#F5EDE6]/60">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <FilterSection mobile />
                <button 
                  onClick={() => setSidebarOpen(false)}
                  className="w-full mt-6 bg-[#5C2E28] text-[#F5EDE6] py-3 font-medium uppercase tracking-wider hover:bg-[#8F4B43] transition-colors"
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
                  className="w-full px-5 py-3 bg-[#8F4B43]/50 border border-[#F5EDE6]/20 text-[#F5EDE6] placeholder-[#F5EDE6]/50 focus:outline-none focus:border-[#F5EDE6] transition-colors"
                />
                <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#F5EDE6]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-5 py-3 bg-[#8F4B43]/50 border border-[#F5EDE6]/20 text-[#F5EDE6] focus:outline-none focus:border-[#F5EDE6]"
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
                  <span className="inline-flex items-center gap-2 bg-[#8F4B43]/30 text-[#F5EDE6] px-3 py-1 text-sm rounded-full">
                    {categoryFilter}
                    <button onClick={() => setCategoryFilter('all')} className="text-[#F5EDE6]/60 hover:text-[#F5EDE6]">×</button>
                  </span>
                )}
                {priceFilter > 0 && (
                  <span className="inline-flex items-center gap-2 bg-[#8F4B43]/30 text-[#F5EDE6] px-3 py-1 text-sm rounded-full">
                    {priceRanges[priceFilter].label}
                    <button onClick={() => setPriceFilter(0)} className="text-[#F5EDE6]/60 hover:text-[#F5EDE6]">×</button>
                  </span>
                )}
                <button 
                  onClick={() => { setCategoryFilter('all'); setPriceFilter(0); }}
                  className="text-[#F5EDE6] text-sm hover:text-[#F5EDE6]-70"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Results Count */}
            <p className="text-[#F5EDE6]/60 text-sm mb-6">{filteredProducts.length} products found</p>

            {/* Loading State */}
            {loading && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-square bg-[#8F4B43]/30 rounded-lg mb-4" />
                    <div className="h-3 bg-[#8F4B43]/30 rounded w-16 mb-2" />
                    <div className="h-4 bg-[#8F4B43]/30 rounded w-3/4 mb-2" />
                    <div className="h-4 bg-[#8F4B43]/30 rounded w-20" />
                  </div>
                ))}
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="text-center py-20">
                <p className="text-red-400">{error}</p>
                <button onClick={loadProducts} className="mt-4 text-[#F5EDE6] hover:text-[#F5EDE6]">
                  Try Again
                </button>
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <p className="text-[#F5EDE6]/60 text-lg mb-4">No products found</p>
                <button 
                  onClick={() => { setCategoryFilter('all'); setPriceFilter(0); setSearchQuery(''); }}
                  className="text-[#F5EDE6] hover:text-[#F5EDE6]"
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
                          src="https://images.unsplash.com/photo-1617038224538-2764d5d36d43?auto=format&fit=crop&w=600&q=80"
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#8F4B43]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="bg-[#5C2E28] text-[#F5EDE6] px-5 py-2 text-sm uppercase tracking-wider">View</span>
                      </div>
                      {product.stock === 0 && (
                        <div className="absolute top-3 right-3 bg-red-500 text-[#F5EDE6] text-xs px-2 py-1 uppercase">Sold Out</div>
                      )}
                    </div>
                    <p className="text-[#F5EDE6] text-xs tracking-[0.2em] uppercase mb-2">{product.category}</p>
                    <h3 className="text-[#F5EDE6] font-light text-sm mb-2 group-hover:text-[#F5EDE6] transition-colors line-clamp-2">{product.name}</h3>
                    <p className="text-[#F5EDE6]/60 font-light">₹{product.price?.toLocaleString()}</p>
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
      <div className="min-h-screen bg-[#8F4B43] pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-[#F5EDE6] text-xs font-medium tracking-[0.4em] uppercase">Collection</span>
            <h1 className="text-3xl sm:text-4xl text-[#F5EDE6] mt-2 font-light">Our Jewelry</h1>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square bg-[#8F4B43]/30 rounded-lg mb-4" />
                <div className="h-3 bg-[#8F4B43]/30 rounded w-16 mb-2" />
                <div className="h-4 bg-[#8F4B43]/30 rounded w-3/4 mb-2" />
                <div className="h-4 bg-[#8F4B43]/30 rounded w-20" />
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