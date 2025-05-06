
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";

const casinoGames = [
  {
    id: "roulette",
    name: "Roulette",
    description: "Spin the wheel and try your luck",
    icon: "🎮",
    bgColor: "bg-gradient-to-br from-red-600/40 to-red-900/40"
  },
  {
    id: "teen-patti",
    name: "Teen Patti",
    description: "Traditional Indian poker game",
    icon: "🃏",
    bgColor: "bg-gradient-to-br from-blue-600/40 to-blue-900/40"
  },
  {
    id: "andar-bahar",
    name: "Andar Bahar",
    description: "Simple yet thrilling card game",
    icon: "🎴",
    bgColor: "bg-gradient-to-br from-purple-600/40 to-purple-900/40"
  },
  {
    id: "aviator",
    name: "Aviator",
    description: "Crash game with multipliers",
    icon: "✈️",
    bgColor: "bg-gradient-to-br from-green-600/40 to-green-900/40"
  },
  {
    id: "slots",
    name: "Slots",
    description: "Classic slot machine experience",
    icon: "🎰",
    bgColor: "bg-gradient-to-br from-yellow-600/40 to-yellow-900/40"
  }
];

const Casino = () => {
  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">
            Casino Games
          </h1>
          <p className="text-gray-300">
            Experience the thrill of our casino games with live dealers and instant payouts.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {casinoGames.map((game) => (
            <Link 
              key={game.id} 
              to={`/casino/${game.id}`}
              className="block"
            >
              <div className={`glass-card overflow-hidden transition-all hover:scale-105 hover:neon-border ${game.bgColor}`}>
                <div className="p-8 text-center">
                  <div className="text-6xl mb-4">{game.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{game.name}</h3>
                  <p className="text-gray-300 text-sm">{game.description}</p>
                </div>
                <div className="bg-betting-match text-white py-2 text-center">
                  Play Now
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-12 glass-card p-6 border-l-4 border-l-betting-match">
          <h2 className="text-xl font-bold text-white mb-4">
            Why Play with NeonCricket Casino?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">🔒</div>
              <h3 className="text-lg font-semibold text-white mb-2">Safe & Secure</h3>
              <p className="text-sm text-gray-400">
                All games are fair and transactions are secured with the latest encryption.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">💸</div>
              <h3 className="text-lg font-semibold text-white mb-2">Instant Payouts</h3>
              <p className="text-sm text-gray-400">
                Withdraw your winnings instantly to your preferred payment method.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🎁</div>
              <h3 className="text-lg font-semibold text-white mb-2">Bonuses & Rewards</h3>
              <p className="text-sm text-gray-400">
                Enjoy welcome bonuses, free spins, and loyalty rewards.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Casino;
