import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  User, 
  MapPin, 
  Calendar, 
  CreditCard, 
  Settings, 
  PlusCircle,
  Star,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { mockProperties } from '../data/mockData';

// Mock user data
const mockUser = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
  memberSince: '2020'
};

const mockTrips = [
  {
    id: '1',
    property: mockProperties[0],
    checkIn: '2024-04-15',
    checkOut: '2024-04-20',
    guests: 4,
    totalPrice: 2250,
    status: 'upcoming' as const
  },
  {
    id: '2',
    property: mockProperties[1],
    checkIn: '2024-02-10',
    checkOut: '2024-02-15',
    guests: 2,
    totalPrice: 900,
    status: 'completed' as const
  }
];

const DashboardOverview: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-rose-500 to-pink-500 rounded-xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {mockUser.name}!</h1>
        <p className="text-rose-100">Manage your trips and listings from your dashboard</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-3 rounded-full">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">3</p>
              <p className="text-gray-600">Upcoming trips</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 p-3 rounded-full">
              <MapPin className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">12</p>
              <p className="text-gray-600">Places visited</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="bg-purple-100 p-3 rounded-full">
              <Star className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">4.8</p>
              <p className="text-gray-600">Average rating</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
        <div className="space-y-4">
          {mockTrips.slice(0, 3).map((trip) => (
            <div key={trip.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <img
                src={trip.property.images[0]}
                alt={trip.property.title}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{trip.property.title}</h3>
                <p className="text-sm text-gray-600">
                  {new Date(trip.checkIn).toLocaleDateString()} - {new Date(trip.checkOut).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">${trip.totalPrice}</p>
                <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  trip.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                  trip.status === 'completed' ? 'bg-green-100 text-green-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {trip.status === 'upcoming' && <Clock className="h-3 w-3 mr-1" />}
                  {trip.status === 'completed' && <CheckCircle className="h-3 w-3 mr-1" />}
                  {trip.status === 'cancelled' && <XCircle className="h-3 w-3 mr-1" />}
                  {trip.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const TripsPage: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'completed' | 'cancelled'>('all');
  
  const filteredTrips = filter === 'all' 
    ? mockTrips 
    : mockTrips.filter(trip => trip.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">My Trips</h1>
        <div className="flex space-x-2">
          {(['all', 'upcoming', 'completed', 'cancelled'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                filter === status
                  ? 'bg-rose-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTrips.map((trip) => (
          <div key={trip.id} className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
            <img
              src={trip.property.images[0]}
              alt={trip.property.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-gray-900">{trip.property.title}</h3>
                <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  trip.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                  trip.status === 'completed' ? 'bg-green-100 text-green-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {trip.status}
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">
                {trip.property.location.city}, {trip.property.location.country}
              </p>
              
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex justify-between">
                  <span>Check-in:</span>
                  <span>{new Date(trip.checkIn).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Check-out:</span>
                  <span>{new Date(trip.checkOut).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Guests:</span>
                  <span>{trip.guests}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <span className="text-lg font-semibold text-gray-900">
                  ${trip.totalPrice}
                </span>
                <button className="text-rose-500 hover:text-rose-600 font-medium text-sm">
                  View details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTrips.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No trips found</h3>
          <p className="text-gray-600 mb-6">Start planning your next adventure!</p>
          <Link 
            to="/search" 
            className="inline-flex items-center px-6 py-3 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
          >
            Browse properties
          </Link>
        </div>
      )}
    </div>
  );
};

const ListingsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">My Listings</h1>
        <button className="flex items-center space-x-2 bg-rose-500 text-white px-4 py-2 rounded-lg hover:bg-rose-600 transition-colors">
          <PlusCircle className="h-4 w-4" />
          <span>Add listing</span>
        </button>
      </div>

      <div className="text-center py-12">
        <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No listings yet</h3>
        <p className="text-gray-600 mb-6">Start hosting and earn extra income by sharing your space.</p>
        <button className="inline-flex items-center px-6 py-3 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors">
          <PlusCircle className="h-4 w-4 mr-2" />
          Create your first listing
        </button>
      </div>
    </div>
  );
};

const ProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
      
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center space-x-6 mb-6">
          <img
            src={mockUser.avatar}
            alt={mockUser.name}
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{mockUser.name}</h2>
            <p className="text-gray-600">{mockUser.email}</p>
            <p className="text-sm text-gray-500">Member since {mockUser.memberSince}</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              defaultValue={mockUser.name}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              defaultValue={mockUser.email}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <input
              type="tel"
              placeholder="Add phone number"
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>
        </div>
        
        <div className="flex space-x-4 mt-6">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
          >
            {isEditing ? 'Save changes' : 'Edit profile'}
          </button>
          {isEditing && (
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const DashboardPage: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { path: '/dashboard', label: 'Overview', icon: User },
    { path: '/dashboard/trips', label: 'Trips', icon: Calendar },
    { path: '/dashboard/listings', label: 'Listings', icon: MapPin },
    { path: '/dashboard/profile', label: 'Profile', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center space-x-3 mb-6">
                <img
                  src={mockUser.avatar}
                  alt={mockUser.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-medium text-gray-900">{mockUser.name}</h3>
                  <p className="text-sm text-gray-600">Host</p>
                </div>
              </div>
              
              <nav className="space-y-2">
                {navItems.map((item) => {
                  const isActive = currentPath === item.path;
                  const IconComponent = item.icon;
                  
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-rose-50 text-rose-600 font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <IconComponent className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<DashboardOverview />} />
              <Route path="/trips" element={<TripsPage />} />
              <Route path="/listings" element={<ListingsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;