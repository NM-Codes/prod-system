import { useState } from "react";
import EnergyLogger from "../EnergyLogger/EnergyLogger";

/*
  WorkSession
  ------------
  Formulär för att skapa EN session
  - Kan komma från Timer (auto-fylld tid)
  - Kan användas manuellt (failsafe)
*/

export default function WorkSession({ initialSession, onSave }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Välj kategori");
  const [sessionType, setSessionType] = useState("Deep work");

  // Initieras från Timer om data finns
  const [date, setDate] = useState(initialSession?.date ?? "");
  const [startTime, setStartTime] = useState(initialSession?.startTime ?? "");
  const [endTime, setEndTime] = useState(initialSession?.endTime ?? "");
  const [energyLevel, setEnergyLevel] = useState(0);

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

        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <input type="time" step="1" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
        <input type="time" step="1" value={endTime} onChange={(e) => setEndTime(e.target.value)} />

        <button type="submit">Spara session</button>
      </form>
    </div>
  );
}
