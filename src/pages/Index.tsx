
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatedSplash } from "@/components/AnimatedSplash";

const Index = () => {
  const navigate = useNavigate();
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
    // Check if user has completed onboarding
    const hasCompletedOnboarding = localStorage.getItem('hasCompletedOnboarding');
    if (hasCompletedOnboarding) {
      navigate("/dashboard");
    } else {
      navigate("/onboarding");
    }
  };

  if (showSplash) {
    return <AnimatedSplash onComplete={handleSplashComplete} duration={3000} />;
  }

  return null;
};

export default Index;
