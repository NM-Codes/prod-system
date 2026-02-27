import React from "react"
import { createContext, useContext, useState, useEffect, useMemo } from "react"


const SettingContext = createContext();

export function SettingProvider({children}){
//Time And Calender
const [timeFormat , setTimeFormat] = useState(() => {
    return localStorage.getItem("timeFormat") || "24h";
  });
const [weekStart, setWeekStart] = useState(() => {
    return localStorage.getItem("weekStart") || "Måndag";
  });
//Notification
const [notifications, setNotifications] = useState({
    push: true,
    sound: true,
    volume: 50
  });
//Productivity
const [dailyGoal, setDailyGoal] = useState(240);
const [energyLogging, setEnergyLogging] = useState(true);
const [autoSave, setAutoSave] = useState(true);

//Save all changes button 
const [saveChange, setSaveChange] = useState(false);

useEffect(() => {
    localStorage.setItem("timeFormat", timeFormat);
    localStorage.setItem("weekStart", weekStart);
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [timeFormat, weekStart, notifications]);

  // Helper to update specific keys
  const updateNotify = (key, value) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };


return (
    <SettingContext.Provider value={{ timeFormat, setTimeFormat, weekStart, setWeekStart, notifications, setNotifications, updateNotify, dailyGoal, 
    setDailyGoal,energyLogging, setEnergyLogging, energyLogging, setEnergyLogging, autoSave, setAutoSave, saveChange, setSaveChange }}>
      {children}
    </SettingContext.Provider>
  );
}

export const useSettings = () => useContext(SettingContext);