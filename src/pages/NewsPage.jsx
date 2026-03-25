import React, { useEffect } from 'react';
import News from './AgriNewsSection';

const NewsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fcf8] pb-24 font-serif text-gray-900">
      
      {/* Magazine Style Header */}
      <div className="pt-32 pb-10 px-6 lg:px-16 max-w-7xl mx-auto border-b-4 border-[#263a28]">
        <div className="flex justify-between items-end mb-6">
          <h1 className="text-6xl md:text-8xl font-black text-[#1b2b1d] uppercase tracking-tighter">
            Agri<span className="text-[#f7c35f]">Journal</span>
          </h1>
          <div className="hidden md:block text-right mb-2">
            <p className="font-sans text-sm font-bold tracking-widest uppercase text-gray-500">Vol. 42 / Issue 08</p>
            <p className="font-sans text-sm text-gray-400">Published {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* Featured Editorial */}
      <div className="max-w-7xl mx-auto px-6 lg:px-16 mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Main Feature */}
        <div className="lg:col-span-8 group cursor-pointer">
          <div className="relative h-[60vh] lg:h-[70vh] w-full overflow-hidden mb-6">
            <div className="absolute inset-0 bg-cover bg-center transform group-hover:scale-105 transition-transform duration-1000 saturate-50 group-hover:saturate-100" style={{ backgroundImage: "url('/farm.avif')" }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#1b2b1d] directly to-transparent opacity-80"></div>
            
            <div className="absolute bottom-0 left-0 p-8 lg:p-12">
              <span className="font-sans bg-[#f7c35f] text-black text-xs font-bold px-3 py-1 uppercase tracking-widest mb-4 inline-block">Breaking Analysis</span>
              <h2 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-4">
                The AI Revolution: How Machine Learning is Saving the Summer Harvest.
              </h2>
              <p className="font-sans text-green-100 text-lg lg:text-xl max-w-2xl opacity-90 hidden md:block">
                With unpredictable climate shifts threatening global wheat yields, neural networks are providing highly actionable micro-climate analytics directly to rural devices.
              </p>
            </div>
          </div>
        </div>

        {/* Side Editorials */}
        <div className="lg:col-span-4 flex flex-col space-y-8 lg:border-l border-gray-300 lg:pl-10">
          <h3 className="font-sans font-bold text-sm tracking-widest uppercase text-gray-400 border-b border-gray-300 pb-2">Trending</h3>
          
          <div className="group cursor-pointer">
            <h4 className="text-2xl font-bold leading-snug group-hover:text-green-700 transition-colors mb-2">
              Banning Synthetic Pesticides: The European Verdict and Global Impact.
            </h4>
            <p className="font-sans text-gray-500 text-sm">By Dr. Elena Rostova • 3 min read</p>
          </div>
          
          <div className="group cursor-pointer">
            <h4 className="text-2xl font-bold leading-snug group-hover:text-green-700 transition-colors mb-2">
              Drone Swarms for Pollination: Fact or Fiction?
            </h4>
            <p className="font-sans text-gray-500 text-sm">By Jonathan Field • 5 min read</p>
          </div>
          
          <div className="group cursor-pointer">
            <h4 className="text-2xl font-bold leading-snug group-hover:text-green-700 transition-colors mb-2">
              Decentralized Marketplaces Eliminating The 40% Middleman Cut.
            </h4>
            <p className="font-sans text-gray-500 text-sm">By Aashish Sharma • 8 min read</p>
          </div>

          <div className="mt-auto bg-[#1b2b1d] p-8 text-white">
            <h4 className="text-2xl font-bold mb-4">Subscribe to our weekly dispatch.</h4>
            <div className="flex border-b border-white/30 pb-2">
              <input type="email" placeholder="Email Address" className="bg-transparent border-none outline-none font-sans w-full placeholder-white/50" />
              <button className="font-sans font-bold text-[#f7c35f] uppercase text-sm tracking-wider">Join</button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-16 mt-20 mb-10">
        <div className="w-full h-1 bg-gray-200 mb-10"></div>
        <h3 className="font-sans font-bold text-3xl text-[#263a28] tracking-tight mb-2">Latest Updates</h3>
      </div>
      
      {/* Existing News Section wrapper */}
      <div className="font-sans">
        <News />
      </div>
    </div>
  );
};

export default NewsPage;
