
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import MatchCard from "./MatchCard";

interface Runner {
  name: string;
  backOdds: number;
  layOdds: number;
}

interface Match {
  event_id: string;
  event_name: string;
  openDate: string;
  runners: Runner[];
}

interface TournamentSectionProps {
  tournamentName: string;
  matches: Match[];
}

const TournamentSection = ({ tournamentName, matches }: TournamentSectionProps) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="mb-4">
      <div 
        className="bg-betting-card border border-betting-border rounded-md p-3 flex justify-between items-center cursor-pointer"
        onClick={() => setCollapsed(!collapsed)}
      >
        <h3 className="font-medium text-white flex items-center">
          {tournamentName}
          <span className="ml-2 px-2 py-0.5 bg-betting-match/20 text-betting-match rounded-full text-xs">
            {matches.length}
          </span>
        </h3>
        <button className="text-gray-400">
          {collapsed ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
        </button>
      </div>
      
      {!collapsed && (
        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          {matches.map((match) => (
            <MatchCard 
              key={match.event_id} 
              match={match} 
              tournamentName={tournamentName} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TournamentSection;
