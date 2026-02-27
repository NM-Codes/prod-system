import { useState } from "react";
import EnergyLogger from "../EnergyLogger/EnergyLogger";
//Import the useSetting hook
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

    onSave({
      id: crypto.randomUUID(),
      title,
      category,
      sessionType,
      date,
      startTime,
      endTime,
      energyLevel,
      //Save the time in the format the user prefers
      startTime: formatDisplay(startTime),
      endTime: formatDisplay(endTime),
    });
  }

  return (
    <div className="worksession-container">
      <h2>Ny arbetssession</h2>

      <EnergyLogger onLevelSelect={setEnergyLevel} />

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
        
        {/* IMPORTANT: value must stay in 24h (HH:mm:ss) for HTML inputs to work */}
        <input type="time" step="1" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
        <input type="time" step="1" value={endTime} onChange={(e) => setEndTime(e.target.value)} />

        <button type="submit">Spara session</button>
      </form>
    </div>
  );
}
