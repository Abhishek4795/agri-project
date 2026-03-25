import React, { useEffect } from 'react';

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fcf8] pb-24">
      {/* Banner */}
      <div className="relative bg-[#263a28] pt-40 pb-24 px-6 md:px-16 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-cover bg-center" style={{ backgroundImage: "url('/farm.avif')" }}></div>
        <div className="absolute inset-0 bg-[#263a28] mix-blend-multiply"></div>
        <div className="relative max-w-5xl mx-auto text-center z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">About <span className="text-[#f7c35f]">AgriSync Eco</span></h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto leading-relaxed">
            Bridging the gap between traditional farming and modern agricultural technology to create a sustainable, high-yield future.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-[#263a28] mb-6">Our Mission</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              At AgriSync Eco, our core mission is to empower farmers globally through robust, data-driven agricultural tools. We believe that by integrating deep learning, weather forecasting, and market insights into daily farming practices, we can eradicate inefficiencies and secure global food production for the next generation.
            </p>
            <h2 className="text-3xl font-bold text-[#263a28] mb-6">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              We envision a world where every farmer, regardless of the size of their plot, has access to enterprise-grade analytics, organic high-quality seeds, and a fair decentralized marketplace. A world where agriculture works perfectly in sync with the ecosystem.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-2xl relative">
            <div className="absolute inset-0 bg-black/20 z-10"></div>
            <img src="/farm.avif" alt="Farming Team" className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
