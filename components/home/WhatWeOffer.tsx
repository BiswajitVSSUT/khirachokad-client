'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  features: string[];
}

interface WhatWeOfferProps {
  products?: Product[];
}

const defaultProducts: Product[] = [
  {
    id: '1',
    name: 'Khira Chokada',
    description: 'High-quality nutrition blend for optimal cattle health and milk production.',
    image: '/khira-chokada.webp',
    features: ['Rich in protein', 'Natural ingredients', 'Enhanced digestibility']
  },
  {
    id: '2',
    name: 'Gai Chokada',
    description: 'Specially formulated for young cattle to ensure proper growth and development.',
    image: '/gai-chokada.webp',
    features: ['Growth nutrients', 'Immune support', 'Balanced minerals']
  },
  {
    id: '3',
    name: 'Protein Chokada',
    description: 'Advanced nutrition for lactating cows to maximize milk quality and quantity.',
    image: '/protein-chokada.webp',
    features: ['Milk production boost', 'Quality enhancement', 'Health maintenance']
  }
];

const WhatWeOffer: React.FC<WhatWeOfferProps> = ({ products = defaultProducts }) => {
  return (
    <section id="products" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            What We Offers
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Premium quality cattle feed products designed to meet the nutritional needs 
            of your livestock for optimal health and productivity.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Product Image */}
              <div className="relative h-96 bg-gradient-to-br from-green-50 to-green-100">
                <Image
                  src={product.image}
                  alt={product.name}
                  priority
                  fill
                  className="object-cover object-top"
                />
              </div>

              {/* Product Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {product.description}
                </p>

                {/* Features */}
                {/* <ul className="space-y-2 mb-6">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-700">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul> */}

                {/* Action Button */}
                {/* <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200">
                  Learn More
                </button> */}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Looking for custom solutions for your cattle farm?
          </p>
          <button className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-200">
            <Link href={"#footer"}>
            Contact Us Today
            </Link>
          </button>
        </div>
      </div>
    </section>
  );
};

export default WhatWeOffer;
