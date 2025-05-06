
import { Link } from "react-router-dom";
import { Home, Trophy, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 py-3 px-4 shadow-sm">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="text-2xl font-bold text-gray-800">
            <span className="text-red-600">Neon</span>Cricket
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link to="/" className="text-gray-700 hover:text-gray-900 transition-colors">
            <Home size={18} className="inline mr-1" />
            Home
          </Link>
          <Link to="/cricket" className="text-gray-700 hover:text-gray-900 transition-colors">
            <Trophy size={18} className="inline mr-1" />
            Cricket
          </Link>
          <Link to="/casino" className="text-gray-700 hover:text-gray-900 transition-colors">
            Casino
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="border-gray-300 hover:bg-gray-100">
            <Search size={16} />
          </Button>
          <Button variant="outline" size="sm" className="border-blue-600 text-blue-600 hover:bg-blue-50">
            Login
          </Button>
          <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
            Sign Up
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
