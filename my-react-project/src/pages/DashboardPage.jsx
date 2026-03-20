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


  const stats = useMemo(() => {
  const now = new Date();
  const todayStr = now.toLocaleDateString('sv-SE');
  const todaySessions = sessions?.filter(s => s.date === todayStr) || [];
  // Total minutes worked today
  const minutes = todaySessions.reduce((sum, s) => sum + (Number(s.duration) || 0), 0);
  //  Map helper
  const getEnergyValue = (val) => {
    const map = { "😴": 1, "🥱": 2, "😐": 3, "😊": 4, "🚀": 5 };
    return map[val] || Number(val) || 0;
  };
  // Filter sessions that HAVE any energy data (number or emoji)
  const sessionsWithEnergy = todaySessions.filter(s => 
    s.energyLevel !== undefined && 
    s.energyLevel !== null &&
    s.energyLevel !== "" // Ensure it's not an empty string
  );
  // Calculate total energy using the mapper
  const totalEnergy = sessionsWithEnergy.reduce((sum, s) => 
    sum + getEnergyValue(s.energyLevel), 0
  );
  // Final Average
  const avgEnergy = sessionsWithEnergy.length > 0
    ? (totalEnergy / sessionsWithEnergy.length).toFixed(1)
    : "0.0";
  const goal = Number(dailyGoal) || 240;
  const progress = Math.min((minutes / goal) * 100, 100);

  const day = now.getDay(); // 0 is Sunday, 1 is Monday...
  const diffToMonday = day === 0 ? 6 : day - 1;
  const monday = new Date(now);
  monday.setDate(now.getDate() - diffToMonday);
  monday.setHours(0, 0, 0, 0); // Start of Monday
  // 2. Filter sessions that happened from Monday until now
  const weeklySessions = sessions?.filter(s => {
    const sessionDate = new Date(s.date || s.createdAt);
    return sessionDate >= monday && sessionDate <= now;
  }) || [];

  // 3. Sum up the duration of these weekly sessions
  const weeklyMinutes = weeklySessions.reduce((sum, s) => 
    sum + (Number(s.duration) || 0), 0
  );
  return { minutes, goal, progress, count: todaySessions.length, avgEnergy, weeklyMinutes };
}, [sessions, dailyGoal]);



  //PASS THE DATA TO THE COMPONENT
  return (
    <Dashboard
      totalMinutes={stats.minutes}
      weeklyMinutes={stats.weeklyMinutes}
      goal={stats.goal}
      progress={stats.progress}
      sessionCount={stats.count}
      averageEnergy={stats.avgEnergy}
    />
  );
}
