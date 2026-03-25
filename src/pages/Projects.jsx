import React, { useEffect, useState } from 'react';

const Projects = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const projects = [
    { title: "Smart Irrigation Deployment", category: "IoT Tech", impact: "40% Water Saved", bg: "bg-green-800" },
    { title: "Organic Seed Initiative", category: "Bio-Genetics", impact: "22% Yield Boost", bg: "bg-teal-900" },
    { title: "Market Linkage Program", category: "Economics", impact: "35% Profit Increase", bg: "bg-blue-900" },
    { title: "Drone Pest Mapping", category: "Aerial AI", impact: "60% Pesticide Reduction", bg: "bg-emerald-800" },
    { title: "Solar Micro-Grids", category: "Renewables", impact: "100% Core Energy Autonomy", bg: "bg-[#1b2b1d]" }
  ];

  return (
    <div className="min-h-screen bg-[#f1f5f2] pb-32">
      {/* Sleek Minimalist Hero */}
      <div className="pt-40 pb-20 px-6 lg:px-16 text-center max-w-4xl mx-auto">
        <div className="inline-block border border-green-300 bg-green-50 text-green-800 px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-8">
          Portfolio
        </div>
        <h1 className="text-5xl lg:text-7xl font-black text-[#1b2b1d] tracking-tight mb-8">
          Case <span className="text-[#f7c35f]">Studies.</span>
        </h1>
        <p className="text-xl text-gray-500 font-light">
          We let the data speak. Explore our landmark interventions across different geographies, scaling sustainable infrastructure.
        </p>
      </div>

      {/* Masonry / Staggered Bento Grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
        
        {/* Feature Large Card 1 */}
        <div className={`col-span-1 md:col-span-2 lg:col-span-8 rounded-3xl ${projects[0].bg} p-10 lg:p-14 text-white relative overflow-hidden group min-h-[400px] flex flex-col justify-end`}>
          <div className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-30 group-hover:opacity-50 transition-opacity duration-700" style={{ backgroundImage: "url('/farm.avif')" }}></div>
          <div className="relative z-10">
            <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-semibold">{projects[0].category}</span>
            <h2 className="text-4xl lg:text-5xl font-bold mt-6 mb-4">{projects[0].title}</h2>
            <div className="inline-flex items-center text-[#f7c35f] text-2xl font-black">
              {projects[0].impact} <span className="ml-2 text-white/50 text-base font-normal">annually</span>
            </div>
          </div>
        </div>

        {/* Tall Card 2 */}
        <div className={`col-span-1 md:col-span-1 lg:col-span-4 rounded-3xl ${projects[1].bg} p-10 text-white relative overflow-hidden group min-h-[400px] flex flex-col`}>
          <div className="absolute inset-0 bg-cover bg-center mix-blend-soft-light opacity-40 group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: "url('/farm.avif')" }}></div>
          <div className="relative z-10 flex-grow">
            <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-semibold">{projects[1].category}</span>
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-3">{projects[1].title}</h2>
            <p className="text-green-200 font-medium">{projects[1].impact}</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className={`col-span-1 md:col-span-1 lg:col-span-4 rounded-3xl ${projects[2].bg} p-8 text-white relative overflow-hidden group min-h-[300px] flex flex-col justify-end`}>
          <div className="absolute top-8 right-8 text-[#f7c35f] font-black text-4xl">{projects[2].impact}</div>
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-2">{projects[2].title}</h2>
            <p className="text-white/70 text-sm uppercase tracking-wider">{projects[2].category}</p>
          </div>
        </div>

        {/* Card 4 */}
        <div className={`col-span-1 md:col-span-1 lg:col-span-4 rounded-3xl ${projects[3].bg} p-8 text-white relative overflow-hidden group min-h-[300px] flex flex-col justify-end`}>
           <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-0"></div>
           <div className="absolute inset-0 bg-cover bg-center mix-blend-screen opacity-20 filter grayscale z-0" style={{ backgroundImage: "url('/farm.avif')" }}></div>
           <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-2">{projects[3].title}</h2>
            <p className="text-[#f7c35f] font-bold">{projects[3].impact}</p>
            <p className="text-white/70 text-sm uppercase tracking-wider mt-1">{projects[3].category}</p>
          </div>
        </div>

        {/* Card 5 */}
        <div className={`col-span-1 md:col-span-2 lg:col-span-4 rounded-3xl ${projects[4].bg} p-8 text-white relative overflow-hidden group min-h-[300px] flex items-center justify-center text-center`}>
           <div className="absolute inset-0 border border-white/20 m-4 rounded-2xl"></div>
           <div className="relative z-10">
             <div className="w-16 h-16 bg-[#f7c35f] rounded-full mx-auto mb-6 flex items-center justify-center">
               <span className="text-black text-2xl font-black">⚡</span>
             </div>
            <h2 className="text-2xl font-bold mb-2">{projects[4].title}</h2>
            <p className="text-green-300 font-bold">{projects[4].impact}</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Projects;
