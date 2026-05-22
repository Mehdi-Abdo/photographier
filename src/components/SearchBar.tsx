import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
  onSearch?: (filters: any) => void;
  showLabels?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, showLabels = true }) => {
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const navigate = useNavigate();

  const handleSearch = () => {
    const filters = {
      location,
      checkIn,
      checkOut,
      guests
    };
    
    if (onSearch) {
      onSearch(filters);
    } else {
      navigate('/search', { state: filters });
    }
  };

  return (
    <div className="bg-white rounded-full shadow-lg border border-gray-200 p-2">
      <div className="flex flex-col md:flex-row items-center">
        {/* Location */}
        <div className="flex-1 px-4 py-3 border-r border-gray-200 min-w-0">
          {showLabels && <label className="block text-xs font-semibold text-gray-900 mb-1">Where</label>}
          <div className="flex items-center">
            <MapPin className="h-4 w-4 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search destinations"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border-none outline-none text-sm text-gray-700 placeholder-gray-400"
            />
          </div>
        </div>

        {/* Check In */}
        <div className="flex-1 px-4 py-3 border-r border-gray-200 min-w-0">
          {showLabels && <label className="block text-xs font-semibold text-gray-900 mb-1">Check in</label>}
          <div className="flex items-center">
            <Calendar className="h-4 w-4 text-gray-400 mr-2" />
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full border-none outline-none text-sm text-gray-700"
            />
          </div>
        </div>

        {/* Check Out */}
        <div className="flex-1 px-4 py-3 border-r border-gray-200 min-w-0">
          {showLabels && <label className="block text-xs font-semibold text-gray-900 mb-1">Check out</label>}
          <div className="flex items-center">
            <Calendar className="h-4 w-4 text-gray-400 mr-2" />
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full border-none outline-none text-sm text-gray-700"
            />
          </div>
        </div>

        {/* Guests */}
        <div className="flex-1 px-4 py-3 min-w-0">
          {showLabels && <label className="block text-xs font-semibold text-gray-900 mb-1">Who</label>}
          <div className="flex items-center">
            <Users className="h-4 w-4 text-gray-400 mr-2" />
            <select
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full border-none outline-none text-sm text-gray-700"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                <option key={num} value={num}>
                  {num} guest{num !== 1 ? 's' : ''}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="bg-rose-500 hover:bg-rose-600 text-white rounded-full p-4 transition-colors ml-2"
        >
          <Search className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;