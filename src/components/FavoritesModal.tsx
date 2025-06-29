import React, { useState } from 'react';
import { X, Heart, Plus, Trash2, ArrowRight } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';
import { useAuth } from '../hooks/useAuth';

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRoute?: (from: string, to: string) => void;
}

const FavoritesModal: React.FC<FavoritesModalProps> = ({ isOpen, onClose, onSelectRoute }) => {
  const { user } = useAuth();
  const { favorites, loading, addFavorite, removeFavorite } = useFavorites();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newFavorite, setNewFavorite] = useState({
    name: '',
    from: '',
    to: '',
  });

  if (!isOpen) return null;

  const handleAddFavorite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFavorite.name || !newFavorite.from || !newFavorite.to) return;

    await addFavorite(newFavorite.name, newFavorite.from, newFavorite.to);
    setNewFavorite({ name: '', from: '', to: '' });
    setShowAddForm(false);
  };

  const handleSelectRoute = (from: string, to: string) => {
    onSelectRoute?.(from, to);
    onClose();
  };

  if (!user) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
          <div className="text-center">
            <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Anmeldung erforderlich
            </h3>
            <p className="text-gray-600 mb-4">
              Melden Sie sich an, um Ihre Lieblingsstrecken zu speichern.
            </p>
            <button
              onClick={onClose}
              className="bg-db-red text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Schließen
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
            <Heart className="w-6 h-6 text-db-red" />
            <span>Meine Favoriten</span>
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {!showAddForm && (
            <button
              onClick={() => setShowAddForm(true)}
              className="w-full mb-4 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-db-red hover:bg-red-50 transition-all duration-200 flex items-center justify-center space-x-2 text-gray-600 hover:text-db-red"
            >
              <Plus className="w-5 h-5" />
              <span>Neue Lieblingsstrecke hinzufügen</span>
            </button>
          )}

          {showAddForm && (
            <form onSubmit={handleAddFavorite} className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-4">Neue Lieblingsstrecke</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Name (z.B. Zur Arbeit)"
                  value={newFavorite.name}
                  onChange={(e) => setNewFavorite(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-db-red focus:border-transparent"
                  required
                />
                <input
                  type="text"
                  placeholder="Von (z.B. Berlin Hauptbahnhof)"
                  value={newFavorite.from}
                  onChange={(e) => setNewFavorite(prev => ({ ...prev, from: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-db-red focus:border-transparent"
                  required
                />
                <input
                  type="text"
                  placeholder="Nach (z.B. München Hauptbahnhof)"
                  value={newFavorite.to}
                  onChange={(e) => setNewFavorite(prev => ({ ...prev, to: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-db-red focus:border-transparent"
                  required
                />
                <div className="flex space-x-2">
                  <button
                    type="submit"
                    className="flex-1 bg-db-red text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Hinzufügen
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Abbrechen
                  </button>
                </div>
              </div>
            </form>
          )}

          {loading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse bg-gray-200 h-16 rounded-lg"></div>
              ))}
            </div>
          ) : favorites.length === 0 ? (
            <div className="text-center py-8">
              <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Keine Favoriten vorhanden
              </h3>
              <p className="text-gray-600">
                Fügen Sie Ihre häufig genutzten Strecken hinzu, um schneller zu suchen.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {favorites.map((favorite) => (
                <div
                  key={favorite.id}
                  className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:border-db-red hover:shadow-md transition-all duration-200"
                >
                  <div
                    className="flex-1 cursor-pointer"
                    onClick={() => handleSelectRoute(favorite.from_station, favorite.to_station)}
                  >
                    <h4 className="font-semibold text-gray-900">{favorite.name}</h4>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span>{favorite.from_station}</span>
                      <ArrowRight className="w-4 h-4" />
                      <span>{favorite.to_station}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFavorite(favorite.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoritesModal;