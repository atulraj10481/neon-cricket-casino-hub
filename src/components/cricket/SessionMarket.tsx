
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

interface SessionMarketProps {
  title: string;
  line: number;
  over: string;
  active?: boolean;
}

const SessionMarket = ({ title, line, over, active = true }: SessionMarketProps) => {
  const [expanded, setExpanded] = useState(active);
  
  // Generate random odds around the line
  const noOdds = line * 0.98;
  const yesOdds = line * 1.02;

  return (
    <div className="glass-card mb-4">
      {/* Header */}
      <div 
        className={`p-4 flex justify-between items-center cursor-pointer border-b ${expanded ? "border-betting-border" : "border-transparent"}`}
        onClick={() => setExpanded(!expanded)}
      >
        <div>
          <h3 className="font-medium text-white">{title}</h3>
          <div className="text-xs text-gray-400 flex items-center mt-1">
            <Clock size={12} className="mr-1" /> {over}
          </div>
        </div>
        <div className="flex items-center">
          {active && (
            <span className="text-xs bg-betting-lay/30 text-betting-lay px-2 py-0.5 rounded-full mr-2">
              LIVE
            </span>
          )}
          <span className="text-xs text-gray-400">
            {expanded ? "Hide" : "Show"}
          </span>
        </div>
      </div>
      
      {/* Content */}
      {expanded && (
        <div className="p-4">
          <div className="flex justify-center mb-4">
            <span className="text-lg font-bold text-white bg-betting-card p-2 px-6 rounded-full">
              Line: {line}
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-card p-3">
              <div className="text-center mb-2">
                <div className="text-sm text-gray-300 mb-1">NO</div>
                <div className="text-lg font-mono text-white">{noOdds.toFixed(2)}</div>
              </div>
              <Button size="sm" className="w-full back-btn">
                BACK NO
              </Button>
            </div>
            
            <div className="glass-card p-3">
              <div className="text-center mb-2">
                <div className="text-sm text-gray-300 mb-1">YES</div>
                <div className="text-lg font-mono text-white">{yesOdds.toFixed(2)}</div>
              </div>
              <Button size="sm" className="w-full back-btn">
                BACK YES
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SessionMarket;
