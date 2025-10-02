import React from 'react';
import Navbar from '../components/home/Navbar';
import HeroSection from '../components/home/HeroSection';
import WhatWeOffer from '../components/home/WhatWeOffer';
import WhyChooseUs from '../components/home/WhyChooseUs';
import VerifyProduct from '../components/home/VerifyProduct';
import CustomerReviews from '../components/home/CustomerReviews';
import Footer from '../components/home/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <WhatWeOffer />
      <WhyChooseUs />
      <VerifyProduct />
      <CustomerReviews />
      <Footer />
    </div>
  );
}
