'use client';

import HeroSection from '@/components/home/HeroSection';
import CategoriesSection from '@/components/home/CategoriesSection';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import WhyChooseUsSection from '@/components/home/WhyChooseUsSection';
import RationPackagesPreview from '@/components/home/RationPackagesPreview';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import CTASection from '@/components/home/CTASection';
import StoreExperienceSection from '@/components/home/StoreExperienceSection';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      <StoreExperienceSection />
      
      {/* Categories Section */}
      <CategoriesSection />
      
      {/* Featured Products */}
      <FeaturedProducts />
      
      {/* Why Choose Us */}
      <WhyChooseUsSection />
      
      {/* Ration Packages */}
      <RationPackagesPreview />
      
      <HowItWorksSection />
      
      {/* Call to Action */}
      <CTASection />
    </>
  );
}
