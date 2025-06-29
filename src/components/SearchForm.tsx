import React, { useState, useRef, useEffect } from 'react';
import { Search, ArrowLeftRight, Calendar, Clock, Users } from 'lucide-react';
import { searchStations } from '../utils/mockData';
import { Station } from '../types';
import StationSuggestions from './StationSuggestions';

interface SearchFormProps {
  onSearch: (params: {
    from: string;
    to: string;
    date: Date;
    time: string;
  }) => void;
  loading?: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, loading }) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('09:00');
  const [fromSuggestions, setFromSuggestions] = useState<Station[]>([]);
  const [toSuggestions, setToSuggestions] = useState<Station[]>([]);
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);

  const fromRef = useRef<HTMLDivElement>(null);
  const toRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (fromRef.current && !fromRef.current.contains(event.target as Node)) {
        setShowFromSuggestions(false);
      }
      if (toRef.current && !toRef.current.contains(event.target as Node)) {
        setShowToSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFromChange = (value: string) => {
    setFrom(value);
    setFromSuggestions(searchStations(value));
    setShowFromSuggestions(value.length > 1);
  };

  const handleToChange = (value: string) => {
    setTo(value);
    setToSuggestions(searchStations(value));
    setShowToSuggestions(value.length > 1);
  };

  const handleSwapStations = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (from.trim() && to.trim()) {
      onSearch({
        from: from.trim(),
        to: to.trim(),
        date: new Date(date),
        time,
      });
    }
  };

  const selectFromStation = (station: Station) => {
    setFrom(station.name);
    setShowFromSuggestions(false);
  };

  const selectToStation = (station: Station) => {
    setTo(station.name);
    setShowToSuggestions(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Station Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
          {/* From Station */}
          <div ref={fromRef} className="relative">
            <label htmlFor="from" className="block text-sm font-medium text-gray-700 mb-2">
              Von
            </label>
            <input
              type="text"
              id="from"
              value={from}
              onChange={(e) => handleFromChange(e.target.value)}
              placeholder="Berlin Hauptbahnhof"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-db-red focus:border-transparent transition-all duration-200"
              required
            />
            {showFromSuggestions && (
              <StationSuggestions
                stations={fromSuggestions}
                onSelect={selectFromStation}
              />
            )}
          </div>

          {/* Swap Button */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <button
              type="button"
              onClick={handleSwapStations}
              className="p-2 bg-white border border-gray-300 rounded-full hover:bg-gray-50 hover:border-db-red transition-all duration-200 shadow-sm"
            >
              <ArrowLeftRight className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          {/* To Station */}
          <div ref={toRef} className="relative">
            <label htmlFor="to" className="block text-sm font-medium text-gray-700 mb-2">
              Nach
            </label>
            <input
              type="text"
              id="to"
              value={to}
              onChange={(e) => handleToChange(e.target.value)}
              placeholder="München Hauptbahnhof"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-db-red focus:border-transparent transition-all duration-200"
              required
            />
            {showToSuggestions && (
              <StationSuggestions
                stations={toSuggestions}
                onSelect={selectToStation}
              />
            )}
          </div>
        </div>

        {/* Date and Time */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4 inline mr-1" />
              Datum
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-db-red focus:border-transparent transition-all duration-200"
            />
          </div>
          
          <div>
            <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
              <Clock className="w-4 h-4 inline mr-1" />
              Uhrzeit
            </label>
            <input
              type="time"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-db-red focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label htmlFor="passengers" className="block text-sm font-medium text-gray-700 mb-2">
              <Users className="w-4 h-4 inline mr-1" />
              Reisende
            </label>
            <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-db-red focus:border-transparent transition-all duration-200">
              <option value="1">1 Erwachsener</option>
              <option value="2">2 Erwachsene</option>
              <option value="3">3 Erwachsene</option>
              <option value="4">4 Erwachsene</option>
            </select>
          </div>
        </div>

        {/* Search Button */}
        <button
          type="submit"
          disabled={loading || !from.trim() || !to.trim()}
          className="w-full bg-db-red text-white py-4 px-6 rounded-lg font-semibold hover:bg-red-700 focus:ring-2 focus:ring-db-red focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <>
              <Search className="w-5 h-5" />
              <span>Verbindungen suchen</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default SearchForm;