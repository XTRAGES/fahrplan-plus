import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import TripResults from './components/TripResults';
import RecentSearches from './components/RecentSearches';
import Footer from './components/Footer';
import { Trip } from './types';
import { generateMockTrips } from './utils/mockData';
import { useSearchHistory } from './hooks/useSearchHistory';
import { useAuth } from './hooks/useAuth';

function App() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const { addToHistory } = useSearchHistory();
  const { user } = useAuth();

  const handleSearch = async (params: {
    from: string;
    to: string;
    date: Date;
    time: string;
  }) => {
    setLoading(true);
    setHasSearched(true);

    // Add to search history if user is logged in
    if (user) {
      await addToHistory(params.from, params.to, params.date, params.time);
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockTrips = generateMockTrips(params.from, params.to, params.date);
    setTrips(mockTrips);
    setLoading(false);
  };

  const handleRecentSearchSelect = (from: string, to: string) => {
    handleSearch({
      from,
      to,
      date: new Date(),
      time: '09:00',
    });
  };

  const handleFavoriteSelect = (from: string, to: string) => {
    handleSearch({
      from,
      to,
      date: new Date(),
      time: '09:00',
    });
  };

  const handleTripSelect = (trip: Trip) => {
    console.log('Selected trip:', trip);
    // Here you could navigate to a detail view or booking page
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#22c55e',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      
      <Header onFavoriteSelect={handleFavoriteSelect} />
      
      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-db-red to-red-700 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Intelligente Bahnreisen in Deutschland
            </h1>
            <p className="text-xl md:text-2xl text-red-100 mb-8 max-w-3xl mx-auto">
              Finden Sie die besten Verbindungen mit Echtzeitdaten, 
              Verspätungsinformationen und optimaler Routenplanung.
            </p>
          </div>
        </div>

        {/* Search Section */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
          <SearchForm onSearch={handleSearch} loading={loading} />
          
          {!hasSearched && (
            <RecentSearches onSearchSelect={handleRecentSearchSelect} />
          )}
        </div>

        {/* Results Section */}
        {hasSearched && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
            <TripResults 
              trips={trips} 
              loading={loading}
              onTripSelect={handleTripSelect}
            />
          </div>
        )}

        {/* Features Section (shown when no search has been made) */}
        {!hasSearched && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Warum Fahrplan++?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Moderne Technologie für bessere Bahnreisen
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-db-red text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Echtzeitdaten</h3>
                <p className="text-gray-600">
                  Aktuelle Verspätungen, Gleisänderungen und Ausfälle direkt von der Deutschen Bahn.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-db-red text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Optimale Routen</h3>
                <p className="text-gray-600">
                  Intelligente Routenplanung mit wenigen Umstiegen und besten Verbindungen.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-db-red text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Personalisiert</h3>
                <p className="text-gray-600">
                  Favoriten, Verlauf und personalisierte Empfehlungen für Ihre Reisen.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;