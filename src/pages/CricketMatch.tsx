
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, MapPin, Zap, Star, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import OddsCard from "@/components/cricket/OddsCard";
import SessionMarket from "@/components/cricket/SessionMarket";
import MatchStats from "@/components/cricket/MatchStats";
import BetSlip from "@/components/cricket/BetSlip";

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

const CricketMatch = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [match, setMatch] = useState<Match | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"all" | "match_odds" | "fancy" | "bookmaker">("all");
  const [showBetSlip, setShowBetSlip] = useState(false);
  
  useEffect(() => {
    // In a real app, you would fetch from your API by eventId
    const fetchMatch = async () => {
      setLoading(true);
      
      // For demo, we'll simulate API call with dummy data
      setTimeout(() => {
        // Just for demo purposes
        const demoMatch = {
          "event_id": eventId || "",
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
        };
        
        setMatch(demoMatch);
        setLoading(false);
      }, 500);
    };
    
    fetchMatch();
  }, [eventId]);
  
  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-[calc(100vh-64px)]">
          <div className="animate-pulse-neon">Loading match data...</div>
        </div>
      </Layout>
    );
  }
  
  if (!match) {
    return (
      <Layout>
        <div className="container mx-auto p-4 text-center">
          <p className="text-white">Match not found</p>
          <Link to="/cricket" className="text-betting-match hover:underline">
            Return to Cricket page
          </Link>
        </div>
      </Layout>
    );
  }
  
  const getTeams = () => {
    const teams = match.event_name.split(" v ");
    return {
      team1: teams[0],
      team2: teams[1] || "Opponent"
    };
  };
  
  const { team1, team2 } = getTeams();
  
  // Format the match date
  const formatMatchDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true
    });
  };
  
  // Define fancy markets (session markets)
  const fancyMarkets = [
    { title: "6 Over Runs KKR", line: 48, over: "Over 1-6" },
    { title: "6 Over Runs CSK", line: 45, over: "Over 1-6" },
    { title: "KKR Score", line: 175, over: "20 Overs" },
    { title: "CSK Score", line: 168, over: "20 Overs" },
    { title: "Total Match Sixes", line: 15, over: "Full Match" }
  ];
  
  // Bookmaker markets
  const bookmakerMarkets = [
    { 
      title: "Match Winner", 
      selections: match.runners
    },
    { 
      title: "Toss Winner", 
      selections: [
        { name: team1, backOdds: 1.95, layOdds: 1.98 },
        { name: team2, backOdds: 1.95, layOdds: 1.98 }
      ] 
    },
    { 
      title: "Highest Opening Partnership", 
      selections: [
        { name: team1, backOdds: 1.85, layOdds: 1.9 },
        { name: team2, backOdds: 2.05, layOdds: 2.1 }
      ] 
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto p-4">
        {/* Breadcrumbs and Match Header */}
        <div className="mb-6">
          <div className="flex items-center gap-1 text-sm text-gray-400 mb-4">
            <Link to="/cricket" className="flex items-center hover:text-betting-match">
              <ArrowLeft size={14} className="mr-1" /> Back to Cricket
            </Link>
            <span> / </span>
            <span className="text-white">Match Details</span>
          </div>
          
          <div className="glass-card p-4 border-l-4 border-betting-match">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <span className="text-xs bg-betting-lay/30 text-betting-lay px-2 py-0.5 rounded-full mr-2">
                  LIVE
                </span>
                <span className="text-xs bg-betting-match/20 text-betting-match px-2 py-0.5 rounded-full">
                  IPL
                </span>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                  <Star size={16} />
                </Button>
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                  <Bell size={16} />
                </Button>
              </div>
            </div>
            
            <h1 className="text-xl md:text-2xl font-bold text-white mb-3">
              {match.event_name}
            </h1>
            
            <div className="flex flex-col md:flex-row md:items-center text-xs text-gray-400 gap-2 md:gap-4">
              <div className="flex items-center">
                <Calendar size={14} className="mr-1" /> 
                {formatMatchDate(match.openDate)}
              </div>
              <div className="flex items-center">
                <MapPin size={14} className="mr-1" /> 
                Eden Gardens, Kolkata
              </div>
              <div className="flex items-center">
                <Zap size={14} className="mr-1" /> 
                Toss: {team1} won the toss and elected to bat
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-betting-bg rounded-md">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-sm text-gray-400 mb-1">{team1}</div>
                  <div className="text-xl font-bold text-white">142/6</div>
                  <div className="text-xs text-gray-400">15.2 overs</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-400 mb-1">{team2}</div>
                  <div className="text-xl font-bold text-white">--/--</div>
                  <div className="text-xs text-gray-400">Yet to bat</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Market Navigation */}
        <div className="mb-6 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            <Button 
              variant="ghost"
              size="sm"
              className={`${
                activeTab === "all" 
                  ? "bg-betting-match/20 text-betting-match" 
                  : "text-gray-300 hover:bg-betting-match/10"
              }`}
              onClick={() => setActiveTab("all")}
            >
              All Markets
            </Button>
            <Button 
              variant="ghost"
              size="sm"
              className={`${
                activeTab === "match_odds" 
                  ? "bg-betting-match/20 text-betting-match" 
                  : "text-gray-300 hover:bg-betting-match/10"
              }`}
              onClick={() => setActiveTab("match_odds")}
            >
              Match Odds
            </Button>
            <Button 
              variant="ghost"
              size="sm"
              className={`${
                activeTab === "fancy" 
                  ? "bg-betting-match/20 text-betting-match" 
                  : "text-gray-300 hover:bg-betting-match/10"
              }`}
              onClick={() => setActiveTab("fancy")}
            >
              Fancy Betting
            </Button>
            <Button 
              variant="ghost"
              size="sm"
              className={`${
                activeTab === "bookmaker" 
                  ? "bg-betting-match/20 text-betting-match" 
                  : "text-gray-300 hover:bg-betting-match/10"
              }`}
              onClick={() => setActiveTab("bookmaker")}
            >
              Bookmaker
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Markets */}
          <div className="lg:col-span-2">
            {/* Match Odds */}
            {(activeTab === "all" || activeTab === "match_odds") && (
              <OddsCard 
                title="Match Odds"
                selections={match.runners}
                active={true}
              />
            )}
            
            {/* Fancy Markets */}
            {(activeTab === "all" || activeTab === "fancy") && (
              <>
                <h3 className="text-lg font-semibold text-white mb-3">Fancy Betting</h3>
                {fancyMarkets.map((market, idx) => (
                  <SessionMarket 
                    key={idx}
                    title={market.title}
                    line={market.line}
                    over={market.over}
                    active={idx < 2} // First 2 are active
                  />
                ))}
              </>
            )}
            
            {/* Bookmaker */}
            {(activeTab === "all" || activeTab === "bookmaker") && (
              <>
                <h3 className="text-lg font-semibold text-white mb-3">Bookmaker</h3>
                {bookmakerMarkets.map((market, idx) => (
                  <OddsCard 
                    key={idx}
                    title={market.title}
                    selections={market.selections}
                    active={idx === 0} // Only first one is active
                  />
                ))}
              </>
            )}
          </div>
          
          {/* Sidebar with Stats and More Markets */}
          <div className="lg:col-span-1">
            <MatchStats team1={team1} team2={team2} />
            
            <div className="glass-card mb-4 p-4">
              <h3 className="font-medium text-white mb-3">Recent Bets</h3>
              <div className="text-center text-sm text-gray-400 py-2">
                No recent bets for this match
              </div>
            </div>
            
            <div className="glass-card mb-4">
              <div className="p-4 border-b border-betting-border">
                <h3 className="font-medium text-white">Other Popular Matches</h3>
              </div>
              <div className="p-4 space-y-3">
                {[
                  "Punjab Kings v Delhi Capitals",
                  "Islamabad United v Quetta Gladiators",
                  "South Africa Women v India Women"
                ].map((match, idx) => (
                  <div key={idx} className="text-sm">
                    <Link 
                      to="#" 
                      className="text-gray-300 hover:text-betting-match transition-colors"
                    >
                      {match}
                    </Link>
                    <div className="text-xs text-gray-500 mt-0.5">
                      May {idx + 8}, 2025
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
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

export default CricketMatch;
