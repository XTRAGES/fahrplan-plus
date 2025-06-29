import React from 'react';
import { X, Search, Heart, Clock, Users, Euro, AlertCircle, CheckCircle } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Hilfe & Anleitung</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[75vh]">
          <div className="space-y-8">
            {/* Getting Started */}
            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <Search className="w-6 h-6 text-db-red" />
                <span>Erste Schritte</span>
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <p className="text-gray-700">
                  <strong>1. Verbindung suchen:</strong> Geben Sie Ihren Abfahrts- und Zielbahnhof ein. 
                  Nutzen Sie die Autovervollständigung für schnellere Eingabe.
                </p>
                <p className="text-gray-700">
                  <strong>2. Datum und Zeit wählen:</strong> Wählen Sie Ihr gewünschtes Reisedatum und die Abfahrtszeit.
                </p>
                <p className="text-gray-700">
                  <strong>3. Ergebnisse durchsuchen:</strong> Sortieren Sie die Verbindungen nach Abfahrtszeit, Dauer oder Preis.
                </p>
              </div>
            </section>

            {/* Features */}
            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <Heart className="w-6 h-6 text-db-red" />
                <span>Funktionen</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Favoriten</h4>
                  <p className="text-gray-700 text-sm">
                    Speichern Sie häufig genutzte Strecken als Favoriten für schnellen Zugriff. 
                    Melden Sie sich an, um diese Funktion zu nutzen.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Suchverlauf</h4>
                  <p className="text-gray-700 text-sm">
                    Ihre letzten Suchanfragen werden automatisch gespeichert und können 
                    schnell erneut ausgeführt werden.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Echtzeitdaten</h4>
                  <p className="text-gray-700 text-sm">
                    Sehen Sie aktuelle Verspätungen und Gleisänderungen direkt in den Suchergebnissen.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Sortierung</h4>
                  <p className="text-gray-700 text-sm">
                    Sortieren Sie Verbindungen nach Abfahrtszeit, Reisedauer oder Preis 
                    für optimale Reiseplanung.
                  </p>
                </div>
              </div>
            </section>

            {/* Understanding Results */}
            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <Clock className="w-6 h-6 text-db-red" />
                <span>Ergebnisse verstehen</span>
              </h3>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Symbole und Bedeutungen:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-600" />
                      <span>Reisedauer</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-gray-600" />
                      <span>Anzahl Umstiege</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Euro className="w-4 h-4 text-gray-600" />
                      <span>Preis ab</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-success-600" />
                      <span>Pünktlich</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4 text-warning-600" />
                      <span>Verspätung</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-success-600" />
                      <span>Direktverbindung</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Account Features */}
            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <Users className="w-6 h-6 text-db-red" />
                <span>Konto-Funktionen</span>
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <p className="text-gray-700">
                  <strong>Anmeldung:</strong> Erstellen Sie ein kostenloses Konto, um Favoriten zu speichern 
                  und Ihren Suchverlauf zu verwalten.
                </p>
                <p className="text-gray-700">
                  <strong>Datenschutz:</strong> Ihre Daten werden sicher gespeichert und nicht an Dritte weitergegeben.
                </p>
                <p className="text-gray-700">
                  <strong>Synchronisation:</strong> Ihre Favoriten und Einstellungen sind auf allen Geräten verfügbar.
                </p>
              </div>
            </section>

            {/* Tips */}
            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Tipps & Tricks</h3>
              <div className="bg-blue-50 rounded-lg p-4 space-y-2">
                <p className="text-blue-800 text-sm">
                  💡 <strong>Tipp:</strong> Nutzen Sie die Autovervollständigung bei der Stationseingabe für schnellere Suchen.
                </p>
                <p className="text-blue-800 text-sm">
                  💡 <strong>Tipp:</strong> Speichern Sie häufig genutzte Strecken als Favoriten für Ein-Klick-Suchen.
                </p>
                <p className="text-blue-800 text-sm">
                  💡 <strong>Tipp:</strong> Sortieren Sie nach Dauer für die schnellsten Verbindungen oder nach Preis für günstige Optionen.
                </p>
                <p className="text-blue-800 text-sm">
                  💡 <strong>Tipp:</strong> Achten Sie auf die Verspätungsanzeigen für aktuelle Reiseinformationen.
                </p>
              </div>
            </section>

            {/* Contact */}
            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Kontakt & Support</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 mb-2">
                  Bei Fragen oder Problemen können Sie sich gerne an uns wenden:
                </p>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>📧 E-Mail: aldinzendeli33@gmail.com</p>
                  <p>🐙 GitHub: @XTRAGES</p>
                  <p>🌐 Dies ist ein Portfolio-Projekt zur Demonstration moderner Webtechnologien</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;