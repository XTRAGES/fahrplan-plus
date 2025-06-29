import React, { useState } from 'react';
import { Clock, ArrowRight, Users, Euro, AlertCircle, CheckCircle, Heart } from 'lucide-react';
import { Trip } from '../types';
import { formatTime, formatDuration, formatPrice, getDelayBgColor } from '../utils/formatters';
import { useFavorites } from '../hooks/useFavorites';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

interface TripCardProps {
  trip: Trip;
  onSelect?: (trip: Trip) => void;
}

const TripCard: React.FC<TripCardProps> = ({ trip, onSelect }) => {
  const { user } = useAuth();
  const { addFavorite } = useFavorites();
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [favoriteName, setFavoriteName] = useState('');
  const hasDelay = trip.delay && trip.delay > 0;

  const handleSaveAsFavorite = async () => {
    if (!user) {
      toast.error('Bitte melden Sie sich an, um Favoriten zu speichern');
      return;
    }

    if (!favoriteName.trim()) {
      toast.error('Bitte geben Sie einen Namen ein');
      return;
    }

    await addFavorite(favoriteName, trip.from.name, trip.to.name);
    setShowSaveModal(false);
    setFavoriteName('');
  };

  return (
    <>
      <div 
        className="bg-white rounded-lg border border-gray-200 hover:border-db-red hover:shadow-md transition-all duration-200 cursor-pointer animate-slide-up relative group"
        onClick={() => onSelect?.(trip)}
      >
        {/* Save as favorite button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowSaveModal(true);
          }}
          className="absolute top-4 right-4 p-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full shadow-md hover:bg-red-50 hover:text-db-red"
        >
          <Heart className="w-4 h-4" />
        </button>

        <div className="p-6">
          {/* Header with train info */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="bg-db-red text-white px-3 py-1 rounded-full text-sm font-semibold">
                {trip.trainType} {trip.trainNumber}
              </div>
              {trip.platform && (
                <div className="text-sm text-gray-600">
                  Gleis {trip.platform}
                </div>
              )}
            </div>
            <div className="text-right">
              {trip.price && (
                <div className="text-lg font-bold text-gray-900">
                  {formatPrice(trip.price)}
                </div>
              )}
              <div className="text-sm text-gray-500">ab</div>
            </div>
          </div>

          {/* Main trip info */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              {/* Departure */}
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {formatTime(trip.departure)}
                </div>
                <div className="text-sm text-gray-600">
                  {trip.from.name.split(' ')[0]}
                </div>
              </div>

              {/* Journey visualization */}
              <div className="flex-1 flex items-center space-x-2 px-4">
                <div className="w-3 h-3 rounded-full bg-db-red"></div>
                <div className="flex-1 h-0.5 bg-gray-200 relative">
                  <ArrowRight className="w-4 h-4 text-gray-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white" />
                </div>
                <div className="w-3 h-3 rounded-full bg-db-red"></div>
              </div>

              {/* Arrival */}
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {formatTime(trip.arrival)}
                </div>
                <div className="text-sm text-gray-600">
                  {trip.to.name.split(' ')[0]}
                </div>
              </div>
            </div>
          </div>

          {/* Trip details */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{formatDuration(trip.duration)}</span>
              </div>
              
              {trip.transfers > 0 && (
                <div className="flex items-center space-x-1 text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>{trip.transfers} Umstieg{trip.transfers !== 1 ? 'e' : ''}</span>
                </div>
              )}

              {trip.transfers === 0 && (
                <div className="flex items-center space-x-1 text-success-600">
                  <CheckCircle className="w-4 h-4" />
                  <span>Direkt</span>
                </div>
              )}
            </div>

            {/* Delay status */}
            <div className="flex items-center space-x-2">
              {hasDelay ? (
                <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getDelayBgColor(trip.delay)}`}>
                  <AlertCircle className="w-3 h-3" />
                  <span>+{trip.delay}min</span>
                </div>
              ) : (
                <div className="flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium bg-success-50 text-success-700">
                  <CheckCircle className="w-3 h-3" />
                  <span>Pünktlich</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Save as favorite modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Als Favorit speichern
            </h3>
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">
                {trip.from.name} → {trip.to.name}
              </p>
              <input
                type="text"
                placeholder="Name für diese Strecke (z.B. Zur Arbeit)"
                value={favoriteName}
                onChange={(e) => setFavoriteName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-db-red focus:border-transparent"
                autoFocus
              />
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleSaveAsFavorite}
                className="flex-1 bg-db-red text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
              >
                Speichern
              </button>
              <button
                onClick={() => {
                  setShowSaveModal(false);
                  setFavoriteName('');
                }}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Abbrechen
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TripCard;