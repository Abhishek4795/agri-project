import React, { useEffect } from 'react';
import { ShoppingCart, Star, Heart } from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'Organic Tomato Seeds',
    category: 'Seeds',
    price: '₹250',
    rating: 4.8,
    reviews: 124,
    image: '/farm.avif',
    description: 'High-yield, disease-resistant tomato seeds perfect for organic farming.',
  },
  {
    id: 2,
    name: 'Natural Neem Fertilizer',
    category: 'Fertilizers',
    price: '₹450',
    rating: 4.9,
    reviews: 89,
    image: '/farm.avif',
    description: '100% natural neem-based fertilizer to enrich soil and deter pests.',
  },
  {
    id: 3,
    name: 'Smart Soil Moisture Sensor',
    category: 'Equipment',
    price: '₹1,200',
    rating: 4.7,
    reviews: 210,
    image: '/farm.avif',
    description: 'IoT-enabled digital sensor for real-time tracking of soil health.',
  },
  {
    id: 4,
    name: 'Eco-Friendly Biopesticide',
    category: 'Pesticides',
    price: '₹380',
    rating: 4.6,
    reviews: 56,
    image: '/farm.avif',
    description: 'Safe for crops and beneficial insects. Highly effective against aphids.',
  },
  {
    id: 5,
    name: 'Premium Wheat Seeds',
    category: 'Seeds',
    price: '₹550',
    rating: 4.9,
    reviews: 312,
    image: '/farm.avif',
    description: 'Drought-resistant wheat seeds genetically selected for maximum yield.',
  },
  {
    id: 6,
    name: 'Organic Compost Maker',
    category: 'Fertilizers',
    price: '₹890',
    rating: 4.5,
    reviews: 74,
    image: '/farm.avif',
    description: 'Accelerate your farm waste composting with our biological activator.',
  }
];

const OurProducts = () => {
  const [activeCategory, setActiveCategory] = React.useState('All');
  const categories = ['All', 'Seeds', 'Fertilizers', 'Equipment', 'Pesticides'];

  // Ensure we start at the top of the page when navigating here
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(product => product.category === activeCategory);

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
          <p className="text-lg md:text-xl text-green-100 max-w-3xl mx-auto mb-10">
            Premium quality seeds, natural fertilizers, and advanced farming tools curated to maximize your agricultural yield sustainably.
          </p>
          
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

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 mt-16">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-[#263a28]">Featured Items</h2>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>Sort by:</span>
            <select className="bg-white border text-[#263a28] border-green-200 rounded-md py-1 px-3 focus:outline-none focus:ring-2 focus:ring-green-500">
              <option>Popularity</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest Arrivals</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group border border-green-50"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#334b35] shadow-sm">
                  {product.category}
                </div>
                <button className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-white transition-colors duration-300 shadow-sm z-10">
                  <Heart size={18} />
                </button>
                
                {/* Overlay Add to Cart (Desktop) */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-[#f7c35f] hover:bg-yellow-400 text-gray-900 font-bold py-3 px-6 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center shadow-lg">
                    <ShoppingCart size={18} className="mr-2" />
                    Quick Add
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6 relative">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-[#263a28] group-hover:text-green-700 transition-colors">
                    {product.name}
                  </h3>
                  <span className="text-lg font-black text-[#263a28]">{product.price}</span>
                </div>
                
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 ml-2">({product.reviews} reviews)</span>
                </div>
                
                <p className="text-gray-600 text-sm mb-6 line-clamp-2">
                  {product.description}
                </p>
                
                <div className="md:hidden mt-4">
                  <button className="w-full bg-[#334b35] hover:bg-[#263a28] text-white py-3 rounded-xl transition-colors font-medium flex items-center justify-center">
                    <ShoppingCart size={18} className="mr-2" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Pagination/Load More */}
        <div className="mt-16 text-center">
          <button className="border-2 border-[#334b35] text-[#334b35] hover:bg-[#334b35] hover:text-white font-bold py-3 px-10 rounded-full transition-colors duration-300">
            Load More Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default OurProducts;
