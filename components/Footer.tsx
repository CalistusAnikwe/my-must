"use client";

import React from 'react';
import Link from 'next/link';
import { Instagram, Twitter, Facebook, LogIn } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Brand Identity */}
          <div className="space-y-6">
            <Link href="/" className="font-playfair text-xl font-bold tracking-[0.4em] uppercase">
              LUXEDIAMOND
            </Link>
            <p className="text-gray-500 text-xs leading-relaxed max-w-[240px]">
              Crafting brilliance for a century. We specialize in the world's most exquisite certified diamonds and bespoke high jewelry.
            </p>
            <div className="flex gap-4 text-black">
              <Instagram size={18} className="cursor-pointer hover:opacity-50 transition-opacity" />
              <Twitter size={18} className="cursor-pointer hover:opacity-50 transition-opacity" />
              <Facebook size={18} className="cursor-pointer hover:opacity-50 transition-opacity" />
            </div>
          </div>

          {/* Column 2: Collections (Discovery) */}
          <div className="space-y-6">
            <h4 className="font-playfair text-[10px] uppercase tracking-[0.3em] font-bold">Collections</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/" className="text-[11px] uppercase tracking-widest hover:text-gray-400 transition-colors">Homepage</Link>
              </li>
              <li>
                <Link href="/products" className="text-[11px] uppercase tracking-widest hover:text-gray-400 transition-colors">Product Listing</Link>
                <p className="text-[9px] text-gray-400 mt-1 lowercase italic italic-font-meie">includes individual product details</p>
              </li>
              <li>
                <Link href="/cart" className="text-[11px] uppercase tracking-widest hover:text-gray-400 transition-colors">Shopping Cart</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Client Care (Functional) */}
          <div className="space-y-6">
            <h4 className="font-playfair text-[10px] uppercase tracking-[0.3em] font-bold">Client Care</h4>
            <ul className="space-y-4">
              {/* ADDED: Login / Sign Up Link */}
              <li>
                <Link href="/login" className="text-[11px] flex items-center gap-2 uppercase tracking-widest hover:text-gray-400 transition-colors font-bold">
                  <LogIn size={14} strokeWidth={2} /> Sign In / Register
                </Link>
              </li>
              <li>
                <Link href="/checkout" className="text-[11px] uppercase tracking-widest hover:text-gray-400 transition-colors">Checkout Page</Link>
              </li>
              <li>
                <Link href="/profile" className="text-[11px] uppercase tracking-widest hover:text-gray-400 transition-colors">User Profile & Orders</Link>
              </li>
              <li>
                <Link href="/help" className="text-[11px] uppercase tracking-widest hover:text-gray-400 transition-colors">Contact & Help Center</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter/Join the Circle */}
          <div className="space-y-6">
            <h4 className="font-meie text-2xl text-black">Join the Inner Circle</h4>
            <p className="text-gray-500 text-[10px] uppercase tracking-widest">Be the first to discover new arrivals.</p>
            <div className="flex border-b border-black pb-2">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-transparent text-[11px] uppercase tracking-widest outline-none w-full placeholder:text-gray-300"
              />
              <button className="text-[10px] uppercase font-bold tracking-widest hover:opacity-50 transition-opacity">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="border-t border-gray-50 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[9px] text-gray-400 tracking-widest text-center md:text-left">
            © 2026 LUXE DIAMOND LTD. ALL RIGHTS RESERVED.
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            <Link href="/privacy" className="text-[9px] text-gray-400 uppercase tracking-widest hover:text-black">Privacy Policy</Link>
            <Link href="/terms" className="text-[9px] text-gray-400 uppercase tracking-widest hover:text-black">Terms of Service</Link>
            <Link href="/cookies" className="text-[9px] text-gray-400 uppercase tracking-widest hover:text-black">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;