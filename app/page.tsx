import React from 'react';
import Navbar from '../components/sections/Navbar';
import HeroSection from '../components/sections/HeroSection';
import WhatWeOffer from '../components/sections/WhatWeOffer';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import VerifyProduct from '../components/sections/VerifyProduct';
import CustomerReviews from '../components/sections/CustomerReviews';
import Footer from '../components/sections/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <WhatWeOffer />
      <WhyChooseUs />
      <VerifyProduct />
      <CustomerReviews />
      <Footer />
    </div>
  );
}
