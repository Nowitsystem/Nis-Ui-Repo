import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import DetailedFeatures from '../components/DetailedFeatures';
import Footer from '../components/Footer';
import CTA from '../components/CTA';

const FeaturesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#050510] min-h-screen">
      <Navbar />
      <main>
        <DetailedFeatures />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default FeaturesPage;
