import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Services = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const services = [
    { title: "Plant Disease Detection", link: "/disease-detection", icon: "🍃", desc: "Instantly identify diseases via AI and get immediate organic treatment protocols.", bg: "from-emerald-500 to-teal-700" },
    { title: "Market Prediction", link: "/market-predection", icon: "📈", desc: "Machine learning algorithms forecast future demand and pricing for maximum yield profit.", bg: "from-blue-500 to-indigo-800" },
    { title: "Weather Forecast", link: "/weather-predection", icon: "🌤️", desc: "Hyper-local meteorological models tailored specifically for sowing and harvesting windows.", bg: "from-cyan-400 to-blue-600" },
    { title: "Soil Predictor", link: "/SoilPredictor", icon: "🌱", desc: "Input NPK ratios and pH to receive highly accurate crop viability recommendations.", bg: "from-amber-500 to-orange-700" },
    { title: "Agri Marketplace", link: "/Marketplace", icon: "🛒", desc: "A decentralized peer-to-peer ecosystem eliminating middlemen from your supply chain.", bg: "from-rose-500 to-pink-700" }
  ];

  return (
    <div className="min-h-screen bg-[#0f1715] text-white pb-32">
      {/* Immersive Dark Hero */}
      <div className="relative pt-40 pb-20 px-6 lg:px-16 overflow-hidden flex flex-col items-center text-center">
        <div className="absolute inset-0 bg-cover bg-center opacity-10 filter grayscale blur-sm" style={{ backgroundImage: "url('/farm.avif')" }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1715] to-transparent"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="w-24 h-1 bg-[#f7c35f] mx-auto mb-8"></div>
          <h1 className="text-5xl lg:text-7xl font-black mb-6 tracking-tight">
            Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Agronomy.</span>
          </h1>
          <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto">
            Deploying enterprise-grade AI algorithms and blockchain infrastructure directly into the hands of local farmers.
          </p>
        </div>
      </div>

      {/* Dynamic Bento Cards */}
      <div className="max-w-7xl mx-auto px-6 lg:px-16 mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
        
        {services.map((service, idx) => (
          <Link 
            to={service.link} 
            key={idx} 
            className={`group block relative overflow-hidden rounded-3xl p-10 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-${service.bg.split('-')[1]}/20
              ${idx === 0 ? 'col-span-1 md:col-span-2 lg:col-span-4 min-h-[350px]' : ''}
              ${idx === 1 ? 'col-span-1 md:col-span-1 lg:col-span-2' : ''}
              ${idx === 2 ? 'col-span-1 md:col-span-1 lg:col-span-2' : ''}
              ${idx === 3 ? 'col-span-1 md:col-span-1 lg:col-span-2' : ''}
              ${idx === 4 ? 'col-span-1 md:col-span-2 lg:col-span-2' : ''}
            `}
          >
            {/* Animated Gradient Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${service.bg} opacity-90 group-hover:opacity-100 transition-opacity duration-500`}></div>
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
            
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className={`text-6xl filter drop-shadow-md transform transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6 origin-bottom-left ${idx === 0 ? 'text-8xl' : ''}`}>
                  {service.icon}
                </div>
                <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center transform group-hover:rotate-45 transition-transform duration-500 bg-white/10 backdrop-blur-sm">
                  <span className="text-xl">&rarr;</span>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className={`font-bold mb-3 ${idx === 0 ? 'text-4xl lg:text-5xl' : 'text-2xl'}`}>{service.title}</h3>
                <p className="text-white/80 font-medium leading-relaxed max-w-sm">{service.desc}</p>
              </div>
            </div>
          </Link>
        ))}

        {/* CTA Card */}
        <div className="col-span-1 md:col-span-2 lg:col-span-2 rounded-3xl bg-[#1b2b1d] border border-green-800 p-10 flex flex-col justify-center items-center text-center group overflow-hidden relative">
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[#f7c35f] transition-opacity duration-500"></div>
          <div className="relative z-10 group-hover:text-[#1b2b1d] transition-colors duration-500">
            <h3 className="text-2xl font-bold mb-4">Need Custom Solutions?</h3>
            <p className="text-gray-400 group-hover:text-gray-800 mb-8 text-sm">Our engineering team can build bespoke models for your specific crop constraints.</p>
            <Link to="/contactus" className="inline-block border-2 border-[#f7c35f] group-hover:border-[#1b2b1d] text-[#f7c35f] group-hover:text-[#1b2b1d] font-bold py-3 px-8 rounded-full transition-colors">
              Talk to Sales
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Services;
