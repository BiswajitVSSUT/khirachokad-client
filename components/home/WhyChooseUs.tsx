'use client';

import React from 'react';
import { Shield, Leaf, Award, Truck } from 'lucide-react';

interface USP {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const WhyChooseUs = () => {
  const usps: USP[] = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Quality Guaranteed',
      description: 'All our products undergo rigorous quality testing to ensure the highest standards for your cattle.'
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: 'Natural Ingredients',
      description: 'We use only natural, organic ingredients sourced from trusted suppliers for optimal nutrition.'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Expert Formulation',
      description: 'Our feed is formulated by veterinary nutritionists with decades of experience in cattle health.'
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: 'Reliable Delivery',
      description: 'Timely delivery across the region with proper storage and handling to maintain product freshness.'
    }
  ];

  return (
    <section className="py-16 bg-white" id="usp">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Why Choose Us
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We are committed to providing the best cattle feed solutions with 
            unmatched quality and service that your livestock deserves.
          </p>
        </div>

        {/* USP Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {usps.map((usp, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300"
            >
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full mb-4">
                {usp.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {usp.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {usp.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-green-50 rounded-lg p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">500+</div>
              <div className="text-gray-600">Happy Farmers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">10+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
              <div className="text-gray-600">Quality Assured</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">24/7</div>
              <div className="text-gray-600">Customer Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
