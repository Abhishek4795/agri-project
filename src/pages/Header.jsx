import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { AuthToken, AuthUser, AUTH_ENDPOINTS } from '../config/api';
import axios from 'axios';

const Header = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [isHindi, setIsHindi] = useState(false);
  const [user, setUser] = useState(AuthUser.get());
  const [isLoggedIn, setIsLoggedIn] = useState(AuthToken.exists());
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Listen for auth changes (login/register from other pages)
  useEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(AuthToken.exists());
      setUser(AuthUser.get());
    };

    // Check on mount and listen for storage changes
    checkAuth();
    window.addEventListener('storage', checkAuth);
    
    // Custom event for same-tab auth changes
    window.addEventListener('authChange', checkAuth);

    return () => {
      window.removeEventListener('storage', checkAuth);
      window.removeEventListener('authChange', checkAuth);
    };
  }, []);
  
  useEffect(() => {
    if (document.cookie.includes('googtrans=/en/hi') || document.cookie.includes('googtrans=/auto/hi')) {
      setIsHindi(true);
    }
  }, []);

  const toggleLanguage = () => {
    if (isHindi) {
      document.cookie = "googtrans=/en/en; path=/";
      document.cookie = "googtrans=/auto/en; path=/";
    } else {
      document.cookie = "googtrans=/en/hi; path=/";
      document.cookie = "googtrans=/auto/hi; path=/";
    }
    window.location.reload();
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showUserMenu && !e.target.closest('.user-menu-container')) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showUserMenu]);

  const handleLogout = async () => {
    try {
      await axios.post(AUTH_ENDPOINTS.LOGOUT, {}, {
        headers: AuthToken.getHeader()
      });
    } catch (err) {
      // Even if API call fails, clear local data
      console.warn('Logout API call failed:', err);
    }

    AuthToken.remove();
    AuthUser.remove();
    setUser(null);
    setIsLoggedIn(false);
    setShowUserMenu(false);
    window.dispatchEvent(new Event('authChange'));
    navigate('/');
  };

  const menuItems = [
    { name: 'Home', icon: '🏠', path: '/' },
    { name: 'About Us', icon: 'ℹ️', path: '/aboutus' },
    { name: 'Our Products', icon: '🌱', path: '/our-products' },
    { name: 'Marketplace', icon: '🏪', path: '/Marketplace' },
    { name: 'Projects', icon: '📊', path: '/projects' },
    { name: 'Services', icon: '🔧', path: '/services' },
    { name: 'News', icon: '📰', path: '/news' },
    { name: 'Contact Us', icon: '✉️', path: '/contactus' }
  ];

  const getRoleEmoji = (role) => {
    switch(role) {
      case 'farmer': return '🌾';
      case 'admin': return '👑';
      default: return '🛒';
    }
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
      scrolled ? 'bg-[#334b35]/80 backdrop-blur-md shadow-lg py-2' : 'bg-[#334b35] py-4'
    } text-white px-6 md:px-16`}>
      <div className="flex items-center justify-between max-w-7xl mx-auto md:justify-start">
        <div className="text-2xl font-bold relative overflow-hidden group md:mr-12">
          <div className="flex items-center">
            <span className="text-green-300 mr-2 transform transition-all duration-300 group-hover:rotate-12 group-hover:scale-125">🌿</span>
            <span className="inline-block relative">
              <span className="inline-block transition-all duration-500 group-hover:transform group-hover:translate-y-[-100%] group-hover:opacity-0">Agri</span>
              <span className="inline-block transition-all duration-500 group-hover:text-green-300">Sync</span>
              <span className="absolute left-0 top-0 text-green-300 transition-all duration-500 transform translate-y-[100%] opacity-0 group-hover:transform group-hover:translate-y-0 group-hover:opacity-100">Eco</span>
            </span>
          </div>
          <span className="absolute -bottom-1 left-0 w-0 h-1 bg-gradient-to-r from-green-300 to-green-100 transition-all duration-700 ease-in-out group-hover:w-full rounded-full"></span>
        </div>

        <button
          className="md:hidden focus:outline-none p-2 rounded-full bg-green-800 bg-opacity-30 hover:bg-opacity-70 transition-all duration-300 hover:scale-110"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-6 h-6 relative flex justify-center items-center">
            <span className={`absolute h-0.5 w-5 bg-white transform transition-all duration-300 ease-in-out ${menuOpen ? 'rotate-45' : '-translate-y-1.5'}`}></span>
            <span className={`absolute h-0.5 w-5 bg-white transform transition-all duration-300 ease-in-out ${menuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`absolute h-0.5 w-5 bg-white transform transition-all duration-300 ease-in-out ${menuOpen ? '-rotate-45' : 'translate-y-1.5'}`}></span>
          </div>
        </button>

        <nav className="hidden md:flex md:justify-between md:flex-grow">
          <ul className="flex items-center space-x-8">
            {menuItems.map((item, index) => (
              <li
                key={index}
                className="relative"
                onMouseEnter={() => setActiveItem(item.name)}
                onMouseLeave={() => setActiveItem(null)}
              >
                <Link 
                  to={item.path} 
                  className="text-white no-underline text-sm py-2 block hover:text-green-200 transition-all duration-300"
                >
                  <span className={`transition-all duration-300 ${
                    activeItem === item.name ? 'transform scale-110 text-green-200 font-medium' : ''
                  }`}>
                    {item.name}
                  </span>
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-green-300 transition-all duration-300 ${
                    activeItem === item.name ? 'w-full' : 'w-0'
                  }`}></span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleLanguage}
              className="flex items-center justify-center bg-white/20 hover:bg-white/30 px-3 py-2 rounded-full text-sm font-medium transition-all duration-300"
              title="Toggle Language"
            >
              <span className="mr-1">🌐</span>
              {isHindi ? 'English' : 'हिंदी'}
            </button>

            {isLoggedIn && user ? (
              <div className="relative user-menu-container">
                <button 
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
                >
                  <span>{getRoleEmoji(user.role)}</span>
                  <span className="max-w-[100px] truncate">{user.name}</span>
                  <svg className={`w-4 h-4 transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50 animate-fadeIn">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full capitalize">
                        {user.role}
                      </span>
                    </div>
                    <Link 
                      to="/Marketplace" 
                      onClick={() => setShowUserMenu(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors no-underline"
                    >
                      🏪 Marketplace
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center"
                    >
                      <span className="mr-2">🚪</span> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/LoginPage">
                  <button className="bg-white/20 hover:bg-white/30 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105">
                    Login
                  </button>
                </Link>
                <Link to="/RegisterPage">
                  <button className="bg-green-600 hover:bg-green-500 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400">
                    Register
                  </button>
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>

      <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${menuOpen ? 'max-h-screen opacity-100 pt-6' : 'max-h-0 opacity-0'
        }`}>
        <ul className="flex flex-col">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={`transform transition-all duration-300 hover:bg-green-800 hover:bg-opacity-30 rounded-lg px-4 ${menuOpen ? `opacity-100 translate-x-0` : 'opacity-0 -translate-x-8'
                }`}
              style={{ transitionDelay: menuOpen ? `${index * 50}ms` : '0ms' }}
            >
              <Link 
                to={item.path} 
                onClick={() => setMenuOpen(false)}
                className="block py-3 text-white no-underline text-sm hover:text-green-200 transition-all duration-300 flex items-center"
              >
                <span className="mr-3 text-green-300">{item.icon}</span>
                <span>{item.name}</span>
                <span className="ml-auto transform transition-all duration-300 opacity-0 hover:opacity-100">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </li>
          ))}
          <li className="mt-4 px-4 pb-4 space-y-3">
            <button 
              onClick={toggleLanguage}
              className="w-full flex items-center justify-center bg-white/20 hover:bg-white/30 py-3 rounded-lg text-sm font-medium transition-all duration-300 hover:shadow-lg"
            >
              <span className="mr-2">🌐</span>
              {isHindi ? 'Switch to English' : 'हिंदी में बदलें (Translate to Hindi)'}
            </button>

            {isLoggedIn && user ? (
              <>
                <div className="bg-white/10 rounded-lg p-3 text-center">
                  <p className="text-sm font-medium">{getRoleEmoji(user.role)} {user.name}</p>
                  <p className="text-xs text-green-200">{user.email}</p>
                </div>
                <button 
                  onClick={handleLogout}
                  className="w-full bg-red-500/80 hover:bg-red-500 py-3 rounded-lg text-sm font-medium transition-all duration-300 hover:shadow-lg"
                >
                  🚪 Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/LoginPage" className="block w-full" onClick={() => setMenuOpen(false)}>
                  <button className="w-full bg-white/20 hover:bg-white/30 py-3 rounded-lg text-sm font-medium transition-all duration-300 hover:shadow-lg">
                    Login
                  </button>
                </Link>
                <Link to="/RegisterPage" className="block w-full" onClick={() => setMenuOpen(false)}>
                  <button className="w-full bg-green-600 hover:bg-green-500 py-3 rounded-lg text-sm font-medium transition-all duration-300 hover:shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400">
                    Register
                  </button>
                </Link>
              </>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
