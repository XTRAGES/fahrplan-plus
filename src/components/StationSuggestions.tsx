import React from 'react';
import { MapPin } from 'lucide-react';
import { Station } from '../types';

interface StationSuggestionsProps {
  stations: Station[];
  onSelect: (station: Station) => void;
}

const StationSuggestions: React.FC<StationSuggestionsProps> = ({ stations, onSelect }) => {
  if (stations.length === 0) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto">
      {stations.map((station) => (
        <button
          key={station.id}
          type="button"
          onClick={() => onSelect(station)}
          className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center space-x-3 transition-colors duration-150 first:rounded-t-lg last:rounded-b-lg"
        >
          <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <div>
            <div className="font-medium text-gray-900">{station.name}</div>
            {station.city && (
              <div className="text-sm text-gray-500">{station.city}</div>
            )}
          </div>
        </button>
      ))}
    </div>
  );
};

export default StationSuggestions;