import Dashboard from "../Components/Dashboard/Dashboard";
import "../Components/Dashboard/Dashboard.css";
import { useSettings } from "../Contexts/SettingsContext";
import { useMemo } from "react";

// function DashboardPage() {
//   return <Dashboard />
// }
// export default DashboardPage


export default function DashboardPage() {
  const { sessions, dailyGoal } = useSettings();


  // This tells React: "Recalculate this EVERY time 'sessions' or 'dailyGoal' changes"
  const stats = useMemo(() => {
    // Get today's date in YYYY-MM-DD format
    const todayStr = new Date().toISOString().split('T')[0];
    const todaySessions = sessions?.filter(s => s.date === todayStr) || [];
    
    //total minutes worked today
    const minutes = todaySessions.reduce((totalsum, currentSession) => totalsum + (Number(currentSession.duration) || 0), 0);
    

    //Average Energy Level calculation: Only include sessions that have a valid energy level greater than 0
    const sessionsWithEnergy = todaySessions.filter(s => 
      s.energyLevel !== undefined && 
    s.energyLevel !== null && 
    Number(s.energyLevel) > 0
    );
    const totalEnergy = sessionsWithEnergy.reduce((sum, s) => sum + s.energyLevel, 0);

    // Avoid division by zero. if no sessions have energy, return 0
    const avgEnergy = sessionsWithEnergy.length > 0 
      ? (totalEnergy / sessionsWithEnergy.length).toFixed(1) 
      : "0.0";

      const goal = Number(dailyGoal) || 240;
    const progress = Math.min((minutes / goal) * 100, 100);

    return { minutes, goal, progress, count: todaySessions.length, avgEnergy };
  }, [sessions, dailyGoal]);

  //PASS THE DATA TO THE COMPONENT
  return (
    <Dashboard 
      totalMinutes={stats.minutes} 
      goal={stats.goal} 
      progress={stats.progress} 
      sessionCount={stats.count}
      averageEnergy={stats.avgEnergy}
    />
  );
}
