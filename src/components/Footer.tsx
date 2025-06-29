import React from 'react';
import { Heart, Github, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-db-gray text-white py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold mb-4">Fahrplan++</h3>
            <p className="text-gray-300 mb-4 max-w-md">
              Ihr intelligenter Assistent für Bahnreisen in Deutschland. 
              Echtzeitinformationen, Verspätungen und optimale Routenplanung.
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="https://github.com/XTRAGES"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
                <span>GitHub</span>
              </a>
              <a
                href="mailto:aldinzendeli33@gmail.com"
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span>Kontakt</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">Fahrplansuche</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Favoriten</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Hilfe</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Rechtliches</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">Datenschutz</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Impressum</a></li>
              <li><a href="#" className="hover:text-white transition-colors">AGB</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-600 pt-8 mt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 text-gray-300">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>by</span>
              <a
                href="https://github.com/XTRAGES"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-white hover:text-red-300 transition-colors"
              >
                Aldin Zendeli
              </a>
            </div>
            <div className="text-gray-400 text-sm mt-4 md:mt-0">
              © 2025 Fahrplan++. Portfolio Project.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;