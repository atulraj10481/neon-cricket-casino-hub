
import { Link } from "react-router-dom";
import { Home, Trophy, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-betting-bg border-b border-betting-border py-3 px-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="text-2xl font-bold text-white text-glow">
            <span className="text-betting-match">Neon</span>Cricket
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link to="/" className="text-gray-300 hover:text-white transition-colors">
            <Home size={18} className="inline mr-1" />
            Home
          </Link>
          <Link to="/cricket" className="text-gray-300 hover:text-white transition-colors">
            <Trophy size={18} className="inline mr-1" />
            Cricket
          </Link>
          <Link to="/casino" className="text-gray-300 hover:text-white transition-colors">
            Casino
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="border-betting-match hover:bg-betting-match/10">
            <Search size={16} />
          </Button>
          <Button variant="outline" size="sm" className="border-betting-match text-white hover:bg-betting-match/10">
            Login
          </Button>
          <Button size="sm" className="bg-betting-match hover:bg-betting-hover text-white">
            Sign Up
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
