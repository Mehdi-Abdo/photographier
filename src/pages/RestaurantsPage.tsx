import React, { useState } from 'react';
import { Search, MapPin, Star, UtensilsCrossed, DollarSign } from 'lucide-react';
import { mockRestaurants } from '../data/mockData';

const RestaurantsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('rating');

  const cuisines = ['all', 'French', 'Italian', 'Japanese', 'Mexican', 'American', 'Chinese', 'Indian'];
  const priceRanges = ['all', '$', '$$', '$$$', '$$$$'];

  const filteredRestaurants = mockRestaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         restaurant.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCuisine = selectedCuisine === 'all' || restaurant.cuisine === selectedCuisine;
    const matchesPrice = selectedPriceRange === 'all' || restaurant.priceRange === selectedPriceRange;
    return matchesSearch && matchesCuisine && matchesPrice;
  });

  const getPriceRangeDescription = (range: string) => {
    switch (range) {
      case '$': return 'Budget-friendly';
      case '$$': return 'Moderate';
      case '$$$': return 'Upscale';
      case '$$$$': return 'Fine dining';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div 
        className="relative h-64 bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg)'
        }}
      >
        <div className="text-center text-white max-w-2xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Discover Restaurants
          </h1>
          <p className="text-xl">
            Find the perfect dining experience wherever you go
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search restaurants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none"
              />
            </div>

            {/* Cuisine Filter */}
            <select
              value={selectedCuisine}
              onChange={(e) => setSelectedCuisine(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none"
            >
              <option value="all">All Cuisines</option>
              {cuisines.slice(1).map(cuisine => (
                <option key={cuisine} value={cuisine}>{cuisine}</option>
              ))}
            </select>

            {/* Price Range Filter */}
            <select
              value={selectedPriceRange}
              onChange={(e) => setSelectedPriceRange(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none"
            >
              <option value="all">All Prices</option>
              {priceRanges.slice(1).map(range => (
                <option key={range} value={range}>{range} - {getPriceRangeDescription(range)}</option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none"
            >
              <option value="rating">Highest Rated</option>
              <option value="reviews">Most Reviews</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>
        </div>

        {/* Results */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {filteredRestaurants.length} restaurants found
          </h2>
        </div>

        {/* Restaurant Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map(restaurant => (
            <div key={restaurant.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow group cursor-pointer">
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded-full text-xs font-medium">
                  {restaurant.cuisine}
                </div>
                <div className="absolute top-3 right-3 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs font-medium">
                  {restaurant.priceRange}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center space-x-1 text-gray-600 text-sm mb-2">
                  <MapPin className="h-4 w-4" />
                  <span>{restaurant.location}</span>
                </div>
                
                <h3 className="font-semibold text-gray-900 mb-2 text-lg">
                  {restaurant.name}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {restaurant.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="font-medium">{restaurant.rating}</span>
                    <span className="text-gray-600 text-sm">({restaurant.reviews} reviews)</span>
                  </div>
                  
                  <div className="flex items-center space-x-1 text-gray-600">
                    <DollarSign className="h-4 w-4" />
                    <span className="text-sm">{getPriceRangeDescription(restaurant.priceRange)}</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      View menu
                    </button>
                    <button className="flex-1 border border-gray-300 hover:border-gray-400 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      Reserve table
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredRestaurants.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <UtensilsCrossed className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No restaurants found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search filters or browse all restaurants
            </p>
          </div>
        )}

        {/* Featured Cuisines */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Popular Cuisines</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Italian', image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg' },
              { name: 'Japanese', image: 'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg' },
              { name: 'French', image: 'https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg' },
              { name: 'Mexican', image: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg' }
            ].map(cuisine => (
              <div
                key={cuisine.name}
                className="group cursor-pointer"
                onClick={() => setSelectedCuisine(cuisine.name)}
              >
                <div className="relative aspect-square rounded-xl overflow-hidden mb-3">
                  <img
                    src={cuisine.image}
                    alt={cuisine.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-lg font-semibold">{cuisine.name}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            List Your Restaurant
          </h2>
          <p className="text-lg mb-6 text-orange-100">
            Reach more customers and grow your business with our platform
          </p>
          <button className="bg-white text-orange-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors">
            Get started
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantsPage;