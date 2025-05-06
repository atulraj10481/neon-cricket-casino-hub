
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6 glass-card">
          <h1 className="text-5xl font-bold mb-4 text-betting-match">404</h1>
          <p className="text-xl text-white mb-6">Oops! Page not found</p>
          <p className="text-gray-400 mb-8">
            The page you are looking for might have been removed, had its name changed, 
            or is temporarily unavailable.
          </p>
          <Link to="/">
            <Button className="bg-betting-match hover:bg-betting-hover text-white">
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
