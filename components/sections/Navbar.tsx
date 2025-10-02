'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="bg-white shadow-lg fixed top-0 z-50 w-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-3">
              <Link href="/" className="flex items-center space-x-3">
                <Image
                  src="/KC Logo.svg"
                  alt="KC Logo"
                  width={40}
                  height={40}
                  className="w-8 h-8 sm:w-10 sm:h-10"
                />
                <span className="text-lg sm:text-xl md:text-2xl font-bold text-green-800">
                  KHIRA CHOKADA
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="#products"
                className="text-gray-700 hover:text-green-600 text-sm font-medium transition-colors duration-200"
              >
                Our Products
              </Link>
              <Link
                href="#footer"
                className="text-gray-700 hover:text-green-600 text-sm font-medium transition-colors duration-200"
              >
                Contact
              </Link>
              <Link
                href="#verify"
                className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors duration-200"
              >
                Verify Products
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-gray-700 hover:text-green-600 focus:outline-none focus:text-green-600"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation - Moved outside the main nav */}
      <div className={`md:hidden fixed inset-0 z-40 ${isMenuOpen ? 'block' : 'hidden'}`}>
        {/* Overlay with transparent background */}
        {isMenuOpen && (
          <div 
            className="fixed inset-0 bg-transparent"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
        
        {/* Slide-in Menu - Starts below the navbar */}
        <div 
          className={`fixed top-16 right-0 w-4/5 h-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full pt-4 px-6 space-y-4">
            <Link
              href="#products"
              className="text-gray-700 hover:text-green-600 px-3 py-3 rounded-md text-base font-medium border border-gray-400 transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Our Products
            </Link>
            <Link
              href="#footer"
              className="text-gray-700 hover:text-green-600 px-3 py-3 rounded-md text-base font-medium border border-gray-400 transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="#verify"
              className="bg-green-600 text-white px-4 py-3 rounded-md text-base font-medium hover:bg-green-700 text-center transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Verify Products
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;