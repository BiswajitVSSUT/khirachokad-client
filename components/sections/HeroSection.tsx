'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen md:min-h-[70vh] lg:min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100 bg-[url('/Bg.png')] bg-cover bg-center bg-no-repeat">
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-green-100 opacity-50"></div>

        {/* Decorative elements inspired by the image */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-orange-300 rounded-full opacity-20"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-yellow-300 rounded-full opacity-20"></div>
        <div className="absolute bottom-32 left-20 w-24 h-24 bg-orange-200 rounded-full opacity-20"></div>
      </div>

      {/* Rest of your component remains the same */}
      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center grid-flow-row-dense">
          {/* Left Content */}
          <div className="mt-10 md:mt-0 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
              Premium{' '}
              <span className="text-green-600">Cattle Feed</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
              Pure and healthy nutrition for your livestock.
              KHIRA CHOKADA provides premium quality feed that ensures
              healthy, productive cattle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200">
                <Link href={"#products"}>
                  View Products
                </Link>
              </button>
              <button className="border-2 border-green-600 text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-600 hover:text-white transition-colors duration-200">
                <Link href={"#usp"}>
                  Learn More
                </Link>
              </button>
            </div>
          </div>

          {/* Right Content - Product Image */}
          <div className="relative">
            <div className="relative w-full h-96 lg:h-[500px]">
              <Image
                src="/Cow.png"
                alt="KHIRA CHOKADA Cattle Feed"
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -right-0 lg:-right-4 w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 bg-green-600 rounded-full flex items-center justify-center text-white font-extrabold text-3xl opacity-90">
              ✓
            </div>
            <div className="absolute -bottom-2 md:bottom-4 lg:-bottom-4 -left-4 md:left-16 lg:-left-4 w-30 h-30 rounded-full flex items-center justify-center text-white font-bold text-lg opacity-90">
              <Image
                src="/chokada.svg"
                alt="KHIRA CHOKADA Cattle Feed"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 w-full ">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-25"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className="fill-green-600/90"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;