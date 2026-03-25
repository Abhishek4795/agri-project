import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#263a28] text-gray-300 py-12 px-6 md:px-16 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="col-span-1 md:col-span-1">
          <div className="text-2xl font-bold mb-4">
            <span className="text-green-300">🌿</span> AgriSync <span className="text-green-300">Eco</span>
          </div>
          <p className="text-sm text-gray-400 mb-6">
            Empowering farmers with smart technology, organic solutions, and real-time market insights for a sustainable future.
          </p>
          <div className="flex space-x-4">
            {/* Social Icons Placeholder */}
            <a href="#" className="w-8 h-8 rounded-full bg-[#1e2f20] flex items-center justify-center hover:bg-green-600 transition-colors">
              <span className="sr-only">Facebook</span>
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-[#1e2f20] flex items-center justify-center hover:bg-green-600 transition-colors">
              <span className="sr-only">Twitter</span>
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="col-span-1">
          <h3 className="text-white font-semibold mb-4 text-lg">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/#home" className="hover:text-green-300 transition-colors">Home</a></li>
            <li><a href="/#aboutus" className="hover:text-green-300 transition-colors">About Us</a></li>
            <li><a href="/#services" className="hover:text-green-300 transition-colors">Services</a></li>
            <li><a href="/#projects" className="hover:text-green-300 transition-colors">Projects</a></li>
            <li><a href="/#contactus" className="hover:text-green-300 transition-colors">Contact</a></li>
          </ul>
        </div>

        {/* Services */}
        <div className="col-span-1">
          <h3 className="text-white font-semibold mb-4 text-lg">Our Services</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/disease-detection" className="hover:text-green-300 transition-colors">Plant Disease Detection</Link></li>
            <li><Link to="/market-predection" className="hover:text-green-300 transition-colors">Market Prediction</Link></li>
            <li><Link to="/weather-predection" className="hover:text-green-300 transition-colors">Weather Forecast</Link></li>
            <li><Link to="/SoilPredictor" className="hover:text-green-300 transition-colors">Soil Predictor</Link></li>
            <li><Link to="/Marketplace" className="hover:text-green-300 transition-colors">Agri Marketplace</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="col-span-1">
          <h3 className="text-white font-semibold mb-4 text-lg">Contact Us</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start">
              <span className="mr-3 text-green-400">📍</span>
              <span>123 Green Valley, AgriTech Park,<br />New Delhi, India 110001</span>
            </li>
            <li className="flex items-center">
              <span className="mr-3 text-green-400">📞</span>
              <span>+91 98765 43210</span>
            </li>
            <li className="flex items-center">
              <span className="mr-3 text-green-400">✉️</span>
              <span>info@agrisynceco.com</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-[#3a523d] flex flex-col md:flex-row justify-between items-center text-xs text-center md:text-left">
        <p>&copy; {new Date().getFullYear()} AgriSync Eco. All rights reserved.</p>
        <div className="mt-4 md:mt-0 space-x-4">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
