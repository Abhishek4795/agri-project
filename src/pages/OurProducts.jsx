import React, { useEffect, useState, useCallback } from 'react';
import { ShoppingCart, Star, Heart, Loader2, AlertTriangle, Package, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { PRODUCT_ENDPOINTS, AuthToken } from '../config/api';

const OurProducts = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [categories, setCategories] = useState(['All']);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('created_at');
  const [sortDir, setSortDir] = useState('DESC');
  const [pagination, setPagination] = useState({ total: 0, current_page: 1, last_page: 1, per_page: 12 });
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchProducts = useCallback(async (page = 1, append = false) => {
    try {
      if (page === 1) setLoading(true);
      else setLoadingMore(true);

      const params = {
        page,
        per_page: 12,
        sort_by: sortBy,
        sort_dir: sortDir,
      };

      if (activeCategory !== 'All') params.category = activeCategory;
      if (search.trim()) params.search = search.trim();

      const response = await axios.get(PRODUCT_ENDPOINTS.LIST, { params });

      if (response.data.success) {
        const newProducts = response.data.data || [];
        setProducts(prev => append ? [...prev, ...newProducts] : newProducts);
        setPagination(response.data.pagination || { total: 0, current_page: 1, last_page: 1, per_page: 12 });

        // Set categories from API
        if (response.data.categories && response.data.categories.length > 0) {
          setCategories(['All', ...response.data.categories]);
        }
      }
      setError(null);
    } catch (err) {
      console.error('Failed to fetch products:', err);
      setError('Failed to load products. Please try again.');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [activeCategory, search, sortBy, sortDir]);

  // Fetch products on mount and when filters change
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProducts(1, false);
  }, [fetchProducts]);

  const handleLoadMore = () => {
    if (pagination.current_page < pagination.last_page) {
      fetchProducts(pagination.current_page + 1, true);
    }
  };

  const handleSortChange = (e) => {
    const val = e.target.value;
    switch(val) {
      case 'popularity':
        setSortBy('total_bids');
        setSortDir('DESC');
        break;
      case 'price_low':
        setSortBy('base_price');
        setSortDir('ASC');
        break;
      case 'price_high':
        setSortBy('base_price');
        setSortDir('DESC');
        break;
      case 'newest':
      default:
        setSortBy('created_at');
        setSortDir('DESC');
        break;
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchProducts(1, false);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-[#f8fcf8] pb-24">
      {/* Hero Banner */}
      <div className="relative bg-[#263a28] pt-32 pb-20 px-6 md:px-16 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/farm.avif')" }}></div>
          <div className="absolute inset-0 bg-[#263a28] mix-blend-multiply"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto text-center z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            AgriSync <span className="text-[#f7c35f]">Products</span>
          </h1>
          <p className="text-lg md:text-xl text-green-100 max-w-3xl mx-auto mb-8">
            Browse fresh produce, seeds, and farm equipment from verified farmers.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="max-w-xl mx-auto mb-10">
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full px-6 py-3 pl-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#f7c35f] focus:bg-white/20 transition-all"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" size={20} />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#f7c35f] text-gray-900 px-5 py-1.5 rounded-full text-sm font-medium hover:bg-yellow-400 transition-all"
              >
                Search
              </button>
            </div>
          </form>
          
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category 
                  ? 'bg-[#f7c35f] text-gray-900 shadow-lg scale-105' 
                  : 'bg-white/10 text-white hover:bg-white/20 hover:scale-105 backdrop-blur-sm'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 mt-16">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold text-[#263a28]">
              {activeCategory === 'All' ? 'All Products' : activeCategory}
            </h2>
            {!loading && (
              <p className="text-sm text-gray-500 mt-1">{pagination.total} products found</p>
            )}
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>Sort by:</span>
            <select 
              onChange={handleSortChange}
              className="bg-white border text-[#263a28] border-green-200 rounded-md py-1 px-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="newest">Newest Arrivals</option>
              <option value="popularity">Popularity</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-32">
            <Loader2 className="w-12 h-12 text-green-600 animate-spin mb-4" />
            <p className="text-gray-500 text-lg">Loading products...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="flex flex-col items-center justify-center py-32">
            <AlertTriangle className="w-16 h-16 text-red-400 mb-4" />
            <p className="text-gray-600 text-lg mb-4">{error}</p>
            <button
              onClick={() => fetchProducts(1, false)}
              className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-500 transition-all"
            >
              Retry
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && products.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32">
            <Package className="w-16 h-16 text-gray-300 mb-4" />
            <p className="text-gray-500 text-xl font-medium mb-2">No products found</p>
            <p className="text-gray-400 text-sm mb-6">
              {search ? 'Try a different search term' : 'Be the first to list a product!'}
            </p>
            {AuthToken.exists() && (
              <Link
                to="/Marketplace"
                className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-500 transition-all no-underline"
              >
                🏪 List a Product
              </Link>
            )}
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && products.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <div 
                  key={product.id} 
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group border border-green-50"
                >
                  {/* Image Container */}
                  <div className="relative h-64 overflow-hidden bg-gradient-to-br from-green-50 to-green-100">
                    {product.images && JSON.parse(product.images || '[]').length > 0 ? (
                      <img 
                        src={`http://localhost/farmbazaar-api/${JSON.parse(product.images)[0]}`}
                        alt={product.title} 
                        className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-6xl">🌾</span>
                      </div>
                    )}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#334b35] shadow-sm">
                      {product.category || 'General'}
                    </div>
                    {product.bid_end_time && new Date(product.bid_end_time) > new Date() && (
                      <div className="absolute top-4 right-4 bg-red-500/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm animate-pulse">
                        🔴 Live Bidding
                      </div>
                    )}
                    <button className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-white transition-colors duration-300 shadow-sm z-10">
                      <Heart size={18} />
                    </button>
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Link 
                        to={`/Marketplace?product=${product.id}`}
                        className="bg-[#f7c35f] hover:bg-yellow-400 text-gray-900 font-bold py-3 px-6 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center shadow-lg no-underline"
                      >
                        {product.bid_end_time ? '🏷️ Place Bid' : <><ShoppingCart size={18} className="mr-2" /> View Details</>}
                      </Link>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6 relative">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-[#263a28] group-hover:text-green-700 transition-colors">
                        {product.title}
                      </h3>
                      <span className="text-lg font-black text-[#263a28]">
                        {formatPrice(product.current_price || product.base_price)}
                      </span>
                    </div>
                    
                    <div className="flex items-center mb-4">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} fill={i < 4 ? "currentColor" : "none"} />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 ml-2">
                        {product.total_bids || 0} bids
                      </span>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {product.description || 'Fresh farm produce available for bidding.'}
                    </p>

                    {/* Base price if different from current */}
                    {product.current_price > product.base_price && (
                      <div className="flex items-center text-xs text-gray-400 mb-4">
                        <span className="line-through mr-2">Base: {formatPrice(product.base_price)}</span>
                        <span className="text-green-600 font-medium">↑ {Math.round(((product.current_price - product.base_price) / product.base_price) * 100)}%</span>
                      </div>
                    )}
                    
                    <div className="md:hidden mt-2">
                      <Link
                        to={`/Marketplace?product=${product.id}`}
                        className="w-full bg-[#334b35] hover:bg-[#263a28] text-white py-3 rounded-xl transition-colors font-medium flex items-center justify-center no-underline"
                      >
                        <ShoppingCart size={18} className="mr-2" />
                        {product.bid_end_time ? 'Place Bid' : 'View Details'}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Load More */}
            {pagination.current_page < pagination.last_page && (
              <div className="mt-16 text-center">
                <button 
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="border-2 border-[#334b35] text-[#334b35] hover:bg-[#334b35] hover:text-white font-bold py-3 px-10 rounded-full transition-colors duration-300 disabled:opacity-50"
                >
                  {loadingMore ? (
                    <span className="flex items-center">
                      <Loader2 size={18} className="animate-spin mr-2" />
                      Loading...
                    </span>
                  ) : (
                    `Load More Products (${pagination.current_page}/${pagination.last_page})`
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default OurProducts;
