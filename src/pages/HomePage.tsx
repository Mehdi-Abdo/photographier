import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import PropertyCard from '../components/PropertyCard';
import { mockProperties } from '../data/mockData';

const HomePage: React.FC = () => {
  const [properties, setProperties] = useState(mockProperties);
  const featuredProperties = properties.filter(property => property.featured);

  const handleFavoriteToggle = (propertyId: string) => {
    // Force re-render by updating state
    setProperties([...properties]);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div 
        className="relative h-96 bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(https://images.pexels.com/photos/1268871/pexels-photo-1268871.jpeg)'
        }}
      >
        <div className="text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Find your next stay
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Discover amazing places to stay around the world
          </p>
          
          {/* Search Bar */}
          <div className="max-w-4xl mx-auto">
            <SearchBar showLabels={false} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Featured Properties */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Featured stays
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProperties.map(property => (
              <PropertyCard 
                key={property.id} 
                property={property} 
                onFavoriteToggle={handleFavoriteToggle}
              />
            ))}
          </div>
        </section>

        {/* Categories */}
        <section className="mt-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Browse by property type
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { type: 'Apartments', image: 'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg' },
              { type: 'Houses', image: 'https://images.pexels.com/photos/277667/pexels-photo-277667.jpeg' },
              { type: 'Villas', image: 'https://images.pexels.com/photos/1268871/pexels-photo-1268871.jpeg' },
              { type: 'Cabins', image: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg' }
            ].map(category => (
              <div key={category.type} className="group cursor-pointer">
                <div className="relative aspect-square rounded-xl overflow-hidden mb-3">
                  <img
                    src={category.image}
                    alt={category.type}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-semibold">{category.type}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section className="mt-20">
          <div className="bg-gradient-to-r from-rose-500 to-pink-500 rounded-2xl p-8 md:p-12 text-white">
            <div className="max-w-3xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Try hosting
              </h2>
              <p className="text-xl mb-6 text-rose-100">
                Earn extra income and unlock new opportunities by sharing your space.
              </p>
              <button className="bg-white text-rose-500 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors">
                Learn more
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;