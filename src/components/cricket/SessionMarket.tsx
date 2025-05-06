
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
    <div className="border border-gray-200 rounded-md mb-4 bg-white shadow-sm">
      {/* Header */}
      <div 
        className={`p-3 flex justify-between items-center cursor-pointer border-b ${expanded ? "border-gray-200" : "border-transparent"} bg-gray-50`}
        onClick={() => setExpanded(!expanded)}
      >
        <div>
          <h3 className="font-medium text-gray-800">{title}</h3>
          <div className="text-xs text-gray-500 flex items-center mt-1">
            <Clock size={12} className="mr-1" /> {over}
          </div>
        </div>
        <div className="flex items-center">
          {active && (
            <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full mr-2">
              LIVE
            </span>
          )}
          <span className="text-xs text-gray-500">
            {expanded ? "Hide" : "Show"}
          </span>
        </div>
      </div>
      
      {/* Content */}
      {expanded && (
        <div className="p-3">
          <div className="flex justify-center mb-3">
            <span className="text-lg font-bold text-gray-800 bg-gray-100 p-2 px-6 rounded-full">
              Line: {line}
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-md p-3 bg-white">
              <div className="text-center mb-2">
                <div className="text-sm text-gray-700 mb-1">NO</div>
                <div className="text-lg font-mono text-gray-800">{noOdds.toFixed(2)}</div>
              </div>
              <Button size="sm" className="w-full back-btn">
                BACK NO
              </Button>
            </div>
            
            <div className="border border-gray-200 rounded-md p-3 bg-white">
              <div className="text-center mb-2">
                <div className="text-sm text-gray-700 mb-1">YES</div>
                <div className="text-lg font-mono text-gray-800">{yesOdds.toFixed(2)}</div>
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
