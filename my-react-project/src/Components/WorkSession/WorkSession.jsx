import { useState } from "react";
import Timer from "../Timer/Timer";
import EnergyLogger from "../EnergyLogger/EnergyLogger";
import './WorkSession.css';
import Card from "../Cards/Cards";
import SettingsTimer from "./SettingsTimer";
import './SettingsTimer.css';

export default function WorkSession({ onSave }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [focusMode, setFocusMode] = useState('');
  const [_focusEmoji, setFocusEmoji] = useState('');          
  const [focusMinutes, setFocusMinutes] = useState(null);     
  const [energyLevel, setEnergyLevel] = useState(undefined);
  const [mode, setMode] = useState('normal');

  const [focusOptions, setFocusOptions] = useState ([
    { label: 'Deep Work', emoji: '🎯', minutes: 90 },
    { label: 'Möte',      emoji: '👥', minutes: 30 },
    { label: 'Paus',      emoji: '☕', minutes: 15 },
    { label: 'Övrigt',    emoji: '📝', minutes: 60 },
  ]);

  const handleSettingsSave = (preset) => {
    setFocusMode(preset.label);
    setFocusEmoji(preset.emoji);          
    setFocusMinutes(preset.minutes);   
    
    setFocusOptions(prev =>
    prev.map(opt =>
      opt.label === preset.label
        ? { ...opt, minutes: preset.minutes }
        : opt
    )
  );
  };

  const handleTimerComplete = ({ startTimestamp, endTimestamp }) => {
    if (!startTimestamp || !endTimestamp) return;

    const durationMs = endTimestamp - startTimestamp;
    const durationMinutes = Math.round(durationMs / 60000);

    const session = {
      id: crypto.randomUUID(),
      title: title.trim() || 'Session utan titel',
      category: category.trim() || 'Övrigt',
      focusMode: focusMode || 'Övrigt',
      energyLevel: energyLevel ?? 3,
      durationMinutes,
      startTime: new Date(startTimestamp).toISOString(),
      endTime: new Date(endTimestamp).toISOString(),
      createdAt: new Date().toISOString(),
    };

    if (typeof onSave === 'function') {
      onSave(session);
    }

    // Återställ allt
    setTitle('');
    setCategory('');
    setFocusMode('');
    setFocusEmoji('');
    setFocusMinutes(null);
    setEnergyLevel(undefined);
  };

  return (
    <div className="session-start-container">
      <h1 className="main-title">Timer</h1>
      <p className="subtitle">Starta ditt arbetspass och spåra din tid</p>

      <Card>
        <div className="modes">
          <button
            className={`mode-btn ${mode === 'normal' ? 'selected' : ''}`}
            onClick={() => setMode('normal')}
          >
            <span className="mode-title">Normal Timer</span>
            <span className="sub-title">Flexibel tidsspårning</span>
          </button>

          <button
            className={`mode-btn ${mode === 'pomodoro' ? 'selected' : ''}`}
            onClick={() => setMode('pomodoro')}
          >
            <span className="mode-title">Pomodoro Timer</span>
            <span className="sub-title">Fokus + pauser</span>
          </button>
        </div>
      </Card>

      <Card className="focus">
        <div className="focus-header">
          <h3>Välj fokusläge</h3>

          <SettingsTimer
            onSave={handleSettingsSave}
            initialFocus={focusMode}
            initialMinutes={focusMinutes}        
          />
        </div>

        <div className="focus-mode-buttons">
          {focusOptions.map((option) => (
            <button
              key={option.label}
              className={`focus-btn ${focusMode === option.label ? 'selected' : ''}`}
              onClick={() => {
                setFocusMode(option.label);
                setFocusEmoji(option.emoji);         
                setFocusMinutes(option.minutes);     
              }}
            >
              <span className="emoji">{option.emoji}</span>
              <span className="label">{option.label}</span>
              <span className="minutes">{option.minutes} min</span>
            </button>
          ))}
        </div>
      </Card>

      <Card className="timer">
        <Timer
          onStop={handleTimerComplete}
          // durationMinutes={focusMinutes}   // aktivera när Timer är redo för countdown
        />

        {/* Titel, kategori, energi, hint */}
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

        <EnergyLogger onLevelSelect={setEnergyLevel} />

        <p className="hint-text" style={{ marginTop: '1.5rem', color: '#6b7280', textAlign: 'center' }}>
          Tryck Start i timern för att börja — Stop för att spara sessionen
        </p>
      </Card>
    </div>
  );
}