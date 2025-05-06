
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

interface MatchStatsProps {
  team1: string;
  team2: string;
}

const MatchStats = ({ team1, team2 }: MatchStatsProps) => {
  const [expanded, setExpanded] = useState(true);
  
  // Mock data for the stats
  const stats = {
    team1WinRate: 55,
    team2WinRate: 45,
    team1LastMatches: [true, false, true, true, false],
    team2LastMatches: [false, true, true, false, false],
    headToHead: [
      { winner: team1, date: "12 Apr 2025" },
      { winner: team2, date: "18 Mar 2025" },
      { winner: team1, date: "5 Feb 2025" },
      { winner: team1, date: "20 Dec 2024" }
    ]
  };

  return (
    <div className="glass-card mb-4 overflow-hidden">
      <div 
        className="p-4 flex justify-between items-center cursor-pointer border-b border-betting-border"
        onClick={() => setExpanded(!expanded)}
      >
        <h3 className="font-medium text-white">Match Stats & Head-to-Head</h3>
        <button>
          {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>
      
      {expanded && (
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <div className="text-sm text-gray-300 mb-2">{team1} Win Rate</div>
              <div className="w-full bg-betting-bg rounded-full h-4">
                <div 
                  className="bg-betting-back h-4 rounded-full" 
                  style={{ width: `${stats.team1WinRate}%` }}
                ></div>
              </div>
              <div className="text-right text-xs text-gray-400 mt-1">
                {stats.team1WinRate}%
              </div>
            </div>
            
            <div>
              <div className="text-sm text-gray-300 mb-2">{team2} Win Rate</div>
              <div className="w-full bg-betting-bg rounded-full h-4">
                <div 
                  className="bg-betting-lay h-4 rounded-full" 
                  style={{ width: `${stats.team2WinRate}%` }}
                ></div>
              </div>
              <div className="text-right text-xs text-gray-400 mt-1">
                {stats.team2WinRate}%
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <div className="text-sm text-gray-300 mb-2">{team1} Last 5 Matches</div>
              <div className="flex gap-1">
                {stats.team1LastMatches.map((win, idx) => (
                  <div 
                    key={idx}
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                      win ? "bg-betting-back text-white" : "bg-betting-lay text-white"
                    }`}
                  >
                    {win ? "W" : "L"}
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <div className="text-sm text-gray-300 mb-2">{team2} Last 5 Matches</div>
              <div className="flex gap-1">
                {stats.team2LastMatches.map((win, idx) => (
                  <div 
                    key={idx}
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                      win ? "bg-betting-back text-white" : "bg-betting-lay text-white"
                    }`}
                  >
                    {win ? "W" : "L"}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="text-sm text-gray-300 mb-3">Head to Head</div>
            <div className="glass-card">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-betting-border">
                    <th className="p-2 text-left text-xs text-gray-400">Date</th>
                    <th className="p-2 text-left text-xs text-gray-400">Winner</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.headToHead.map((match, idx) => (
                    <tr key={idx} className="border-b border-betting-border/30">
                      <td className="p-2 text-gray-300">{match.date}</td>
                      <td className="p-2 text-white">{match.winner}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchStats;
