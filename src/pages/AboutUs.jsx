import React, { useEffect, useState } from 'react';

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const stats = [
    { label: "Acres Managed", value: "50K+" },
    { label: "Active Farmers", value: "12,000" },
    { label: "Crop Yield Increase", value: "34%" },
    { label: "Community Partners", value: "150+" }
  ];

  return (
    <main className="min-h-screen bg-white pb-24 font-sans text-gray-800">
      {/* Premium Split Hero */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 lg:px-16 overflow-hidden flex items-center min-h-[80vh]">
        <div className="absolute inset-0 w-full h-full lg:w-1/2 bg-[#1b2b1d]"></div>
        <div className="absolute inset-0 w-full h-full lg:w-1/2 lg:left-1/2">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/farm.avif')", filter: "contrast(1.1) saturate(1.2)" }}></div>
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#1b2b1d]/50 to-[#1b2b1d] lg:via-[#1b2b1d]/80"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-left text-white pr-0 lg:pr-12">
            <h4 className="text-[#f7c35f] font-bold tracking-widest uppercase mb-4 text-sm">Who We Are</h4>
            <h1 className="text-5xl lg:text-7xl font-black mb-6 leading-tight">
              Cultivating the <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-[#f7c35f]">Future</span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-300 leading-relaxed mb-8 border-l-4 border-[#f7c35f] pl-6 py-2">
              We merge deep-rooted agricultural traditions with bleeding-edge AI and decentralization to secure global food systems.
            </p>
          </div>
        </div>
      </section>

      {/* Floating Stats */}
      <section className="relative z-20 max-w-6xl mx-auto px-6 -mt-16 lg:-mt-24 mb-32" aria-label="Company Statistics">
        <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 border border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-gray-100">
          {stats.map((stat, i) => (
            <article key={i} className="text-center px-4">
              <div className="text-3xl lg:text-5xl font-black text-[#263a28] mb-2">{stat.value}</div>
              <div className="text-sm font-semibold tracking-wide text-gray-500 uppercase">{stat.label}</div>
            </article>
          ))}
        </div>
      </section>

      {/* Zig Zag Content */}
      <section className="max-w-7xl mx-auto px-6 lg:px-16 space-y-32">
        {/* Section 1 */}
        <div className="flex flex-col lg:flex-row items-center gap-16 group">
          <div className="w-full lg:w-1/2 relative">
            <div className="absolute inset-0 bg-green-200 transform rounded-3xl rotate-3 group-hover:rotate-6 transition-transform duration-500"></div>
            <div className="relative h-96 bg-cover bg-center rounded-3xl shadow-xl transform group-hover:-translate-y-2 transition-transform duration-500" style={{ backgroundImage: "url('/farm.avif')", filter: "hue-rotate(-15deg)" }}></div>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="w-16 h-1 bg-[#f7c35f] mb-6"></div>
            <h2 className="text-4xl font-bold text-[#1b2b1d] mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              We are on a relentless mission to empower every farmer with enterprise-grade technology. By lowering the barrier to entry for AI and predictive analytics, we combat climate unpredictability and volatile markets, ensuring that local agriculture remains sustainable and deeply profitable.
            </p>
          </div>
        </div>

        {/* Section 2 */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16 group">
          <div className="w-full lg:w-1/2 relative">
            <div className="absolute inset-0 bg-[#f7c35f]/30 transform rounded-3xl -rotate-3 group-hover:-rotate-6 transition-transform duration-500"></div>
            <div className="relative h-96 bg-cover bg-center rounded-3xl shadow-xl transform group-hover:-translate-y-2 transition-transform duration-500" style={{ backgroundImage: "url('/farm.avif')", filter: "brightness(1.1) contrast(1.2)" }}></div>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="w-16 h-1 bg-[#f7c35f] mb-6"></div>
            <h2 className="text-4xl font-bold text-[#1b2b1d] mb-6">The Vision</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              A decentralized, farmer-first economy where data and organic resources flow freely. We picture a thriving ecosystem untouched by monolithic middlemen, prioritizing local ecosystems, maximum crop nutrition, and zero waste pipelines.
            </p>
            <ul className="space-y-4 text-gray-700 font-medium">
              <li className="flex items-center"><span className="text-[#f7c35f] mr-3">✔</span> 100% Organic Supply Chains</li>
              <li className="flex items-center"><span className="text-[#f7c35f] mr-3">✔</span> Zero-Emission Agri-Logistics</li>
              <li className="flex items-center"><span className="text-[#f7c35f] mr-3">✔</span> Fair-Trade Digital Marketplaces</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutUs;
