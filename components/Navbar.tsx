"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, User, Menu, X, Search, HelpCircle, History, LogIn } from 'lucide-react'; // Added LogIn icon
import { useCartStore } from '@/lib/store';

interface NavLink {
  name: string;
  href: string;
}

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  
  const cart = useCartStore((state) => state.cart);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const totalItems = cart.reduce((acc, item) => acc + (item.quantity || 0), 0);

  const leftLinks: NavLink[] = [
    { name: 'Homepage', href: '/' },
    { name: 'Collections', href: '/products' },
  ];

  return (
    <nav className="fixed top-0 w-full z-100 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center h-16 md:h-20">
          
          {/* Mobile Menu Trigger */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden text-black p-2 -ml-2"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 lg:space-x-10 items-center">
            {leftLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="font-playfair text-[10px] lg:text-[11px] uppercase tracking-[0.25em] hover:opacity-50 transition-opacity"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Brand Logo - Responsive sizing */}
          <div className="absolute left-1/2 -translate-x-1/2 text-center w-max">
            <Link href="/" className="font-playfair text-base md:text-xl font-bold tracking-[0.3em] md:tracking-[0.4em] uppercase">
              LUXEDIAMOND
            </Link>
          </div>

          {/* Icon Actions */}
          <div className="flex items-center space-x-3 md:space-x-6">
            <button className="hidden sm:block hover:opacity-50">
              <Search size={18} strokeWidth={1.5} />
            </button>
            
            <Link href="/help" title="Contact & Help Center" className="hidden sm:block hover:opacity-50">
              <HelpCircle size={18} strokeWidth={1.5} />
            </Link>

            {/* ADDED: Login Button */}
            <Link href="/login" title="Login / Signup" className="hover:opacity-50 flex items-center gap-1">
              <LogIn size={18} strokeWidth={1.5} />
              <span className="hidden lg:block text-[9px] uppercase tracking-widest">Login</span>
            </Link>

            {/* Path to User Profile & History */}
            <Link href="/profile" title="User Profile & Order History" className="hover:opacity-50">
              <User size={19} strokeWidth={1.5} />
            </Link>

            <Link href="/cart" className="relative group p-1">
              <ShoppingBag size={19} strokeWidth={1.5} />
              {isClient && totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-black text-white text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold animate-in zoom-in duration-300">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-white z-90 overflow-y-auto animate-in slide-in-from-top duration-300">
          <div className="p-8 space-y-8">
            <div className="space-y-4">
              <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Menu</p>
              {leftLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  className="block font-playfair text-2xl uppercase tracking-widest border-b border-gray-50 pb-4"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="pt-4 space-y-6">
              <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Account</p>
              <div className="grid grid-cols-1 gap-4">
                {/* ADDED: Mobile Login Link */}
                <Link href="/login" onClick={() => setIsOpen(false)} className="flex items-center gap-3 text-sm uppercase tracking-widest font-medium">
                  <LogIn size={16} /> Sign In / Register
                </Link>
                <Link href="/profile" onClick={() => setIsOpen(false)} className="flex items-center gap-3 text-sm uppercase tracking-widest font-medium">
                  <History size={16} /> Order History
                </Link>
                <Link href="/help" onClick={() => setIsOpen(false)} className="flex items-center gap-3 text-sm uppercase tracking-widest font-medium">
                  <HelpCircle size={16} /> Customer Support
                </Link>
              </div>
              
              <Link 
                href="/cart" 
                onClick={() => setIsOpen(false)}
                className="block bg-black text-white text-center py-5 uppercase text-[10px] tracking-[0.2em] font-bold mt-8"
              >
                Checkout Bag ({isClient ? totalItems : 0})
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;