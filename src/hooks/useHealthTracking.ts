
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
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Realistic step counting simulation
  useEffect(() => {
    if (!isTracking || !startTimeRef.current) return;

    intervalRef.current = setInterval(() => {
      setCurrentMetrics(prev => {
        const duration = Math.floor((Date.now() - startTimeRef.current!.getTime()) / 60000);
        
        // More realistic step increment (2-6 steps every 3 seconds while shopping)
        const stepIncrement = Math.floor(Math.random() * 5) + 2;
        const newSteps = prev.steps + stepIncrement;
        
        // Realistic calorie burn (approximately 0.04 calories per step)
        const caloriesBurned = Math.floor(newSteps * 0.04);
        
        // Distance calculation (average step = 0.762 meters)
        const distanceWalked = Math.floor(newSteps * 0.762);
        
        return {
          steps: newSteps,
          caloriesBurned,
          distanceWalked,
          shoppingDuration: duration
        };
      });
    }, 3000); // Update every 3 seconds for more realistic tracking

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isTracking]);

  const startTracking = (listId: string) => {
    setIsTracking(true);
    startTimeRef.current = new Date();
    
    // Reset metrics for new session
    setCurrentMetrics({
      steps: 0,
      caloriesBurned: 0,
      distanceWalked: 0,
      shoppingDuration: 0
    });
  };

  const stopTracking = (listId: string, itemsCompleted: number, totalItems: number) => {
    if (!startTimeRef.current) return null;

    setIsTracking(false);
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    const session: ShoppingSession = {
      id: Date.now().toString(),
      listId,
      startTime: startTimeRef.current,
      endTime: new Date(),
      healthMetrics: { ...currentMetrics },
      itemsCompleted,
      totalItems,
      efficiency: totalItems > 0 ? Math.round((itemsCompleted / totalItems) * 100) : 0,
      route: []
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
