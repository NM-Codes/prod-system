import { useState } from "react";
import Timer from "../Timer/Timer";
import EnergyLogger from "../EnergyLogger/EnergyLogger";
import Card from "../Cards/Cards";
import SettingsTimer from "./SettingsTimer";
import './WorkSession.css';


export default function WorkSession({ onSave }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [focusMode, setFocusMode] = useState('');
  const [focusEmoji, setFocusEmoji] = useState('');
  const [focusMinutes, setFocusMinutes] = useState(null);
  const [energyLevel, setEnergyLevel] = useState(undefined);
  const [mode, setMode] = useState('normal');
  const [timerControl, setTimerControl] = useState(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const [focusOptions, setFocusOptions] = useState([
    { label: 'Deep Work', emoji: '🎯', minutes: 90, color:'#FF9B49' },
    { label: 'Möte', emoji: '👥', minutes: 30, color:'#2A7FFF' },
    { label: 'Paus', emoji: '☕', minutes: 15, color:'#6DD18C' },
    { label: 'Övrigt', emoji: '📝', minutes: 60,color:'#9096A3'},
  ]);

  // När SettingsTimer sparar alla kort
  const handleSettingsSave = (updatedFocusOptions) => {
    setFocusOptions(updatedFocusOptions);

    // Om användaren redan har valt ett fokusläge, uppdatera tiden
    if (focusMode) {
      const selected = updatedFocusOptions.find(opt => opt.label === focusMode);
      if (selected) setFocusMinutes(selected.minutes);
    }
  };

  // När timern stoppas
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
    setIsTimerRunning(false);
    setIsPaused(false);
    setTimerControl(null);
  };

  // Kontrollera om formuläret är komplett
  const isFormValid =
    title.trim() !== "" &&
    focusMode !== "" &&
    energyLevel !== undefined;

  return (
    <div className="session-start-container">
      <h1 className="main-title">Timer</h1>
      <p className="subtitle">Starta ditt arbetspass och spåra din tid</p>

      {/* Timerläge */}
      <Card className="card-wrapper">
        <div className={`timer-content ${isTimerRunning ? 'locked' : ''}`}>
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
        </div>
      </Card>

      {/* Fokusläge + Settings */}
      <Card className="card-wrapper focus">
        <div className={`timer-content ${isTimerRunning ? 'locked' : ''}`}>
          <div className="focus-header">
            <h3>Välj fokusläge</h3>
            <SettingsTimer
              onSave={handleSettingsSave}
              initialFocusOptions={focusOptions}
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
        </div>
      </Card>

      {/* Timer + formulär */}
      <Card className="card-wrapper timer">
        <Timer
  focusMinutes={focusMinutes}
  onStart={() => setIsTimerRunning(true)}
  onStop={(data) => {
    handleTimerComplete(data);
    setIsTimerRunning(false);
    setIsPaused(false);
    setTimerControl(null);
  }}
  control={timerControl}
/>

    {/* Visuell indikation på vald fokusläge */}
        {isTimerRunning && focusMode && (
          <div className="timer-overlay">
            <div className="running-indicator">
              {focusEmoji} {focusMode} - ⏱️ {focusMinutes} min
            </div>
          </div>
        )}
        <div className={`timer-content ${isTimerRunning ? 'locked' : ''}`}>
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
        </div>

        {/* Start / Paus / Fortsätt / Stop */}
        <div className="timer-buttons-bottom">
          {!isTimerRunning && !isPaused && isFormValid && (
            <button
              className="startBtn"
              disabled={!isFormValid}
              onClick={() => {
                setTimerControl("start");
                setIsTimerRunning(true);
              }}
            >
              ▶ Start
            </button>
          )}

          {isTimerRunning && (
            <>
              <button
                className="pauseBtn"
                onClick={() => {
                  setTimerControl("pause");
                  setIsTimerRunning(false);
                  setIsPaused(true);
                }}
              >
                ⏸ Paus
              </button>

              <button
                className="stopBtn"
                onClick={() =>
                  handleTimerComplete({
                    startTimestamp: Date.now() - 1000,
                    endTimestamp: Date.now(),
                  })
                }
              >
                ⏹ Stopp & Spara
              </button>
            </>
          )}

          {isPaused && (
            <>
              <button
                className="resumeBtn"
                onClick={() => {
                  setTimerControl("resume");
                  setIsTimerRunning(true);
                  setIsPaused(false);
                }}
              >
                ▶ Fortsätt
              </button>

              <button
                className="stopBtn"
                onClick={() =>
                  handleTimerComplete({
                    startTimestamp: Date.now() - 1000,
                    endTimestamp: Date.now(),
                  })
                }
              >
                ⏹ Stopp & Spara
              </button>
            </>
          )}
        </div>

        {/* Tooltip om formulär ej klart */}
        {!isFormValid && (
          <p className="form-tooltip">
            {focusMode === "" && "Välj fokusläge! "} <br />
            {title.trim() === "" && "Ange en titel. "} <br />
            {energyLevel === undefined && "Välj energinivå."}
          </p>
        )}
      </Card>
    </div>
  );
}