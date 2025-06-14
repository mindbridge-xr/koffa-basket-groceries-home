
import { useState, useEffect, useRef } from 'react';
import { HealthMetrics, ShoppingSession } from '@/types/smartShopping';

export const useHealthTracking = () => {
  const [isTracking, setIsTracking] = useState(false);
  const [currentMetrics, setCurrentMetrics] = useState<HealthMetrics>({
    steps: 0,
    caloriesBurned: 0,
    distanceWalked: 0,
    shoppingDuration: 0
  });
  const [sessions, setSessions] = useState<ShoppingSession[]>([]);
  const startTimeRef = useRef<Date | null>(null);
  const initialStepsRef = useRef<number>(0);

  // Simulate step counting (in real app, this would use device sensors)
  useEffect(() => {
    if (!isTracking) return;

    const interval = setInterval(() => {
      setCurrentMetrics(prev => {
        const newSteps = prev.steps + Math.floor(Math.random() * 3); // Simulate steps
        const duration = startTimeRef.current 
          ? Math.floor((Date.now() - startTimeRef.current.getTime()) / 60000)
          : 0;
        
        return {
          ...prev,
          steps: newSteps,
          caloriesBurned: Math.floor(newSteps * 0.04), // Rough calorie calculation
          distanceWalked: Math.floor(newSteps * 0.7), // Rough distance in meters
          shoppingDuration: duration
        };
      });
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, [isTracking]);

  const startTracking = (listId: string) => {
    setIsTracking(true);
    startTimeRef.current = new Date();
    initialStepsRef.current = currentMetrics.steps;
    
    // Reset metrics for new session
    setCurrentMetrics({
      steps: 0,
      caloriesBurned: 0,
      distanceWalked: 0,
      shoppingDuration: 0
    });
  };

  const stopTracking = (listId: string, itemsCompleted: number, totalItems: number) => {
    if (!startTimeRef.current) return;

    setIsTracking(false);
    
    const session: ShoppingSession = {
      id: Date.now().toString(),
      listId,
      startTime: startTimeRef.current,
      endTime: new Date(),
      healthMetrics: currentMetrics,
      itemsCompleted,
      totalItems,
      efficiency: Math.round((itemsCompleted / totalItems) * 100),
      route: [] // Would be populated with actual route data
    };

    setSessions(prev => [session, ...prev]);
    return session;
  };

  const getWeeklyStats = () => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    
    const weekSessions = sessions.filter(s => s.startTime >= weekAgo);
    
    return {
      totalSessions: weekSessions.length,
      totalSteps: weekSessions.reduce((sum, s) => sum + s.healthMetrics.steps, 0),
      totalCalories: weekSessions.reduce((sum, s) => sum + s.healthMetrics.caloriesBurned, 0),
      averageEfficiency: weekSessions.length > 0 
        ? Math.round(weekSessions.reduce((sum, s) => sum + s.efficiency, 0) / weekSessions.length)
        : 0
    };
  };

  return {
    isTracking,
    currentMetrics,
    sessions,
    startTracking,
    stopTracking,
    getWeeklyStats
  };
};
