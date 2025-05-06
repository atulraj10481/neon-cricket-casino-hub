
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

interface BetInfo {
  id: string;
  matchName: string;
  selection: string;
  odds: number;
  stake: number;
  isBack: boolean;
}

interface BetSlipProps {
  visible: boolean;
  onClose: () => void;
}

const BetSlip = ({ visible, onClose }: BetSlipProps) => {
  const [bets, setBets] = useState<BetInfo[]>([
    {
      id: "bet1",
      matchName: "Kolkata Knight Riders v Chennai Super Kings",
      selection: "Kolkata Knight Riders",
      odds: 1.65,
      stake: 1000,
      isBack: true
    }
  ]);
  
  const [quickStake, setQuickStake] = useState<number | null>(null);
  
  const removeBet = (id: string) => {
    setBets(bets.filter(bet => bet.id !== id));
  };
  
  const updateStake = (id: string, stake: number) => {
    setBets(bets.map(bet => bet.id === id ? { ...bet, stake } : bet));
  };
  
  const applyQuickStake = () => {
    if (quickStake) {
      setBets(bets.map(bet => ({ ...bet, stake: quickStake })));
    }
  };
  
  const calculateTotalStake = () => {
    return bets.reduce((total, bet) => total + bet.stake, 0);
  };
  
  const calculateTotalPotential = () => {
    return bets.reduce((total, bet) => {
      if (bet.isBack) {
        return total + (bet.stake * bet.odds - bet.stake);
      } else {
        return total + bet.stake;
      }
    }, 0);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-80 bg-betting-card border-l border-betting-border z-40 flex flex-col shadow-lg animate-in slide-in-from-right">
      <div className="p-4 border-b border-betting-border flex justify-between items-center bg-betting-bg">
        <h3 className="font-bold text-white">Bet Slip ({bets.length})</h3>
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-white"
        >
          <X size={18} />
        </button>
      </div>
      
      <div className="overflow-y-auto flex-1 p-3 space-y-3">
        {bets.length === 0 ? (
          <div className="text-center text-gray-400 py-8">
            <p>No bets added yet</p>
            <p className="text-xs mt-2">Click on odds to add selections</p>
          </div>
        ) : (
          bets.map(bet => (
            <div key={bet.id} className="glass-card p-3 relative">
              <button 
                onClick={() => removeBet(bet.id)}
                className="absolute top-2 right-2 text-gray-400 hover:text-white"
              >
                <X size={14} />
              </button>
              
              <div className="text-xs text-gray-400 mb-1">{bet.matchName}</div>
              <div className="font-medium text-white mb-2">{bet.selection}</div>
              
              <div className="flex justify-between items-center mb-3">
                <div className={`text-xs px-2 py-1 rounded ${bet.isBack ? 'back-btn' : 'lay-btn'}`}>
                  {bet.isBack ? 'BACK' : 'LAY'} @ {bet.odds.toFixed(2)}
                </div>
                <div className="text-xs text-gray-400">
                  Potential Win: <span className="text-betting-back">
                    ₹{((bet.stake * bet.odds) - (bet.isBack ? bet.stake : 0)).toFixed(2)}
                  </span>
                </div>
              </div>
              
              <div className="flex gap-2 items-center">
                <span className="text-xs text-gray-400">Stake: ₹</span>
                <Input
                  value={bet.stake}
                  onChange={(e) => updateStake(bet.id, Number(e.target.value))}
                  className="h-8 bg-betting-bg border-betting-border text-white"
                  type="number"
                />
              </div>
            </div>
          ))
        )}
      </div>
      
      {bets.length > 0 && (
        <div className="border-t border-betting-border p-3 space-y-3">
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              className={`flex-1 ${quickStake === 100 ? 'border-betting-match text-betting-match' : 'border-betting-border'}`}
              onClick={() => setQuickStake(100)}
            >
              ₹100
            </Button>
            <Button
              size="sm"
              variant="outline"
              className={`flex-1 ${quickStake === 500 ? 'border-betting-match text-betting-match' : 'border-betting-border'}`}
              onClick={() => setQuickStake(500)}
            >
              ₹500
            </Button>
            <Button
              size="sm"
              variant="outline"
              className={`flex-1 ${quickStake === 1000 ? 'border-betting-match text-betting-match' : 'border-betting-border'}`}
              onClick={() => setQuickStake(1000)}
            >
              ₹1000
            </Button>
            <Button
              size="sm"
              className="flex-1 bg-betting-match hover:bg-betting-hover text-white"
              onClick={applyQuickStake}
            >
              Apply
            </Button>
          </div>
          
          <div className="glass-card p-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">Total Stake:</span>
              <span className="text-white font-mono">₹{calculateTotalStake().toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span className="text-gray-300">Potential Win:</span>
              <span className="text-betting-back font-medium font-mono">₹{calculateTotalPotential().toFixed(2)}</span>
            </div>
          </div>
          
          <Button className="w-full bg-betting-back hover:brightness-110 text-white">
            Place Bet
          </Button>
        </div>
      )}
    </div>
  );
};

export default BetSlip;
