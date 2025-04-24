
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { KoffaLogo } from "@/components/KoffaLogo";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-koffa-snow-drift p-6">
      <KoffaLogo size="md" />
      <h1 className="text-4xl font-bold mb-4 mt-8 text-koffa-heavy-metal">404</h1>
      <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
      <Link to="/" className="text-koffa-aqua-forest hover:text-koffa-aqua-forest/80 underline">
        Return to Home
      </Link>
    </div>
  );
};

export default NotFound;
