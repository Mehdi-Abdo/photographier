import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, 
  Star, 
  Users, 
  Bed, 
  Bath, 
  Wifi, 
  Car, 
  Waves,
  ChefHat,
  TreePine,
  Shield,
  ChevronLeft,
  Share,
  Heart
} from 'lucide-react';
import ImageCarousel from '../components/ImageCarousel';
import BookingForm from '../components/BookingForm';
import { mockProperties } from '../data/mockData';

const PropertyDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  
  const property = mockProperties.find(p => p.id === id);

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Property not found</h1>
          <p className="text-gray-600 mb-4">The property you're looking for doesn't exist.</p>
          <Link to="/" className="text-rose-500 hover:text-rose-600 font-medium">
            Return to home
          </Link>
        </div>
      </div>
    );
  }

  const amenityIcons: { [key: string]: any } = {
    'WiFi': Wifi,
    'Pool': Waves,
    'Kitchen': ChefHat,
    'Parking': Car,
    'Beach Access': Waves,
    'Fireplace': TreePine,
    'Gym': Users,
    'Balcony': TreePine,
    'City View': TreePine,
    'Garden': TreePine,
    'Wine Cellar': ChefHat,
    'Hiking': TreePine
  };

  const displayedAmenities = showAllAmenities ? property.amenities : property.amenities.slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
        <Link to="/" className="hover:text-gray-900">Home</Link>
        <span>/</span>
        <Link to="/search" className="hover:text-gray-900">Search</Link>
        <span>/</span>
        <span className="text-gray-900">{property.location.city}</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            {property.title}
          </h1>
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
              <Share className="h-4 w-4" />
              <span className="text-sm font-medium underline">Share</span>
            </button>
            <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
              <Heart className="h-4 w-4" />
              <span className="text-sm font-medium underline">Save</span>
            </button>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="font-medium">{property.rating}</span>
            <span className="text-gray-600">({property.reviews} reviews)</span>
          </div>
          <div className="flex items-center space-x-1 text-gray-600">
            <MapPin className="h-4 w-4" />
            <span className="underline hover:text-gray-900 cursor-pointer">
              {property.location.city}, {property.location.country}
            </span>
          </div>
        </div>
      </div>

      {/* Images */}
      <div className="mb-12">
        <ImageCarousel images={property.images} alt={property.title} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Host Info */}
          <div className="flex items-center justify-between pb-6 border-b border-gray-200">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Hosted by {property.host.name}
              </h2>
              <div className="flex items-center space-x-2 text-gray-600">
                <Users className="h-4 w-4" />
                <span>{property.guests} guests</span>
                <span>·</span>
                <Bed className="h-4 w-4" />
                <span>{property.bedrooms} bedrooms</span>
                <span>·</span>
                <Bath className="h-4 w-4" />
                <span>{property.bathrooms} bathrooms</span>
              </div>
            </div>
            <div className="flex items-center">
              <img
                src={property.host.avatar}
                alt={property.host.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              {property.host.superhost && (
                <div className="ml-3">
                  <div className="flex items-center space-x-1">
                    <Shield className="h-4 w-4 text-rose-500" />
                    <span className="text-sm font-medium text-rose-500">Superhost</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">About this place</h3>
            <p className="text-gray-700 leading-relaxed">{property.description}</p>
          </div>

          {/* Amenities */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">What this place offers</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {displayedAmenities.map((amenity, index) => {
                const IconComponent = amenityIcons[amenity] || TreePine;
                return (
                  <div key={index} className="flex items-center space-x-3">
                    <IconComponent className="h-5 w-5 text-gray-600" />
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                );
              })}
            </div>
            {property.amenities.length > 6 && (
              <button
                onClick={() => setShowAllAmenities(!showAllAmenities)}
                className="text-rose-500 hover:text-rose-600 font-medium text-sm border border-gray-300 px-4 py-2 rounded-lg hover:border-gray-400 transition-colors"
              >
                {showAllAmenities ? 'Show less' : `Show all ${property.amenities.length} amenities`}
              </button>
            )}
          </div>

          {/* Reviews */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              <h3 className="text-lg font-semibold text-gray-900">
                {property.rating} · {property.reviews} reviews
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((review) => (
                <div key={review} className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <img
                      src={`https://images.pexels.com/photos/${1000000 + review * 100000}/pexels-photo-${1000000 + review * 100000}.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1`}
                      alt="Reviewer"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-900">Guest {review}</p>
                      <p className="text-sm text-gray-600">March 2024</p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm">
                    Amazing stay! The property was exactly as described and the location was perfect. 
                    {property.host.name} was a wonderful host.
                  </p>
                </div>
              ))}
            </div>
            
            <button className="text-rose-500 hover:text-rose-600 font-medium text-sm border border-gray-300 px-4 py-2 rounded-lg hover:border-gray-400 transition-colors">
              Show all {property.reviews} reviews
            </button>
          </div>

          {/* Location */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Where you'll be</h3>
            <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
              <p className="text-gray-600">Interactive map would be integrated here</p>
            </div>
            <p className="text-gray-700">{property.location.address}</p>
          </div>
        </div>

        {/* Booking Sidebar */}
        <div className="lg:col-span-1">
          <BookingForm property={property} />
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;