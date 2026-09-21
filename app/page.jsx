'use client';

import HeroSection from '@/components/home/HeroSection';
import CategoriesSection from '@/components/home/CategoriesSection';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import WhyChooseUsSection from '@/components/home/WhyChooseUsSection';
import RationPackagesPreview from '@/components/home/RationPackagesPreview';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CTASection from '@/components/home/CTASection';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection />
      
      {/* Categories Section */}
      <CategoriesSection />
      
      {/* Featured Products */}
      <FeaturedProducts />
      
      {/* Why Choose Us */}
      <WhyChooseUsSection />
      
      {/* Ration Packages */}
      <RationPackagesPreview />
      
      {/* Customer Testimonials */}
      <TestimonialsSection />
      
      {/* Call to Action */}
      <CTASection />
    </>
  );
}
