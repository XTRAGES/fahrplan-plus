import React, { useState } from 'react';
import { Train, Github, User, Heart, LogOut, LogIn, HelpCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import AuthModal from './AuthModal';
import FavoritesModal from './FavoritesModal';
import HelpModal from './HelpModal';
import toast from 'react-hot-toast';

interface HeaderProps {
  onFavoriteSelect?: (from: string, to: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onFavoriteSelect }) => {
  const { user, signOut } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showFavoritesModal, setShowFavoritesModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast.error('Fehler beim Abmelden');
    } else {
      toast.success('Erfolgreich abgemeldet');
    }
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-db-red rounded-lg">
                <Train className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-db-gray">Fahrplan++</h1>
                <p className="text-xs text-gray-500">Smart Train Assistant</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#search" className="text-gray-700 hover:text-db-red transition-colors font-medium">
                Suchen
              </a>
              <button
                onClick={() => setShowFavoritesModal(true)}
                className="text-gray-700 hover:text-db-red transition-colors font-medium flex items-center space-x-1"
              >
                <Heart className="w-4 h-4" />
                <span>Favoriten</span>
              </button>
              <button
                onClick={() => setShowHelpModal(true)}
                className="text-gray-700 hover:text-db-red transition-colors font-medium flex items-center space-x-1"
              >
                <HelpCircle className="w-4 h-4" />
                <span>Hilfe</span>
              </button>
            </nav>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              <a
                href="https://github.com/XTRAGES"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                title="GitHub - Aldin Zendeli"
              >
                <Github className="w-5 h-5" />
              </a>
              
              {user ? (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600 hidden sm:block">
                    Hallo, {user.displayName || user.email}
                  </span>
                  <button
                    onClick={handleSignOut}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    title="Abmelden"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="flex items-center space-x-2 bg-db-red text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  <span className="hidden sm:block">Anmelden</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />

      <FavoritesModal
        isOpen={showFavoritesModal}
        onClose={() => setShowFavoritesModal(false)}
        onSelectRoute={onFavoriteSelect}
      />

      <HelpModal
        isOpen={showHelpModal}
        onClose={() => setShowHelpModal(false)}
      />
    </>
  );
};

export default Header;