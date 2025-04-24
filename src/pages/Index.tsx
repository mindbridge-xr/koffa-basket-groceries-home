
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { KoffaLogo } from "@/components/KoffaLogo";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Show splash screen briefly then redirect to onboarding
    const timer = setTimeout(() => {
      navigate("/onboarding");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-koffa-snow-drift p-6">
      <div className="animate-fade-in flex flex-col items-center">
        <KoffaLogo size="lg" />
        <p className="text-koffa-heavy-metal mt-6 text-lg">
          Family Grocery Management
        </p>
      </div>
    </div>
  );
};

export default Index;
