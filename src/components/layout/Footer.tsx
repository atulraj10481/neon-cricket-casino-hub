
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-6 mt-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-red-600 font-bold text-lg mb-3">NeonCricket</h3>
            <p className="text-sm text-gray-600">
              Premier betting platform for cricket enthusiasts. Play responsibly.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">Home</Link></li>
              <li><Link to="/cricket" className="text-gray-600 hover:text-blue-600 transition-colors">Cricket</Link></li>
              <li><Link to="/casino" className="text-gray-600 hover:text-blue-600 transition-colors">Casino</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/help" className="text-gray-600 hover:text-blue-600 transition-colors">Help Center</Link></li>
              <li><Link to="/terms" className="text-gray-600 hover:text-blue-600 transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/responsible-gaming" className="text-gray-600 hover:text-blue-600 transition-colors">Responsible Gaming</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Legal</h4>
            <p className="text-xs text-gray-600">
              This platform is intended for users 18 years and above. Betting may be addictive, please play responsibly.
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-6 pt-6 text-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} NeonCricket. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
