
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
    <aside className="w-full md:w-64 bg-betting-card border-r border-betting-border flex flex-col h-full">
      <div className="p-4 border-b border-betting-border">
        <h2 className="font-bold text-white flex items-center">
          <Trophy size={18} className="text-betting-match mr-2" /> Cricket Betting
        </h2>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-betting-border">
        <Button
          variant="ghost"
          size="sm"
          className={`flex-1 rounded-none border-b-2 ${
            activeSection === "tournaments"
              ? "border-betting-match text-betting-match"
              : "border-transparent text-gray-400"
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
              ? "border-betting-match text-betting-match"
              : "border-transparent text-gray-400"
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
              ? "border-betting-match text-betting-match"
              : "border-transparent text-gray-400"
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
                  ? "bg-betting-match/20 text-betting-match"
                  : "text-gray-300 hover:bg-betting-match/10"
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
                    ? "bg-betting-match/20 text-betting-match"
                    : "text-gray-300 hover:bg-betting-match/10"
                } ${tournament.featured ? "border-l-2 border-betting-match" : ""}`}
                onClick={() => setActiveTournament(tournament.id)}
              >
                {tournament.featured && <Star size={14} className="mr-2 text-betting-match" />}
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
            <div key={i} className="glass-card p-2 text-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="text-gray-400">May {i + 7}, 2025</span>
                <span className="bg-betting-match/20 text-betting-match text-xs px-2 py-0.5 rounded-full">
                  IPL
                </span>
              </div>
              <div className="text-white font-medium">
                Team A vs Team B
              </div>
              <div className="flex items-center mt-1 text-gray-400">
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
            <div key={i} className="glass-card p-2 text-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="bg-betting-lay/30 text-betting-lay px-2 py-0.5 rounded-full">
                  LIVE
                </span>
                <span className="bg-betting-match/20 text-betting-match text-xs px-2 py-0.5 rounded-full">
                  IPL
                </span>
              </div>
              <div className="text-white font-medium">
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
                <div className="text-gray-400">
                  <Star size={12} className="inline mr-1" /> Popular
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Banner */}
      <div className="mt-auto p-3 border-t border-betting-border">
        <div className="bg-gradient-to-r from-betting-match/30 to-betting-hover/30 p-3 rounded-md text-center">
          <p className="text-white text-xs font-medium">New User Bonus</p>
          <p className="text-betting-match text-sm font-bold">₹500 FREE BET</p>
          <Button size="sm" className="mt-2 w-full bg-betting-match hover:bg-betting-hover text-white text-xs">
            Claim Now
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default CricketSidebar;
