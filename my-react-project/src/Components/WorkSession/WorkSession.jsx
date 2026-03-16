import { useState } from "react";
import EnergyLogger from "../EnergyLogger/EnergyLogger";
import { useSettings } from "../../Contexts/SettingsContext";

/*
  WorkSession
  ------------
  Formulär för att skapa EN session
  - Kan komma från Timer (auto-fylld tid)
  - Kan användas manuellt (failsafe)
*/

export default function WorkSession({ initialSession, onSave }) {
  // Access the timeFormat
  const { timeFormat } = useSettings();
  const {energyLogging} = useSettings();


  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Välj kategori");
  const [sessionType, setSessionType] = useState("Deep work");

  // Initieras från Timer om data finns
  const [date, setDate] = useState(initialSession?.date ?? "");
  const [startTime, setStartTime] = useState(initialSession?.startTime ?? "");
  const [endTime, setEndTime] = useState(initialSession?.endTime ?? "");
  const [energyLevel, setEnergyLevel] = useState(0);

  //toggle 12-hours and 24-hours
  const formatDisplay = (timeStr) => {
    if (!timeStr) return "--:--";
    try {
      const [hours, minutes] = timeStr.split(':');
      const d = new Date();
      d.setHours(parseInt(hours, 10));
      d.setMinutes(parseInt(minutes, 10));
      d.setSeconds(0);
      
      return d.toLocaleTimeString('sv-SE', { 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: timeFormat === '12h' 
      });
    } catch (e) {
      return timeStr; // Fallback if string is messy
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    // Calculate duration of the session in minutes
    const duration = calculateMinutes(startTime, endTime);
    const finalSession = {
      id: crypto.randomUUID(),
      title,
      category,
      sessionType,
      date: date || new Date().toISOString().split('T')[0],
      // Only save energy level if logging is enabled in settings
      energyLevel: energyLogging ? energyLevel : null,
      duration,
      //Save the time in the format the user prefers
      startTime: formatDisplay(startTime),
      endTime: formatDisplay(endTime),
    }
    onSave(finalSession);
  }

  //difference between two time strings
  const calculateMinutes = (start , end) =>{
    if (!start || !end) return 0;
    const startPair = start.split(':').map(Number);
    const endPair = end.split(':').map(Number);

    const startSeconds = (startPair[0] * 3600) + (startPair[1] * 60) + (startPair[2] || 0);
    const endSeconds = (endPair[0] * 3600) + (endPair[1] * 60) + (endPair[2] || 0);

    //if end time is after midnight, add 24 hours to it
    let diffSeconds = endSeconds - startSeconds;
  
  // Handle midnight crossover
  if (diffSeconds < 0) diffSeconds += 86400; 

  // Convert to minutes with one decimal place (e.g., 1.3 minutes)
  // Or use Math.round() if you prefer whole numbers
  const totalMinutes = diffSeconds / 60;
  
  return parseFloat(totalMinutes.toFixed(1));
    
  }

  //Data manager for energy logs, only used if energy logging is enabled in settings
  const handleSaveSession = (newSession) => {
  const existingSessions = JSON.parse(localStorage.getItem("workSessions") || "[]");
    const updatedSessions = [...existingSessions, newSession];
    localStorage.setItem("workSessions", JSON.stringify(updatedSessions));
};

  

  return (
    <div className="worksession-container">
      <h2>Ny arbetssession</h2>
      {/* Only show energy logger if the setting is enabled */}
      {energyLogging && <EnergyLogger onLevelSelect={setEnergyLevel} />}

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Titel"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option disabled>Välj kategori</option>
          <option>Arbete</option>
          <option>Personligt</option>
          <option>Lärande</option>
          <option>Övrigt</option>
        </select>

        <select value={sessionType} onChange={(e) => setSessionType(e.target.value)}>
          <option>🎯 Deep Work</option>
          <option>👥 Möte</option>
          <option>📋 Planering</option>
          <option>📚 Lärande</option>
          <option>☕ Paus</option>
          <option>📌 Övrigt</option>
        </select>
        
        <p>Vald tid: {formatDisplay(startTime)}  - {formatDisplay(endTime)}</p> 
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        {/* value must stay in 24h (HH:mm:ss) for HTML inputs to work */}
        <input type="time" step="1" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
        <input type="time" step="1" value={endTime} onChange={(e) => setEndTime(e.target.value)} />

       
        <button type="submit">Spara session</button>
      </form>
    </div>
  );
}
