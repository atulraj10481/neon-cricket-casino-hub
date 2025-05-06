
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface OddsCardProps {
  title: string;
  selections: {
    name: string;
    backOdds: number;
    layOdds: number;
  }[];
  active?: boolean;
}

const OddsCard = ({ title, selections, active = true }: OddsCardProps) => {
  const [expanded, setExpanded] = useState(active);

  return (
    <div className="border border-gray-200 rounded-md mb-4 bg-white shadow-sm">
      {/* Header */}
      <div 
        className={`p-3 flex justify-between items-center cursor-pointer border-b ${expanded ? "border-gray-200" : "border-transparent"} bg-gray-50`}
        onClick={() => setExpanded(!expanded)}
      >
        <h3 className="font-medium text-gray-800">{title}</h3>
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
          <div className="grid grid-cols-12 gap-1 text-xs text-gray-500 px-1 mb-2">
            <div className="col-span-6"></div>
            <div className="col-span-3 text-center font-semibold">Back</div>
            <div className="col-span-3 text-center font-semibold">Lay</div>
          </div>
          
          {selections.map((selection, idx) => (
            <div key={idx} className="grid grid-cols-12 gap-1 items-center mb-2">
              <div className="col-span-6 text-sm text-gray-700">{selection.name}</div>
              <div className="col-span-3">
                <Button 
                  className="w-full h-9 back-btn font-mono"
                  size="sm"
                >
                  {selection.backOdds.toFixed(2)}
                </Button>
              </div>
              <div className="col-span-3">
                <Button 
                  className="w-full h-9 lay-btn font-mono"
                  size="sm"
                  disabled={selection.layOdds <= 0}
                >
                  {selection.layOdds > 0 ? selection.layOdds.toFixed(2) : "-"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OddsCard;
