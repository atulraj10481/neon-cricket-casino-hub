
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trophy, Calendar, Star, Clock } from "lucide-react";

// Tournament groups for the sidebar
const tournaments = [
  { id: "ipl", name: "Indian Premier League", featured: true },
  { id: "t20wc", name: "T20 World Cup" },
  { id: "cpl", name: "Caribbean Premier League" },
  { id: "psl", name: "Pakistan Super League" },
  { id: "bbl", name: "Big Bash League" },
  { id: "women", name: "Women's Cricket" },
  { id: "county", name: "County Championship" },
  { id: "int", name: "International Matches" },
];

interface CricketSidebarProps {
  activeTournament: string;
  setActiveTournament: (id: string) => void;
}

const CricketSidebar = ({ activeTournament, setActiveTournament }: CricketSidebarProps) => {
  const [activeSection, setActiveSection] = useState<"tournaments" | "upcoming" | "trending">("tournaments");

  return (
    <aside className="w-full md:w-64 bg-white border-r border-gray-200 flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <h2 className="font-bold text-gray-800 flex items-center">
          <Trophy size={18} className="text-blue-600 mr-2" /> Cricket Betting
        </h2>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-200">
        <Button
          variant="ghost"
          size="sm"
          className={`flex-1 rounded-none border-b-2 ${
            activeSection === "tournaments"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-500"
          }`}
          onClick={() => setActiveSection("tournaments")}
        >
          <Trophy size={16} className="mr-2" /> Tournaments
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={`flex-1 rounded-none border-b-2 ${
            activeSection === "upcoming"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-500"
          }`}
          onClick={() => setActiveSection("upcoming")}
        >
          <Calendar size={16} className="mr-2" /> Upcoming
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={`flex-1 rounded-none border-b-2 ${
            activeSection === "trending"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-500"
          }`}
          onClick={() => setActiveSection("trending")}
        >
          <Star size={16} className="mr-2" /> Trending
        </Button>
      </div>

      {/* Tournament List */}
      {activeSection === "tournaments" && (
        <div className="overflow-y-auto flex-1">
          <div className="p-1">
            <Button
              variant="ghost"
              size="sm"
              className={`w-full justify-start mb-1 ${
                activeTournament === "all"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-blue-50/60"
              }`}
              onClick={() => setActiveTournament("all")}
            >
              All Tournaments
            </Button>

            {tournaments.map((tournament) => (
              <Button
                key={tournament.id}
                variant="ghost"
                size="sm"
                className={`w-full justify-start mb-1 ${
                  activeTournament === tournament.id
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-blue-50/60"
                } ${tournament.featured ? "border-l-2 border-red-500" : ""}`}
                onClick={() => setActiveTournament(tournament.id)}
              >
                {tournament.featured && <Star size={14} className="mr-2 text-red-500" />}
                {tournament.name}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Matches */}
      {activeSection === "upcoming" && (
        <div className="overflow-y-auto flex-1 p-2 space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="border border-gray-200 rounded-md p-2 text-xs bg-white">
              <div className="flex items-center justify-between mb-1">
                <span className="text-gray-500">May {i + 7}, 2025</span>
                <span className="bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded-full">
                  IPL
                </span>
              </div>
              <div className="text-gray-800 font-medium">
                Team A vs Team B
              </div>
              <div className="flex items-center mt-1 text-gray-500">
                <Clock size={12} className="mr-1" /> 19:30 IST
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Trending Matches */}
      {activeSection === "trending" && (
        <div className="overflow-y-auto flex-1 p-2 space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border border-gray-200 rounded-md p-2 text-xs bg-white">
              <div className="flex items-center justify-between mb-1">
                <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                  LIVE
                </span>
                <span className="bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded-full">
                  IPL
                </span>
              </div>
              <div className="text-gray-800 font-medium">
                Team X vs Team Y
              </div>
              <div className="flex justify-between mt-1">
                <div className="flex gap-1">
                  <span className="text-xs px-1.5 py-0.5 back-btn rounded">
                    1.95
                  </span>
                  <span className="text-xs px-1.5 py-0.5 lay-btn rounded">
                    2.05
                  </span>
                </div>
                <div className="text-gray-500">
                  <Star size={12} className="inline mr-1" /> Popular
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Banner */}
      <div className="mt-auto p-3 border-t border-gray-200">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-3 rounded-md text-center">
          <p className="text-gray-800 text-xs font-medium">New User Bonus</p>
          <p className="text-blue-600 text-sm font-bold">₹500 FREE BET</p>
          <Button size="sm" className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white text-xs">
            Claim Now
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default CricketSidebar;
