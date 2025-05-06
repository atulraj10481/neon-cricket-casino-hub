
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { useState } from "react";

interface Runner {
  name: string;
  backOdds: number;
  layOdds: number;
}

interface MatchCardProps {
  match: {
    event_id: string;
    event_name: string;
    openDate: string;
    runners: Runner[];
  };
  tournamentName?: string;
}

const MatchCard = ({ match, tournamentName }: MatchCardProps) => {
  const [expanded, setExpanded] = useState(false);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    
    // Check if match is happening today
    const isToday = date.toDateString() === now.toDateString();
    
    const timeString = date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
    
    if (isToday) {
      return `Today, ${timeString}`;
    } else {
      return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
      }) + `, ${timeString}`;
    }
  };
  
  const isLive = () => {
    const matchDate = new Date(match.openDate);
    const now = new Date();
    
    // For demo, show as "live" if within 2 hours of the match time
    return Math.abs(now.getTime() - matchDate.getTime()) < 2 * 60 * 60 * 1000;
  };
  
  const getStatus = () => {
    const matchDate = new Date(match.openDate);
    const now = new Date();
    
    if (isLive()) {
      return { label: "LIVE", bgColor: "bg-red-100", textColor: "text-red-600" };
    } else if (matchDate > now) {
      return { label: "UPCOMING", bgColor: "bg-blue-100", textColor: "text-blue-600" };
    } else {
      return { label: "COMPLETED", bgColor: "bg-gray-200", textColor: "text-gray-600" };
    }
  };
  
  const status = getStatus();

  return (
    <Link to={`/cricket/${match.event_id}`}>
      <div className="match-card p-3">
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center">
            <span className={`text-xs px-2 py-0.5 rounded-full ${status.bgColor} ${status.textColor} mr-2`}>
              {status.label}
            </span>
            {tournamentName && (
              <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
                {tournamentName}
              </span>
            )}
          </div>
          <span className="text-xs text-gray-500">
            {formatDate(match.openDate)}
          </span>
        </div>
        
        {/* Match Name */}
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium text-gray-800">{match.event_name}</h3>
          <button onClick={(e) => {
            e.preventDefault();
            setExpanded(!expanded);
          }}>
            <Star size={16} className={expanded ? "text-betting-match" : "text-gray-400"} />
          </button>
        </div>
        
        {/* Betting Odds */}
        <div className="space-y-2">
          <div className="grid grid-cols-12 gap-2 text-xs text-gray-500 px-1">
            <div className="col-span-6"></div>
            <div className="col-span-3 text-center font-semibold">Back</div>
            <div className="col-span-3 text-center font-semibold">Lay</div>
          </div>
          
          {match.runners.slice(0, 2).map((runner, idx) => (
            <div key={idx} className="grid grid-cols-12 gap-2 items-center">
              <div className="col-span-6 text-sm text-gray-700">{runner.name}</div>
              <div className="col-span-3">
                <div className="back-btn rounded p-1 text-center text-xs font-mono">
                  {runner.backOdds.toFixed(2)}
                </div>
              </div>
              <div className="col-span-3">
                <div className="lay-btn rounded p-1 text-center text-xs font-mono">
                  {runner.layOdds > 0 ? runner.layOdds.toFixed(2) : "-"}
                </div>
              </div>
            </div>
          ))}

          {match.runners.length > 2 && expanded && 
            match.runners.slice(2).map((runner, idx) => (
              <div key={idx + 2} className="grid grid-cols-12 gap-2 items-center">
                <div className="col-span-6 text-sm text-gray-700">{runner.name}</div>
                <div className="col-span-3">
                  <div className="back-btn rounded p-1 text-center text-xs font-mono">
                    {runner.backOdds.toFixed(2)}
                  </div>
                </div>
                <div className="col-span-3">
                  <div className="lay-btn rounded p-1 text-center text-xs font-mono">
                    {runner.layOdds > 0 ? runner.layOdds.toFixed(2) : "-"}
                  </div>
                </div>
              </div>
            ))
          }
        </div>
        
        {/* Extra Information when expanded */}
        {expanded && (
          <div className="mt-4 pt-3 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="border border-gray-200 rounded p-2 text-center bg-white">
                <div className="text-gray-500 mb-1">Fancy</div>
                <div className="text-blue-600">Available</div>
              </div>
              <div className="border border-gray-200 rounded p-2 text-center bg-white">
                <div className="text-gray-500 mb-1">Bookmaker</div>
                <div className="text-blue-600">Available</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};

export default MatchCard;
