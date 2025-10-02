'use client';

import React from 'react';

interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  review: string;
  avatar: string;
}

const CustomerReviews = () => {
  const reviews: Review[] = [
    {
      id: '1',
      name: 'Rajesh Kumar',
      location: 'Puri, Odisha',
      rating: 5,
      review: 'Excellent quality feed! My cattle have shown significant improvement in health and milk production since switching to KHIRA CHOKADA.',
      avatar: '/api/placeholder/60/60'
    },
    {
      id: '2',
      name: 'Priya Singh',
      location: 'Bhubaneswar, Odisha',
      rating: 5,
      review: 'Pure and natural ingredients. My cows love this feed and their overall health has improved dramatically.',
      avatar: '/api/placeholder/60/60'
    },
    {
      id: '3',
      name: 'Amit Patel',
      location: 'Cuttack, Odisha',
      rating: 5,
      review: 'Best cattle feed in the market. Consistent quality and reliable delivery. Highly recommended!',
      avatar: '/api/placeholder/60/60'
    },
    {
      id: '4',
      name: 'Sunita Devi',
      location: 'Konark, Odisha',
      rating: 5,
      review: 'Great value for money. My livestock are healthier and more productive. Thank you KHIRA CHOKADA!',
      avatar: '/api/placeholder/60/60'
    },
    {
      id: '5',
      name: 'Manoj Das',
      location: 'Balasore, Odisha',
      rating: 5,
      review: 'Outstanding product quality. The feed is easily digestible and my cattle show great appetite for it.',
      avatar: '/api/placeholder/60/60'
    },
    {
      id: '6',
      name: 'Geeta Mahapatra',
      location: 'Berhampur, Odisha',
      rating: 5,
      review: 'Reliable brand with consistent quality. My milk production has increased by 20% after using this feed.',
      avatar: '/api/placeholder/60/60'
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-lg ${
          index < rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
      >
        ★
      </span>
    ));
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            What People Say About Our Product
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real feedback from our satisfied customers who trust KHIRA CHOKADA 
            for their livestock nutrition needs.
          </p>
        </div>

        {/* Reviews Marquee */}
        <div className="relative overflow-hidden">
          <div className="flex animate-marquee space-x-6">
            {/* First set of reviews */}
            {reviews.map((review) => (
              <div
                key={review.id}
                className="flex-shrink-0 w-80 bg-gray-50 rounded-lg p-6 shadow-md"
              >
                {/* Customer Info */}
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-green-600 font-bold text-lg">
                      {review.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{review.name}</h4>
                    <p className="text-sm text-gray-600">{review.location}</p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  {renderStars(review.rating)}
                </div>

                {/* Review Text */}
                <p className="text-gray-700 text-sm leading-relaxed">
                &quot;{review.review}&quot;
                </p>
              </div>
            ))}

            {/* Duplicate set for seamless loop */}
            {reviews.map((review) => (
              <div
                key={`duplicate-${review.id}`}
                className="flex-shrink-0 w-80 bg-gray-50 rounded-lg p-6 shadow-md"
              >
                {/* Customer Info */}
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-green-600 font-bold text-lg">
                      {review.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{review.name}</h4>
                    <p className="text-sm text-gray-600">{review.location}</p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  {renderStars(review.rating)}
                </div>

                {/* Review Text */}
                <p className="text-gray-700 text-sm leading-relaxed">
                &quot;{review.review}&quot;
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-12 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">4.9/5</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">500+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">98%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
