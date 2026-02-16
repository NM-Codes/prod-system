import { useState } from "react";
import EnergyLogger from "../EnergyLogger/EnergyLogger";
import './WorkSession.css';

/*
  WorkSession
  ------------
  Formulär för att skapa EN session
  - Kan komma från Timer (auto-fylld tid)
  - Kan användas manuellt (failsafe)
*/

export default function WorkSessionForm({ onStart }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [focusMode, setFocusMode] = useState('');
  const [energyLevel, setEnergyLevel] = useState();
  

  const focusOptions = [
    { label: 'Deep Work', emoji: '🎯', minutes: 90 },
    { label: 'Möte',      emoji: '👥', minutes: 30 },
    { label: 'Paus',      emoji: '☕', minutes: 15 },
    { label: 'Övrigt',    emoji: '📝', minutes: 60 },
  ];

  //fixa så att numret i energyEmojis matchar energyLevel så att det blir lättare att välja rätt emoji//
  const energyEmojis = ['😴 1', '😪 2', '😐 3', '🙂 4', '🚀 5'];


  

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedFocus = focusOptions.find(f => f.label === focusMode);

    const session = {
      id: crypto.randomUUID(),
      title: title.trim() || 'Session utan titel',
      category: category.trim() || 'Övrigt',
      focusMode,
      energyLevel,
      durationMinutes: selectedFocus?.minutes || 60,
      startTime: new Date().toISOString(),
    };

    onStart(session);

    // Återställning av formuläret
    setTitle('');
    setCategory('');
    setFocusMode('');
    setEnergyLevel();
  };

  return (
    <div className="session-start-container">
      <form className="session-form" onSubmit={handleSubmit}>
        {/* Titel */}
        <div className="form-group">
          <label htmlFor="title">Titel</label>
          <input
            id="title"
            type="text"
            placeholder="Vad arbetar du med?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-input"
          />
        </div>

        {/* Kategori */}
        <div className="form-group">
          <label htmlFor="category">Kategori</label>
          <input
            id="category"
            type="text"
            placeholder="T.ex. Projekt, Studier, Möte"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="text-input"
          />
        </div>

        {/* Fokuslägen */}
        <div className="form-group">
          <label>Välj fokusläge</label>
          <div className="focus-mode-buttons">
            {focusOptions.map((option) => (
              <button
                key={option.label}
                type="button"
                className={`focus-btn ${focusMode === option.label ? 'selected' : ''}`}
                onClick={() => setFocusMode(option.label)}
              >
                <span className="emoji">{option.emoji}</span>
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Energinivå */}
        <div className="form-group energy-group">
          <label>Energinivå</label>
          <div className="energy-levels">
            {energyEmojis.map((emoji, index) => {
              const level = index + 1;
              return (
                <button
                  key={level}
                  type="button"
                  className={`energy-btn ${energyLevel === level ? 'selected' : ''}`}
                  onClick={() => setEnergyLevel(level)}
                  title={`Nivå ${level}`}
                >
                  {emoji}
                </button>
              );
            })}
          </div>
          <div className="energy-labels">
            <span>Mycket låg</span>
            <span>Mycket hög</span>
          </div>
        </div>

        {/* Start-knapp */}
        <button type="submit" className="start-button">
          ▶ Starta
        </button>
      </form>
    </div>
  );
}