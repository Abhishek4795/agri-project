import React, { useEffect, useState } from 'react';
import "./App.css";
import Header from './pages/Header';
import HeroSection from './pages/HeroSection';
import Agriinfo from './pages/OrganicFarmUI';
import Dashboard from './pages/AgriDashboard';
import News from './pages/AgriNewsSection';
import PlantDiseaseDetection from './pages/PlantDiseaseDetection';
import MarketPrediction from './pages/MarketPrediction';
import WeatherForecast from './pages/WeatherForecast';
import StorageForm from "./components/StorageForm";  
import Marketplace from "./components/Marketplace"; 
import SoilPredictor from './pages/SoilPredictor';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ApiTestPage from './pages/ApiTestPage';
import OurProducts from './pages/OurProducts';
import AboutUs from './pages/AboutUs';
import Projects from './pages/Projects';
import Services from './pages/Services';
import NewsPage from './pages/NewsPage';
import ContactUs from './pages/ContactUs';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
    
    const checkVisibility = () => {
      const sections = document.querySelectorAll('.scroll-reveal');
      const windowHeight = window.innerHeight;
      
      sections.forEach(section => {
        const boundingRect = section.getBoundingClientRect();
        if (boundingRect.top < windowHeight * 0.85) {
          section.classList.add('visible');
        }
      });
    };
    
    setTimeout(checkVisibility, 100);
    
    let scrollTimeout;
    const handleScroll = () => {
      if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
          checkVisibility();
          scrollTimeout = null;
        }, 10);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <Router>
      <div className={`App ${loaded ? 'app-loaded' : ''}`}>
        <div className="header-container">
          <Header />
        </div>
        
        <Routes>
          <Route path="/disease-detection" element={<PlantDiseaseDetection />} />
          <Route path="/market-predection" element={<MarketPrediction />} />
          <Route path="/weather-predection" element={<WeatherForecast />} />
          <Route path="/StorageForm" element={<StorageForm />} />
          <Route path="/Marketplace" element={<Marketplace />} />
          <Route path="/LoginPage" element={<LoginPage />} />
          <Route path="/RegisterPage" element={<RegisterPage />} />
          <Route path="/SoilPredictor" element={<SoilPredictor />} />
          <Route path="/api-test" element={<ApiTestPage />} />
          <Route path="/our-products" element={<OurProducts />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/services" element={<Services />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/" element={
            <div className="content-container">
              <div className="scroll-reveal">
                <HeroSection />
              </div>
              <div className="scroll-reveal">
                <Agriinfo />
              </div>
              <div className="scroll-reveal">
                <Dashboard />
              </div>
              <div className="scroll-reveal">
                <News />
              </div>
            </div>
          } />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;