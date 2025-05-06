
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Trophy, Star, Zap } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useEffect, useState } from "react";

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

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString("en-IN", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const Index = () => {
  const [liveMatches, setLiveMatches] = useState<Match[]>([]);
  
  useEffect(() => {
    // For demo purposes, we'll use mock data
    const demoData = {
      matches: [
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
          "event_id": "34282444",
          "event_name": "Islamabad United v Quetta Gladiators",
          "openDate": "2025-05-07T15:00:00Z",
          "runners": [
            {
              "name": "Islamabad United",
              "backOdds": 2.04,
              "layOdds": 2.12
            },
            {
              "name": "Quetta Gladiators",
              "backOdds": 1.9,
              "layOdds": 1.95
            }
          ]
        },
      ]
    };
    
    setLiveMatches(demoData.matches);
  }, []);

  const casinoGames = [
    { id: "roulette", name: "Roulette", icon: "🎮" },
    { id: "teen-patti", name: "Teen Patti", icon: "🃏" },
    { id: "andar-bahar", name: "Andar Bahar", icon: "🎴" },
    { id: "aviator", name: "Aviator", icon: "✈️" },
    { id: "slots", name: "Slots", icon: "🎰" }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-betting-bg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-blue-900/10 z-0"></div>
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              <span className="text-betting-match text-glow">Bet</span> on Cricket &{" "}
              <span className="text-betting-match text-glow">Casino</span> Games
            </h1>
            <p className="text-gray-300 text-lg md:text-xl mb-8">
              Experience the thrill of live betting with real-time odds and instant payouts.
              Join thousands of players already winning big.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-betting-match hover:bg-betting-hover text-white">
                <Trophy size={18} className="mr-2" /> Bet on Cricket
              </Button>
              <Button size="lg" variant="outline" className="border-betting-match text-white hover:bg-betting-match/10">
                Play Casino Games
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Live Matches Section */}
      <section className="py-12 bg-betting-bg">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <Zap size={24} className="text-betting-match mr-2" /> Live Matches
            </h2>
            <Link 
              to="/cricket" 
              className="text-betting-match hover:underline text-sm font-medium"
            >
              View All Matches
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {liveMatches.map((match) => (
              <Link 
                key={match.event_id} 
                to={`/cricket/${match.event_id}`}
                className="block"
              >
                <div className="match-card p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs bg-betting-match/20 text-betting-match px-2 py-1 rounded-full">
                      LIVE
                    </span>
                    <span className="text-xs text-gray-400">
                      {formatDate(match.openDate)}
                    </span>
                  </div>
                  
                  <h3 className="font-medium text-white mb-3">{match.event_name}</h3>
                  
                  <div className="space-y-2">
                    {match.runners.map((runner, idx) => (
                      <div key={idx} className="flex justify-between items-center">
                        <span className="text-sm text-gray-300">{runner.name}</span>
                        <div className="flex gap-2">
                          <span className="text-xs px-2 py-1 back-btn rounded">
                            {runner.backOdds.toFixed(2)}
                          </span>
                          <span className="text-xs px-2 py-1 lay-btn rounded">
                            {runner.layOdds.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Casino Games Section */}
      <section className="py-12 bg-betting-card">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <Star size={24} className="text-betting-match mr-2" /> Popular Casino Games
            </h2>
            <Link 
              to="/casino" 
              className="text-betting-match hover:underline text-sm font-medium"
            >
              View All Games
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {casinoGames.map((game) => (
              <Link 
                key={game.id} 
                to={`/casino/${game.id}`}
                className="block"
              >
                <div className="match-card p-4 h-full flex flex-col items-center justify-center text-center transition-all hover:scale-105 hover:animate-pulse-neon">
                  <div className="text-3xl mb-2">{game.icon}</div>
                  <h3 className="font-medium text-white">{game.name}</h3>
                  <p className="text-xs text-betting-match mt-2">Play Now</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-betting-bg to-betting-card">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start <span className="text-betting-match text-glow">Winning</span>?
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Join thousands of players already winning big on NeonCricket.
            Sign up now and get a welcome bonus on your first deposit.
          </p>
          <Button size="lg" className="bg-betting-match hover:bg-betting-hover text-white">
            Sign Up Now
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
