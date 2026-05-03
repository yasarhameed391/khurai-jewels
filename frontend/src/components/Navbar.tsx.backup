'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { getCartCount, getStoredUser, logout, isAdmin, getWishlistCount } from '@/lib/api';
import Tooltip from './Tooltip';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [user, setUser] = useState<any>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    {
      name: 'New & featured',
      path: '/products?sort=new',
      submenu: [
        {
          title: 'New in',
          items: [
            { name: 'New in', path: '/products?sort=new' },
            { name: 'Charms', path: '/products?category=charms' },
            { name: 'Bracelets', path: '/products?category=bracelets' },
            { name: 'Necklaces', path: '/products?category=necklaces' },
            { name: 'Rings', path: '/products?category=rings' },
            { name: 'Earrings', path: '/products?category=earrings' },
            { name: 'Ready-to-give gifts', path: '/products?category=gifts&tag=readytogive' },
            { name: 'Jewellery sets', path: '/products?category=sets' },
            { name: 'Engravable jewellery', path: '/products?tag=engravable' },
          ]
        },
        {
          title: 'Featured',
          items: [
            { name: 'Bestsellers', path: '/products?sort=bestsellers' },
            { name: 'Mini charms under ₹75', path: '/products?category=charms&price=under75' },
            { name: 'Spring jewellery', path: '/products?tag=spring' },
            { name: 'Flowers for Mom', path: '/products?tag=mom-flowers' },
            { name: 'Love & Hearts', path: '/products?tag=love-hearts' },
            { name: 'Graduation gifts', path: '/products?tag=graduation' },
            { name: 'Animals & pets', path: '/products?tag=animals-pets' },
            { name: 'Cross jewellery', path: '/products?tag=cross' },
            { name: 'May birthday gifts', path: '/products?tag=may-birthday' },
          ]
        }
      ]
    },
    {
      name: 'Shop by',
      path: '/products',
      submenu: [
        {
          title: 'Theme',
          items: [
            { name: 'Trending now', path: '/products?tag=trending' },
            { name: 'Everyday styles', path: '/products?tag=everyday' },
            { name: 'Love', path: '/products?tag=love' },
            { name: 'Symbols', path: '/products?tag=symbols' },
            { name: 'Family & friends', path: '/products?tag=family-friends' },
            { name: 'Sports', path: '/products?tag=sports' },
            { name: 'Travel & hobbies', path: '/products?tag=travel-hobbies' },
            { name: 'Occasions to celebrate', path: '/products?tag=occasions' },
            { name: 'Animals & pets', path: '/products?tag=animals-pets' },
            { name: 'Nature & celestial', path: '/products?tag=nature-celestial' },
          ]
        },
        {
          title: 'Occasion',
          items: [
            { name: 'All occasions', path: '/products?occasion=all' },
            { name: 'Mother\'s Day gifts', path: '/products?occasion=mothers-day' },
            { name: 'Graduation gifts', path: '/products?occasion=graduation' },
            { name: 'Birthday gifts', path: '/products?occasion=birthday' },
            { name: 'New mom & baby gifts', path: '/products?occasion=new-mom-baby' },
            { name: 'Bride & bridesmaids gifts', path: '/products?occasion=bride-bridesmaids' },
            { name: 'Engagement & wedding rings', path: '/products?occasion=engagement-wedding' },
            { name: 'Anniversary gifts', path: '/products?occasion=anniversary' },
            { name: 'Baptism & Sacrament gifts', path: '/products?occasion=baptism-sacrament' },
          ]
        },
        {
          title: 'Price',
          items: [
            { name: 'Under ₹50', path: '/products?price=under50' },
            { name: '₹50 to ₹75', path: '/products?price=50-75' },
            { name: '₹75 to ₹100', path: '/products?price=75-100' },
            { name: '₹100 to ₹250', path: '/products?price=100-250' },
            { name: 'Over ₹250', path: '/products?price=over250' },
          ]
        }
      ]
    },
    {
      name: 'Charms',
      path: '/products?category=charms',
      submenu: [
        {
          title: 'Category',
          items: [
            { name: 'All charms', path: '/products?category=charms' },
            { name: 'Clips and spacers', path: '/products?category=charms&tag=clips-spacers' },
            { name: 'Dangle charms', path: '/products?category=charms&tag=dangle' },
            { name: 'Mini charms', path: '/products?category=charms&tag=mini' },
            { name: 'Safety chains', path: '/products?category=charms&tag=safety-chains' },
            { name: 'Letter charms', path: '/products?category=charms&tag=letter' },
            { name: 'Birth month charms', path: '/products?category=charms&tag=birth-month' },
            { name: 'Disney charms', path: '/products?category=charms&tag=disney' },
            { name: 'Bestselling charms', path: '/products?category=charms&sort=bestsellers' },
            { name: 'Sale up to 50% off charms', path: '/products?category=charms&filter=sale' },
          ]
        },
        {
          title: 'Theme',
          items: [
            { name: 'Engravable charms', path: '/products?category=charms&tag=engravable' },
            { name: 'Spring Charms', path: '/products?category=charms&tag=spring' },
            { name: 'Medallions', path: '/products?category=charms&tag=medallions' },
            { name: 'Love', path: '/products?category=charms&tag=love' },
            { name: 'Family & friends', path: '/products?category=charms&tag=family-friends' },
            { name: 'Travel & hobbies', path: '/products?category=charms&tag=travel-hobbies' },
            { name: 'Symbols', path: '/products?category=charms&tag=symbols' },
            { name: 'Occasions to celebrate', path: '/products?category=charms&tag=occasions' },
            { name: 'Animals & pets', path: '/products?category=charms&tag=animals-pets' },
            { name: 'Nature & celestial', path: '/products?category=charms&tag=nature-celestial' },
          ]
        },
        {
          title: 'Price',
          items: [
            { name: 'Under ₹50', path: '/products?category=charms&price=under50' },
            { name: '₹50 to ₹75', path: '/products?category=charms&price=50-75' },
            { name: '₹75 to ₹100', path: '/products?category=charms&price=75-100' },
            { name: '₹100 to ₹250', path: '/products?category=charms&price=100-250' },
            { name: 'Over ₹250', path: '/products?category=charms&price=over250' },
          ]
        }
      ]
    },
    {
      name: 'Bracelets',
      path: '/products?category=bracelets',
      submenu: [
        {
          title: 'Category',
          items: [
            { name: 'All bracelets', path: '/products?category=bracelets' },
            { name: 'Charm bracelets', path: '/products?category=bracelets&tag=charm' },
            { name: 'Bangles', path: '/products?category=bracelets&tag=bangles' },
            { name: 'Tennis bracelets', path: '/products?category=bracelets&tag=tennis' },
            { name: 'Chain bracelets', path: '/products?category=bracelets&tag=chain' },
            { name: 'Leather bracelets', path: '/products?category=bracelets&tag=leather' },
            { name: 'Adjustable bracelets', path: '/products?category=bracelets&tag=adjustable' },
            { name: 'Bestselling bracelets', path: '/products?category=bracelets&sort=bestsellers' },
            { name: 'Sale up to 50% off bracelets', path: '/products?category=bracelets&filter=sale' },
            { name: '30% off select lab-grown diamond bracelets', path: '/products?category=bracelets&tag=labgrown' },
          ]
        },
        {
          title: 'Price',
          items: [
            { name: 'Under ₹100', path: '/products?category=bracelets&price=under100' },
            { name: '₹100 to ₹250', path: '/products?category=bracelets&price=100-250' },
            { name: 'Over ₹250', path: '/products?category=bracelets&price=over250' },
          ]
        }
      ]
    },
    {
      name: 'Necklaces',
      path: '/products?category=necklaces',
      submenu: [
        {
          title: 'Category',
          items: [
            { name: 'All necklaces', path: '/products?category=necklaces' },
            { name: 'Chain & charm necklaces', path: '/products?category=necklaces&tag=chain-charm' },
            { name: 'Pendant necklaces', path: '/products?category=necklaces&tag=pendant' },
            { name: 'Pendants', path: '/products?category=necklaces&tag=pendants' },
            { name: 'Initial necklaces', path: '/products?category=necklaces&tag=initial' },
            { name: 'Pearl necklaces', path: '/products?category=necklaces&tag=pearl' },
            { name: 'Lab-grown diamonds necklaces', path: '/products?category=necklaces&tag=labgrown' },
            { name: 'Bestselling necklaces', path: '/products?category=necklaces&sort=bestsellers' },
            { name: '30% off ready-to-give sets', path: '/products?category=necklaces&tag=readytogive-30' },
            { name: 'Sale 30% off necklaces', path: '/products?category=necklaces&filter=sale' },
          ]
        },
        {
          title: 'Price',
          items: [
            { name: 'Under ₹100', path: '/products?category=necklaces&price=under100' },
            { name: '₹100 to ₹250', path: '/products?category=necklaces&price=100-250' },
            { name: 'Over ₹250', path: '/products?category=necklaces&price=over250' },
          ]
        }
      ]
    },
    {
      name: 'Rings',
      path: '/products?category=rings',
      submenu: [
        {
          title: 'Category',
          items: [
            { name: 'All rings', path: '/products?category=rings' },
            { name: 'Promise rings', path: '/products?category=rings&tag=promise' },
            { name: 'Stacking rings', path: '/products?category=rings&tag=stacking' },
            { name: 'Heart rings', path: '/products?category=rings&tag=heart' },
            { name: 'Engagement rings', path: '/products?category=rings&tag=engagement' },
            { name: 'Statement rings', path: '/products?category=rings&tag=statement' },
            { name: 'Lab-grown diamond rings', path: '/products?category=rings&tag=labgrown' },
            { name: 'Bestselling rings', path: '/products?category=rings&sort=bestsellers' },
            { name: 'Sale up to 50% off rings', path: '/products?category=rings&filter=sale' },
            { name: '30% off select lab-grown diamond rings', path: '/products?category=rings&tag=labgrown-30' },
          ]
        },
        {
          title: 'Price',
          items: [
            { name: 'Under ₹75', path: '/products?category=rings&price=under75' },
            { name: '₹75 to ₹100', path: '/products?category=rings&price=75-100' },
            { name: '₹100 to ₹250', path: '/products?category=rings&price=100-250' },
            { name: 'Over ₹250', path: '/products?category=rings&price=over250' },
          ]
        }
      ]
    },
    {
      name: 'Earrings',
      path: '/products?category=earrings',
      submenu: [
        {
          title: 'Category',
          items: [
            { name: 'All earrings', path: '/products?category=earrings' },
            { name: 'Hoop & huggie earrings', path: '/products?category=earrings&tag=hoop-huggie' },
            { name: 'Stud earrings', path: '/products?category=earrings&tag=stud' },
            { name: 'Dangle & drop earrings', path: '/products?category=earrings&tag=dangle-drop' },
            { name: 'Pearl earrings', path: '/products?category=earrings&tag=pearl' },
            { name: 'Lab-grown diamonds earrings', path: '/products?category=earrings&tag=labgrown' },
            { name: 'Bestselling earrings', path: '/products?category=earrings&sort=bestsellers' },
            { name: '30% off ready-to-give sets', path: '/products?category=earrings&tag=readytogive-30' },
            { name: 'Sale 30% off earrings', path: '/products?category=earrings&filter=sale' },
          ]
        },
        {
          title: 'Price',
          items: [
            { name: 'Under ₹75', path: '/products?category=earrings&price=under75' },
            { name: '₹75 to ₹100', path: '/products?category=earrings&price=75-100' },
            { name: '₹100 to ₹250', path: '/products?category=earrings&price=100-250' },
            { name: 'Over ₹250', path: '/products?category=earrings&price=over250' },
          ]
        }
      ]
    },
    {
      name: 'Gifts',
      path: '/products?category=gifts',
      submenu: [
        {
          title: 'Category',
          items: [
            { name: 'Most gifted', path: '/products?category=gifts&sort=most-gifted' },
            { name: '30% off ready-to-give sets', path: '/products?category=gifts&tag=readytogive-30' },
            { name: 'Engravable gifts', path: '/products?category=gifts&tag=engravable' },
            { name: 'Zodiac gifts', path: '/products?category=gifts&tag=zodiac' },
            { name: 'Birth month gifts', path: '/products?category=gifts&tag=birth-month' },
            { name: 'Gift cards', path: '/products?category=gift-cards' },
            { name: 'Accessories', path: '/products?category=gifts&tag=accessories' },
          ]
        },
        {
          title: 'Theme',
          items: [
            { name: 'Love', path: '/products?category=gifts&tag=love' },
            { name: 'Symbols', path: '/products?category=gifts&tag=symbols' },
            { name: 'Family & friends', path: '/products?category=gifts&tag=family-friends' },
            { name: 'Travel & hobbies', path: '/products?category=gifts&tag=travel-hobbies' },
            { name: 'Occasions to celebrate', path: '/products?category=gifts&tag=occasions' },
            { name: 'Animals & pets', path: '/products?category=gifts&tag=animals-pets' },
            { name: 'Nature & celestial', path: '/products?category=gifts&tag=nature-celestial' },
          ]
        },
        {
          title: 'Occasion',
          items: [
            { name: 'All occasions', path: '/products?category=gifts&occasion=all' },
            { name: 'Mother\'s Day gifts', path: '/products?category=gifts&occasion=mothers-day' },
            { name: 'Graduation gifts', path: '/products?category=gifts&occasion=graduation' },
            { name: 'Birthday gifts', path: '/products?category=gifts&occasion=birthday' },
            { name: 'New mom & baby gifts', path: '/products?category=gifts&occasion=new-mom-baby' },
            { name: 'Bride & bridesmaids gifts', path: '/products?category=gifts&occasion=bride-bridesmaids' },
            { name: 'Engagement & wedding rings', path: '/products?category=gifts&occasion=engagement-wedding' },
            { name: 'Anniversary gifts', path: '/products?category=gifts&occasion=anniversary' },
            { name: 'Baptism & Sacrament gifts', path: '/products?category=gifts&occasion=baptism-sacrament' },
          ]
        },
        {
          title: 'Recipient',
          items: [
            { name: 'Gifts for mom', path: '/products?category=gifts&recipient=mom' },
            { name: 'Gifts for partner', path: '/products?category=gifts&recipient=partner' },
            { name: 'Gifts for grandma', path: '/products?category=gifts&recipient=grandma' },
            { name: 'Gifts for men', path: '/products?category=gifts&recipient=men' },
            { name: 'Gifts for friend', path: '/products?category=gifts&recipient=friend' },
            { name: 'Gifts for daughter', path: '/products?category=gifts&recipient=daughter' },
            { name: 'Gifts for sister', path: '/products?category=gifts&recipient=sister' },
            { name: 'Gifts for you', path: '/products?category=gifts&recipient=you' },
          ]
        },
        {
          title: 'Price',
          items: [
            { name: 'Under ₹50', path: '/products?category=gifts&price=under50' },
            { name: '₹50 to ₹75', path: '/products?category=gifts&price=50-75' },
            { name: '₹75 to ₹100', path: '/products?category=gifts&price=75-100' },
            { name: '₹100 to ₹250', path: '/products?category=gifts&price=100-250' },
            { name: 'Over ₹250', path: '/products?category=gifts&price=over250' },
          ]
        }
      ]
    },
    {
      name: 'Sale',
      path: '/products?filter=sale',
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    setUser(getStoredUser());
  }, [pathname]);

  useEffect(() => {
    setCartCount(getCartCount());
    setWishlistCount(getWishlistCount());
    const handleStorage = () => {
      setCartCount(getCartCount());
      setWishlistCount(getWishlistCount());
    };
    window.addEventListener('storage', handleStorage);
    window.addEventListener('cartUpdated', handleStorage);
    window.addEventListener('wishlistUpdated', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('cartUpdated', handleStorage);
      window.removeEventListener('wishlistUpdated', handleStorage);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setUser(null);
    router.push('/');
  };

  const isActive = (path: string) => pathname === path;
  const isHomePage = pathname === '/';

  const handleToggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const handleMouseEnter = (name: string) => {
    setActiveDropdown(name);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <header 
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled || !isHomePage 
          ? 'bg-[#8F4B43]/95 backdrop-blur-xl shadow-lg py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center" accessKey="0" aria-label="Home - Khurai Jewels logo">
            <img 
              src="/logo.png" 
              alt="Khurai Jewels - Home"
              className="h-14 w-auto object-contain"
            />
          </Link>

          <div 
            className="hidden lg:flex items-center justify-center flex-1"
            onMouseLeave={handleMouseLeave}
          >
            <div className="flex items-center gap-8">
              {navLinks.map((link) => (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => link.submenu && handleMouseEnter(link.name)}
                >
                  <button
                    onClick={() => link.submenu && handleToggleDropdown(link.name)}
                    className="relative py-2 group inline-block"
                    aria-haspopup="true"
                    aria-expanded={activeDropdown === link.name}
                    aria-label={link.name}
                  >
                    <span 
                      className={`text-sm tracking-wide uppercase transition-colors duration-300 ${
                        isActive(link.path) || activeDropdown === link.name
                          ? 'text-[#F5EDE6]' 
                          : 'text-[#F5EDE6]/70 hover:text-[#F5EDE6]'
                      }`}
                    >
                      {link.name}
                    </span>
                    <span 
                      className={`absolute bottom-0 left-0 h-0.5 bg-[#F5EDE6] transition-all duration-300 ${
                        isActive(link.path) || activeDropdown === link.name ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </button>
                 
                  {link.submenu && activeDropdown === link.name && (
                    <div 
                      className="absolute top-full left-1/2 -translate-x-1/2 w-[900px] h-[400px] mt-0 bg-[#8F4B43] border border-[#F5EDE6]/20 shadow-lg z-50 p-6"
                      onMouseEnter={() => setActiveDropdown(link.name)}
                    >
                      <div className="grid grid-cols-3 gap-8 h-full overflow-y-auto">
                        {link.submenu.map((section, idx) => (
                          <div key={idx} className="min-w-0 text-center">
                            <h4 className="text-[#F5EDE6]/50 text-xs uppercase tracking-wider mb-3">{section.title}</h4>
                            <ul className="space-y-2">
                              {section.items.map((item, itemIdx) => (
                                <li key={itemIdx}>
                                  <Link
                                    href={item.path}
                                    className="text-[#F5EDE6]/70 hover:text-[#F5EDE6] text-sm transition-colors"
                                    onClick={() => setActiveDropdown(null)}
                                  >
                                    {item.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <Tooltip content="Search">
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`p-2.5 rounded-full transition-all duration-300 hover:bg-[#F5EDE6]/10 text-[#F5EDE6]/60`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </Tooltip>

            <Tooltip content={`Wishlist (${wishlistCount} items)`}>
              <Link 
                href="/wishlist" 
                className={`relative p-2.5 rounded-full transition-all duration-300 hover:bg-[#F5EDE6]/10 text-[#F5EDE6]/60`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#F5EDE6] text-black text-xs font-medium rounded-full flex items-center justify-center">
                    {wishlistCount > 9 ? '9+' : wishlistCount}
                  </span>
                )}
              </Link>
            </Tooltip>

            <Tooltip content={`Cart (${cartCount} items)`}>
              <Link 
                href="/cart" 
                className={`relative p-2.5 rounded-full transition-all duration-300 hover:bg-[#F5EDE6]/10 text-[#F5EDE6]/60`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#F5EDE6] text-black text-xs font-bold flex items-center justify-center rounded-full">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </Link>
            </Tooltip>

            {user ? (
              <div className="relative group">
                <button className="p-2.5 rounded-full transition-all duration-300 hover:bg-[#F5EDE6]/10 text-[#F5EDE6]/60">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </button>
                <div className="absolute right-0 top-full mt-2 w-48 bg-[#8F4B43] border border-[#F5EDE6]/20 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="p-3 border-b border-[#F5EDE6]/20">
                    <p className="text-[#F5EDE6] text-sm">{user.name}</p>
                    <p className="text-[#F5EDE6]/50 text-xs">{user.email}</p>
                  </div>
                  {user.role === 'admin' && (
                    <Link href="/admin" className="block px-3 py-2 text-[#F5EDE6]/70 hover:text-[#F5EDE6] hover:bg-[#F5EDE6]/10 text-sm">
                      Admin Panel
                    </Link>
                  )}
                  <Link href="/account/orders" className="block px-3 py-2 text-[#F5EDE6]/70 hover:text-[#F5EDE6] hover:bg-[#F5EDE6]/10 text-sm">
                    My Orders
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 text-[#F5EDE6]/70 hover:text-[#F5EDE6] hover:bg-[#F5EDE6]/10 text-sm"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Tooltip content="Login">
                <Link 
                  href="/login" 
                  className="p-2.5 rounded-full transition-all duration-300 hover:bg-[#F5EDE6]/10 text-[#F5EDE6]/60"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </Link>
              </Tooltip>
            )}

            <Tooltip content="Menu">
              <button 
                className="lg:hidden p-2.5 rounded-full transition-all duration-300 hover:bg-[#F5EDE6]/10"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <svg className="w-5 h-5 text-[#F5EDE6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </Tooltip>
          </div>
        </div>

        <div className={`overflow-hidden transition-all duration-300 ${
          isSearchOpen ? 'max-h-20 opacity-100 mt-4' : 'max-h-0 opacity-0'
        }`}>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search for jewelry..."
              className="w-full bg-[#F5EDE6]/10 border border-[#F5EDE6]/20 rounded-full py-3 px-5 text-[#F5EDE6] placeholder-[#F5EDE6]/50 focus:outline-none focus:border-[#F5EDE6]"
            />
            <button 
              onClick={() => setIsSearchOpen(false)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#F5EDE6]/60 hover:text-[#F5EDE6]"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-4 border-t border-[#F5EDE6]/10 space-y-2">
            {navLinks.map((link) => (
              <div key={link.name}>
                <Link
                  href={link.path}
                  className={`block py-3 px-2 text-sm tracking-wide uppercase rounded-lg transition-colors ${
                    isActive(link.path) 
                      ? 'text-[#F5EDE6] bg-[#F5EDE6]/10' 
                      : 'text-[#F5EDE6]/70 hover:text-[#F5EDE6] hover:bg-[#F5EDE6]/5'
                  }`}
                >
                  {link.name}
                </Link>
                {link.submenu && (
                  <div className="pl-4 space-y-2 mt-1">
                    {link.submenu.map((section, idx) => (
                      <div key={idx} className="mb-2">
                        <p className="text-[#F5EDE6]/50 text-xs uppercase tracking-wider mb-1">{section.title}</p>
                        {section.items.slice(0, 5).map((item, itemIdx) => (
                          <Link
                            key={itemIdx}
                            href={item.path}
                            className="block py-1 px-2 text-xs text-[#F5EDE6]/60 hover:text-[#F5EDE6] transition-colors"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
