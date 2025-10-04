'use client';

import React from 'react';
import Image from 'next/image';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white" id="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className='flex flex-col gap-0'>
            <div className="flex items-center space-x-3 mb-4">
              <Image
                src="/KC Logo.svg"
                alt="KC Logo"
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <span className="text-xl font-bold text-green-400">
                KHIRA CHOKADA
              </span>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Premium quality cattle feed products for healthy, productive livestock.
              Your trusted partner in animal nutrition.
            </p>
            <div className="flex gap-2 items-center">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors duration-200 cursor-pointer">
                <Mail className="w-4 h-4" />
              </div>
              <a
                href="mailto:matrushakti.international@yahoo.com"
                className='self-center leading-10 hover:underline'>
                matrushakti.international@yahoo.com
              </a>
            </div>
            <div className="flex gap-2 items-center">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors duration-200 cursor-pointer">
                <Phone className="w-4 h-4" />
              </div>
              <a
                href="tel:+917787021111"
                className='self-center leading-10 hover:underline'>
                +91 7787-021111
              </a>
            </div>
            <div className="flex gap-2 items-center">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors duration-200 cursor-pointer">
                <Phone className="w-4 h-4" />
              </div>
              <a
                href="tel:+917787031111"
                className='self-center leading-10 hover:underline'>
                +91 7787-031111
              </a>
            </div>
          </div>

          {/* Shop Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Shop Information</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 mt-1 mr-3 text-green-400 flex-shrink-0" />
                <div>
                  <p className="font-medium">Floor No.: KHATA NO - 397/478</p>
                  <p>Building No./Flat No.: PLOT NO - 1430/2052 30/2052</p>
                  <p>Name Of Premises/Building: PS - KONARK</p>
                  <p>Road/Street: JUNEI</p>
                  <p>Locality/Sub Locality: Junai Bazar</p>
                  <p>City/Town/Village: Konark</p>
                  <p>District: Puri</p>
                  <p>State: Odisha</p>
                  <p>PIN Code: 752111</p>
                </div>
              </div>
            </div>
          </div>

          {/* Google Maps */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Find Us</h3>
            <div className="bg-gray-700 rounded-lg overflow-hidden">
            <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3751.706142440295!2d86.10464857522625!3d19.894626581485888!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTnCsDUzJzQwLjciTiA4NsKwMDYnMjYuMCJF!5e0!3m2!1sen!2sin!4v1759381203611!5m2!1sen!2sin"
            width="100%"
            height="200"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="KHIRA CHOKADA Location" 
            ></iframe>
            </div>
            <div className="mt-4 flex items-center text-gray-300">
              <Clock className="w-4 h-4 mr-2 text-green-400" />
              <span>Mon-Sat: 8:00 AM - 6:00 PM</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 KHIRA CHOKADA. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              {/* <a href="#" className="text-gray-400 hover:text-green-400 transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors duration-200">
                Terms of Service
              </a> */}
              <a href="#footer" className="text-gray-400 hover:text-green-400 transition-colors duration-200">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

