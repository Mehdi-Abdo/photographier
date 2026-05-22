import React from 'react';
import { Star, Heart } from 'lucide-react';
import { Property } from '../types';
import { Link } from 'react-router-dom';
import { authUtils } from '../utils/auth';

interface PropertyCardProps {
  property: Property;
  onFavoriteToggle?: (propertyId: string) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onFavoriteToggle }) => {
  const isFavorite = authUtils.isFavorite(property.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isFavorite) {
      authUtils.removeFromFavorites(property.id);
    } else {
      authUtils.addToFavorites(property.id);
    }
    
    if (onFavoriteToggle) {
      onFavoriteToggle(property.id);
    }
  };

  return (
    <Link to={`/property/${property.id}`} className="group">
      <div className="bg-white rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <button 
            onClick={handleFavoriteClick}
            className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white rounded-full transition-colors"
          >
            <Heart 
              className={`h-4 w-4 transition-colors ${
                isFavorite 
                  ? 'text-red-500 fill-red-500' 
                  : 'text-gray-600 hover:text-red-500'
              }`} 
            />
          </button>
          {property.host.superhost && (
            <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded-full text-xs font-semibold">
              Superhost
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Location */}
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold text-gray-900 truncate">
              {property.location.city}, {property.location.country}
            </h3>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium">{property.rating}</span>
            </div>
          </div>

          {/* Title */}
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">{property.title}</p>

          {/* Details */}
          <p className="text-gray-500 text-sm mb-3">
            {property.guests} guests · {property.bedrooms} bedrooms · {property.bathrooms} bathrooms
          </p>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div>
              <span className="font-semibold text-gray-900">${property.price}</span>
              <span className="text-gray-600 text-sm"> night</span>
            </div>
            <span className="text-xs text-gray-500">{property.reviews} reviews</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;