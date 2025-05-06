
import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import CricketSidebar from "@/components/cricket/CricketSidebar";
import TournamentSection from "@/components/cricket/TournamentSection";
import BetSlip from "@/components/cricket/BetSlip";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

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

const Cricket = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [activeTournament, setActiveTournament] = useState("all");
  const [showBetSlip, setShowBetSlip] = useState(false);
  const [searchText, setSearchText] = useState("");
  
  useEffect(() => {
    // In a real app, you would fetch from your API
    const demoMatches = [
      {
        "event_id": "28127348",
        "event_name": "Indian Premier League",
        "openDate": "2024-03-01T11:00:00Z",
        "runners": [
          {
            "name": "Mumbai Indians",
            "backOdds": 250,
            "layOdds": 300
          },
          {
            "name": "Kolkata Knight Riders",
            "backOdds": 3000,
            "layOdds": 0
          },
          {
            "name": "Chennai Super Kings",
            "backOdds": 9100,
            "layOdds": 0
          },
          {
            "name": "Royal Challengers Begaluru",
            "backOdds": 275,
            "layOdds": 325
          }
        ]
      },
      {
        "event_id": "34288796",
        "event_name": "Barbados Pelicans v Guyana Rainforest Rangers",
        "openDate": "2025-05-06T18:00:00Z",
        "runners": [
          {
            "name": "Barbados Pelicans",
            "backOdds": 1.2,
            "layOdds": 1.22
          },
          {
            "name": "Guyana Rainforest Rangers",
            "backOdds": 4.5,
            "layOdds": 6
          }
        ]
      },
      {
        "event_id": "34285416",
        "event_name": "Jamaica Titans v Windward Islands Infernos",
        "openDate": "2025-05-06T23:00:00Z",
        "runners": [
          {
            "name": "Jamaica Titans",
            "backOdds": 2.02,
            "layOdds": 2.48
          },
          {
            "name": "Windward Islands Infernos",
            "backOdds": 1.68,
            "layOdds": 1.99
          }
        ]
      },
      {
        "event_id": "34285418",
        "event_name": "South Africa Women v India Women",
        "openDate": "2025-05-07T04:30:00Z",
        "runners": [
          {
            "name": "South Africa Women",
            "backOdds": 4.2,
            "layOdds": 4.4
          },
          {
            "name": "India Women",
            "backOdds": 1.3,
            "layOdds": 1.31
          }
        ]
      },
      {
        "event_id": "34285489",
        "event_name": "Kolkata Knight Riders v Chennai Super Kings",
        "openDate": "2025-05-07T14:00:00Z",
        "runners": [
          {
            "name": "Kolkata Knight Riders",
            "backOdds": 1.65,
            "layOdds": 1.66
          },
          {
            "name": "Chennai Super Kings",
            "backOdds": 2.5,
            "layOdds": 2.52
          }
        ]
      },
      {
        "event_id": "34290693",
        "event_name": "Punjab Kings v Delhi Capitals",
        "openDate": "2025-05-08T14:00:00Z",
        "runners": [
          {
            "name": "Punjab Kings",
            "backOdds": 1.79,
            "layOdds": 1.85
          },
          {
            "name": "Delhi Capitals",
            "backOdds": 2.16,
            "layOdds": 2.28
          }
        ]
      }
    ];
    
    setMatches(demoMatches);
  }, []);
  
  const filterMatches = () => {
    if (searchText) {
      return matches.filter(match => 
        match.event_name.toLowerCase().includes(searchText.toLowerCase()) ||
        match.runners.some(runner => 
          runner.name.toLowerCase().includes(searchText.toLowerCase())
        )
      );
    }
    return matches;
  };
  
  // Group matches by tournament
  const getTournaments = () => {
    const filteredMatches = filterMatches();
    
    // For demo purposes, manually categorizing
    const tournaments: Record<string, Match[]> = {
      "Indian Premier League": [],
      "Caribbean Premier League": [],
      "International": [],
      "Women's Cricket": []
    };
    
    filteredMatches.forEach(match => {
      if (match.event_name.includes("Knight Riders") || 
          match.event_name.includes("Super") || 
          match.event_name.includes("Kings") || 
          match.event_name.includes("Capitals")) {
        tournaments["Indian Premier League"].push(match);
      } else if (match.event_name.includes("Pelicans") || 
                match.event_name.includes("Rangers") || 
                match.event_name.includes("Titans") ||
                match.event_name.includes("Infernos")) {
        tournaments["Caribbean Premier League"].push(match);
      } else if (match.event_name.includes("Women")) {
        tournaments["Women's Cricket"].push(match);
      } else {
        tournaments["International"].push(match);
      }
    });
    
    // Remove empty tournaments
    return Object.fromEntries(
      Object.entries(tournaments).filter(([_, matches]) => matches.length > 0)
    );
  };

  return (
    <Layout>
      <div className="flex flex-col md:flex-row min-h-[calc(100vh-64px)]">
        {/* Sidebar */}
        <div className="w-full md:w-64 border-r border-betting-border">
          <CricketSidebar 
            activeTournament={activeTournament}
            setActiveTournament={setActiveTournament}
          />
        </div>
        
        {/* Main Content */}
        <div className="flex-1 p-4">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white mb-4">Cricket Betting</h1>
            
            <div className="relative">
              <input
                type="text"
                placeholder="Search matches or teams..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full p-2 pl-10 bg-betting-card border border-betting-border rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-betting-match"
              />
              <Search size={18} className="absolute left-3 top-2.5 text-gray-500" />
            </div>
          </div>
          
          {/* Featured Match */}
          <div className="mb-6">
            <div className="glass-card p-4 border-l-4 border-l-betting-match">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs bg-betting-lay/30 text-betting-lay px-2 py-0.5 rounded-full">
                  FEATURED MATCH
                </span>
                <span className="text-xs text-gray-400">
                  Today, 19:30 IST
                </span>
              </div>
              
              <h3 className="font-semibold text-white text-lg mb-3">
                Kolkata Knight Riders v Chennai Super Kings
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-card p-3">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">Kolkata Knight Riders</span>
                    <span className="text-betting-match">1.65</span>
                  </div>
                  <Button size="sm" className="w-full back-btn">
                    BACK
                  </Button>
                </div>
                
                <div className="glass-card p-3">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">Chennai Super Kings</span>
                    <span className="text-betting-match">2.50</span>
                  </div>
                  <Button size="sm" className="w-full back-btn">
                    BACK
                  </Button>
                </div>
              </div>
              
              <div className="mt-4 text-center">
                <Button 
                  size="sm" 
                  variant="outline"
                  className="border-betting-match text-betting-match hover:bg-betting-match/10"
                >
                  See All Markets
                </Button>
              </div>
            </div>
          </div>
          
          {/* Tournament Sections */}
          {Object.entries(getTournaments()).map(([tournamentName, tournamentMatches]) => (
            <TournamentSection 
              key={tournamentName}
              tournamentName={tournamentName}
              matches={tournamentMatches}
            />
          ))}
        </div>
        
        {/* Fixed Bet Slip Button */}
        <div className="fixed bottom-4 right-4 z-30">
          <Button 
            size="lg"
            onClick={() => setShowBetSlip(true)}
            className="bg-betting-match hover:bg-betting-hover text-white rounded-full shadow-lg"
          >
            Bet Slip (1)
          </Button>
        </div>
        
        {/* Bet Slip */}
        <BetSlip 
          visible={showBetSlip} 
          onClose={() => setShowBetSlip(false)} 
        />
      </div>
    </Layout>
  );
};

export default Cricket;
