import React, { useState } from 'react';
import { Calendar, Users, Star } from 'lucide-react';
import { Property } from '../types';

interface BookingFormProps {
  property: Property;
}

const BookingForm: React.FC<BookingFormProps> = ({ property }) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  
  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const nights = calculateNights();
  const subtotal = nights * property.price;
  const serviceFee = Math.round(subtotal * 0.14);
  const total = subtotal + serviceFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle booking submission
    alert('Booking functionality would be implemented here!');
  };

  return (
    <div className="bg-white border border-gray-300 rounded-xl p-6 sticky top-24">
      {/* Price and Rating */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-2xl font-semibold">${property.price}</span>
          <span className="text-gray-600"> night</span>
        </div>
        <div className="flex items-center space-x-1">
          <Star className="h-4 w-4 text-yellow-400 fill-current" />
          <span className="font-medium">{property.rating}</span>
          <span className="text-gray-600">({property.reviews} reviews)</span>
        </div>
      </div>

      {/* Booking Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Dates */}
        <div className="grid grid-cols-2 gap-0 border border-gray-300 rounded-lg overflow-hidden">
          <div className="p-3 border-r border-gray-300">
            <label className="block text-xs font-semibold text-gray-900 mb-1">
              CHECK-IN
            </label>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 text-gray-400 mr-2" />
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                required
                className="w-full border-none outline-none text-sm"
              />
            </div>
          </div>
          <div className="p-3">
            <label className="block text-xs font-semibold text-gray-900 mb-1">
              CHECK-OUT
            </label>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 text-gray-400 mr-2" />
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                required
                className="w-full border-none outline-none text-sm"
              />
            </div>
          </div>
        </div>

        {/* Guests */}
        <div className="border border-gray-300 rounded-lg p-3">
          <label className="block text-xs font-semibold text-gray-900 mb-1">
            GUESTS
          </label>
          <div className="flex items-center">
            <Users className="h-4 w-4 text-gray-400 mr-2" />
            <select
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full border-none outline-none text-sm"
            >
              {Array.from({ length: property.guests }, (_, i) => i + 1).map(num => (
                <option key={num} value={num}>
                  {num} guest{num !== 1 ? 's' : ''}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Reserve Button */}
        <button
          type="submit"
          className="w-full bg-rose-500 hover:bg-rose-600 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          Reserve
        </button>
      </form>

      <p className="text-center text-gray-600 text-sm mt-4">
        You won't be charged yet
      </p>

      {/* Price Breakdown */}
      {nights > 0 && (
        <div className="mt-6 space-y-3">
          <div className="flex justify-between text-gray-600">
            <span>${property.price} x {nights} nights</span>
            <span>${subtotal}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Service fee</span>
            <span>${serviceFee}</span>
          </div>
          <hr className="border-gray-200" />
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>${total}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingForm;