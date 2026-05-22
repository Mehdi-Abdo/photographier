import { Property, Experience, Restaurant } from '../types';

export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Luxury Beachfront Villa',
    description: 'Wake up to stunning ocean views in this modern villa with private beach access.',
    price: 450,
    images: [
      'https://images.pexels.com/photos/1268871/pexels-photo-1268871.jpeg',
      'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg',
      'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg'
    ],
    location: {
      city: 'Malibu',
      country: 'United States',
      address: '123 Ocean Drive, Malibu, CA'
    },
    host: {
      name: 'Sarah Johnson',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
      superhost: true
    },
    amenities: ['WiFi', 'Pool', 'Beach Access', 'Kitchen', 'Parking'],
    guests: 8,
    bedrooms: 4,
    bathrooms: 3,
    rating: 4.9,
    reviews: 127,
    type: 'villa',
    featured: true
  },
  {
    id: '2',
    title: 'Cozy Mountain Cabin',
    description: 'Escape to this charming cabin nestled in the mountains with hiking trails nearby.',
    price: 180,
    images: [
      'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg',
      'https://images.pexels.com/photos/277667/pexels-photo-277667.jpeg'
    ],
    location: {
      city: 'Aspen',
      country: 'United States',
      address: '456 Mountain View Road, Aspen, CO'
    },
    host: {
      name: 'Mike Chen',
      avatar: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg',
      superhost: false
    },
    amenities: ['WiFi', 'Fireplace', 'Kitchen', 'Hiking', 'Parking'],
    guests: 6,
    bedrooms: 3,
    bathrooms: 2,
    rating: 4.7,
    reviews: 89,
    type: 'cabin',
    featured: true
  },
  {
    id: '3',
    title: 'Modern City Apartment',
    description: 'Stylish apartment in the heart of downtown with city skyline views.',
    price: 220,
    images: [
      'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg',
      'https://images.pexels.com/photos/1268871/pexels-photo-1268871.jpeg'
    ],
    location: {
      city: 'New York',
      country: 'United States',
      address: '789 Broadway, New York, NY'
    },
    host: {
      name: 'Emma Wilson',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg',
      superhost: true
    },
    amenities: ['WiFi', 'Gym', 'Balcony', 'Kitchen', 'City View'],
    guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    rating: 4.8,
    reviews: 156,
    type: 'apartment',
    featured: false
  },
  {
    id: '4',
    title: 'Countryside House',
    description: 'Peaceful country house surrounded by gardens and rolling hills.',
    price: 320,
    images: [
      'https://images.pexels.com/photos/277667/pexels-photo-277667.jpeg',
      'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg'
    ],
    location: {
      city: 'Tuscany',
      country: 'Italy',
      address: 'Via della Vigna 12, Tuscany'
    },
    host: {
      name: 'Alessandro Rossi',
      avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg',
      superhost: true
    },
    amenities: ['WiFi', 'Garden', 'Kitchen', 'Parking', 'Wine Cellar'],
    guests: 10,
    bedrooms: 5,
    bathrooms: 4,
    rating: 4.9,
    reviews: 203,
    type: 'house',
    featured: true
  }
];

export const mockExperiences: Experience[] = [
  {
    id: '1',
    title: 'Cooking Class with Local Chef',
    description: 'Learn to cook traditional dishes with fresh local ingredients',
    price: 85,
    image: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg',
    location: 'Paris, France',
    duration: '3 hours',
    rating: 4.8,
    reviews: 124,
    category: 'Food & Drink'
  },
  {
    id: '2',
    title: 'Sunset Photography Tour',
    description: 'Capture stunning sunset views with professional guidance',
    price: 65,
    image: 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg',
    location: 'Santorini, Greece',
    duration: '2 hours',
    rating: 4.9,
    reviews: 89,
    category: 'Art & Culture'
  },
  {
    id: '3',
    title: 'Guided City Walking Tour',
    description: 'Explore hidden gems and local history with expert guides',
    price: 35,
    image: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg',
    location: 'Rome, Italy',
    duration: '4 hours',
    rating: 4.7,
    reviews: 267,
    category: 'Sightseeing'
  }
];

export const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Le Bernardin',
    description: 'Exquisite French seafood cuisine in an elegant setting',
    cuisine: 'French',
    image: 'https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg',
    location: 'New York, NY',
    rating: 4.9,
    reviews: 1547,
    priceRange: '$$$$'
  },
  {
    id: '2',
    name: 'Tacos El Gordo',
    description: 'Authentic Mexican street food with fresh ingredients',
    cuisine: 'Mexican',
    image: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg',
    location: 'Los Angeles, CA',
    rating: 4.6,
    reviews: 892,
    priceRange: '$'
  },
  {
    id: '3',
    name: 'Sushi Nakazawa',
    description: 'Traditional Japanese sushi crafted by master chefs',
    cuisine: 'Japanese',
    image: 'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg',
    location: 'Tokyo, Japan',
    rating: 4.8,
    reviews: 634,
    priceRange: '$$$'
  }
];