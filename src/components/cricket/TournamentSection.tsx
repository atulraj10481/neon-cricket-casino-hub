
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
        className="bg-gray-50 border border-gray-200 rounded-md p-3 flex justify-between items-center cursor-pointer"
        onClick={() => setCollapsed(!collapsed)}
      >
        <h3 className="font-medium text-gray-800 flex items-center">
          {tournamentName}
          <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-600 rounded-full text-xs">
            {matches.length}
          </span>
        </h3>
        <button className="text-gray-500">
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
