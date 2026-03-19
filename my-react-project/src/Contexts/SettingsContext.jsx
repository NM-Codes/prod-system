import React from "react"
import { createContext, useContext, useState, useEffect } from "react"


const SettingContext = createContext();

export function SettingProvider({ children }) {
  //Time And Calender
  const [timeFormat, setTimeFormat] = useState(() => {
    return localStorage.getItem("timeFormat") || "24h";
  });
  const [weekStart, setWeekStart] = useState(() => {
    return localStorage.getItem("weekStart") || "Måndag";
  });
  //Notification
  const [notifications, setNotifications] = useState(()=>{
    const saved = localStorage.getItem("notifications");
    return saved ? JSON.parse(saved) : { push: true, sound: true, volume: 50 };
  });
  //Productivity
  const [dailyGoal, setDailyGoal] = useState(() => {
    const savedGoal = localStorage.getItem("dailyGoal");
    return savedGoal ? JSON.parse(savedGoal) : 240;
  });
  //productivitet
  const [energyLogging, setEnergyLogging] = useState(() => {
    const savedEnergy = localStorage.getItem("energyLogging");
    return savedEnergy !== null ? JSON.parse(savedEnergy) : true;
  });
  const [autoSave, setAutoSave] = useState(() => {
    const saved = localStorage.getItem("autoSave");
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [sessions, setSessions] = useState(() => {
    const saved = localStorage.getItem("sessions");
    return saved ? JSON.parse(saved) : [];
  });

  //Save all changes button 
  const [saveChange, setSaveChange] = useState(false);

  //Data Management
  const getInitialSettings = () => {
    const saved = localStorage.getItem("appSettings");
    return saved ? JSON.parse(saved) : null;
  };

  // const initial = getInitialSettings();

  

  useEffect(() => {
    localStorage.setItem("timeFormat", timeFormat);
    localStorage.setItem("weekStart", weekStart);
    localStorage.setItem("notifications", JSON.stringify(notifications));
    localStorage.setItem("sessions", JSON.stringify(sessions));
    localStorage.setItem("dailyGoal", JSON.stringify(dailyGoal));
    localStorage.setItem("energyLogging", JSON.stringify(energyLogging));
    localStorage.setItem("autoSave", JSON.stringify(autoSave));
    if (autoSave) {
      const settingsObj = {
        timeFormat,
        weekStart,
        notifications,
        dailyGoal,
        energyLogging,
        autoSave
      };
      localStorage.setItem("appSettings", JSON.stringify(settingsObj));
    }

  }, [timeFormat, weekStart, notifications, sessions, dailyGoal, energyLogging, autoSave]);

  // Helper to update specific keys
  const updateNotify = (key, value) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };
const clearAllData = () => {
  if (window.confirm("Är du säker? Detta raderar alla inställningar och sessioner.")) {
    // Reset States to defaults
    setSessions([]);
    setDailyGoal(240);
    setEnergyLogging(true);
    setTimeFormat("24h");
    // Clear LocalStorage
    localStorage.clear();
  }
};

  return (
    <SettingContext.Provider value={{
      timeFormat, setTimeFormat,
      weekStart, setWeekStart, 
      notifications, setNotifications, updateNotify, 
      dailyGoal, setDailyGoal, 
      energyLogging, setEnergyLogging, 
      autoSave, setAutoSave, 
      saveChange, setSaveChange, 
      sessions, setSessions, clearAllData
    }}>
      {children}
    </SettingContext.Provider>
  );
}

export const useSettings = () => useContext(SettingContext);