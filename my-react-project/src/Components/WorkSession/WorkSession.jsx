import { useState } from "react";
import EnergyLogger from "../EnergyLogger/EnergyLogger";
//Import the useSetting hook
import { useSettings } from "../../Contexts/SettingsContext";
import './WorkSession.css';

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

  const focusOptions = [
    { label: 'Deep Work', emoji: '🎯', minutes: 90 },
    { label: 'Möte',      emoji: '👥', minutes: 30 },
    { label: 'Paus',      emoji: '☕', minutes: 15 },
    { label: 'Övrigt',    emoji: '📝', minutes: 60 },
  ];

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

    const selectedFocus = focusOptions.find(f => f.label === focusMode);

    const session = {
      id: crypto.randomUUID(),
      title: title.trim() || 'Session utan titel',
      category: category.trim() || 'Övrigt',
      focusMode,
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