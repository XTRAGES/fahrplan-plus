import React from 'react';
import { Clock, ArrowRight, Trash2 } from 'lucide-react';
import { useSearchHistory } from '../hooks/useSearchHistory';
import { useAuth } from '../hooks/useAuth';
import { formatDate } from '../utils/formatters';

interface RecentSearchesProps {
  onSearchSelect: (from: string, to: string) => void;
}

const RecentSearches: React.FC<RecentSearchesProps> = ({ onSearchSelect }) => {
  const { user } = useAuth();
  const { history, loading, clearHistory } = useSearchHistory();

  if (!user || loading || history.length === 0) return null;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Letzte Suchanfragen</h3>
        </div>
        <button
          onClick={clearHistory}
          className="flex items-center space-x-1 text-sm text-gray-500 hover:text-red-600 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          <span>Löschen</span>
        </button>
      </div>
      
      <div className="space-y-2">
        {history.slice(0, 5).map((search) => (
          <button
            key={search.id}
            onClick={() => onSearchSelect(search.from_station, search.to_station)}
            className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
          >
            <div className="flex items-center space-x-3">
              <div className="text-sm">
                <span className="font-medium text-gray-900">{search.from_station}</span>
                <ArrowRight className="w-4 h-4 inline mx-2 text-gray-400" />
                <span className="font-medium text-gray-900">{search.to_station}</span>
              </div>
            </div>
            <div className="text-xs text-gray-500">
              {formatDate(new Date(search.search_date))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecentSearches;