import React, { useState } from 'react';
import { Trip } from '../types';
import TripCard from './TripCard';
import { Zap, Clock, Euro } from 'lucide-react';

interface TripResultsProps {
  trips: Trip[];
  loading?: boolean;
  onTripSelect?: (trip: Trip) => void;
}

type SortOption = 'departure' | 'duration' | 'price';

const TripResults: React.FC<TripResultsProps> = ({ trips, loading, onTripSelect }) => {
  const [sortBy, setSortBy] = useState<SortOption>('departure');

  const sortedTrips = [...trips].sort((a, b) => {
    switch (sortBy) {
      case 'departure':
        return a.departure.getTime() - b.departure.getTime();
      case 'duration':
        return a.duration - b.duration;
      case 'price':
        const priceA = a.price || 0;
        const priceB = b.price || 0;
        return priceA - priceB;
      default:
        return 0;
    }
  });

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gray-200 h-6 w-20 rounded"></div>
              <div className="bg-gray-200 h-6 w-16 rounded"></div>
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gray-200 h-8 w-16 rounded"></div>
              <div className="bg-gray-200 h-1 flex-1 mx-4 rounded"></div>
              <div className="bg-gray-200 h-8 w-16 rounded"></div>
            </div>
            <div className="flex items-center justify-between">
              <div className="bg-gray-200 h-4 w-24 rounded"></div>
              <div className="bg-gray-200 h-6 w-20 rounded-full"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (trips.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
        <div className="text-gray-400 mb-4">
          <Clock className="w-12 h-12 mx-auto" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Keine Verbindungen gefunden
        </h3>
        <p className="text-gray-600">
          Versuchen Sie es mit anderen Stationen oder einem anderen Datum.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filter buttons */}
      <div className="flex items-center space-x-4 bg-white rounded-lg p-4 border border-gray-200">
        <span className="text-sm font-medium text-gray-700">Sortieren nach:</span>
        <button 
          onClick={() => setSortBy('departure')}
          className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            sortBy === 'departure' 
              ? 'bg-db-red text-white' 
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Abfahrt</span>
        </button>
        <button 
          onClick={() => setSortBy('duration')}
          className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            sortBy === 'duration' 
              ? 'bg-db-red text-white' 
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>Dauer</span>
        </button>
        <button 
          onClick={() => setSortBy('price')}
          className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            sortBy === 'price' 
              ? 'bg-db-red text-white' 
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Euro className="w-4 h-4" />
          <span>Preis</span>
        </button>
      </div>

      {/* Results header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">
          {trips.length} Verbindung{trips.length !== 1 ? 'en' : ''} gefunden
        </h2>
        <div className="text-sm text-gray-600">
          {trips.filter(t => !t.delay || t.delay === 0).length} pünktlich
        </div>
      </div>

      {/* Trip cards */}
      <div className="space-y-4">
        {sortedTrips.map((trip) => (
          <TripCard
            key={trip.id}
            trip={trip}
            onSelect={onTripSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default TripResults;