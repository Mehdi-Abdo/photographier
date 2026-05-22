import React, { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { SearchFilters } from '../types';

interface FilterPanelProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  onClose?: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onFiltersChange, onClose }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
    if (onClose) onClose();
  };

  const handleClearFilters = () => {
    const clearedFilters: SearchFilters = {
      location: '',
      checkIn: '',
      checkOut: '',
      guests: 1,
      priceRange: [0, 1000],
      propertyType: '',
      minRating: 0
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Filters</h3>
        </div>
        {onClose && (
          <button onClick={onClose}>
            <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Price Range */}
        <div>
          <h4 className="font-medium mb-3">Price range</h4>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <label className="block text-sm text-gray-600 mb-1">Min price</label>
                <input
                  type="number"
                  value={localFilters.priceRange[0]}
                  onChange={(e) => setLocalFilters({
                    ...localFilters,
                    priceRange: [Number(e.target.value), localFilters.priceRange[1]]
                  })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm text-gray-600 mb-1">Max price</label>
                <input
                  type="number"
                  value={localFilters.priceRange[1]}
                  onChange={(e) => setLocalFilters({
                    ...localFilters,
                    priceRange: [localFilters.priceRange[0], Number(e.target.value)]
                  })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Property Type */}
        <div>
          <h4 className="font-medium mb-3">Property type</h4>
          <div className="grid grid-cols-2 gap-2">
            {['apartment', 'house', 'villa', 'cabin'].map(type => (
              <button
                key={type}
                onClick={() => setLocalFilters({
                  ...localFilters,
                  propertyType: localFilters.propertyType === type ? '' : type
                })}
                className={`px-4 py-2 rounded-lg border text-sm font-medium capitalize transition-colors ${
                  localFilters.propertyType === type
                    ? 'bg-rose-500 text-white border-rose-500'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Rating */}
        <div>
          <h4 className="font-medium mb-3">Minimum rating</h4>
          <div className="flex space-x-2">
            {[0, 4.0, 4.5, 4.8].map(rating => (
              <button
                key={rating}
                onClick={() => setLocalFilters({ ...localFilters, minRating: rating })}
                className={`px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
                  localFilters.minRating === rating
                    ? 'bg-rose-500 text-white border-rose-500'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                }`}
              >
                {rating === 0 ? 'Any' : `${rating}+`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex space-x-3 mt-8">
        <button
          onClick={handleClearFilters}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
        >
          Clear all
        </button>
        <button
          onClick={handleApplyFilters}
          className="flex-1 px-4 py-2 bg-rose-500 text-white rounded-lg font-medium hover:bg-rose-600 transition-colors"
        >
          Apply filters
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;