import { useState } from "react";
import Timer from "../Timer/Timer";
import EnergyLogger from "../EnergyLogger/EnergyLogger";
import { useSettings } from "../../Contexts/SettingsContext";
import Card from "../Cards/Cards";
import SettingsTimer from "./SettingsTimer";
import Pomodoro from "../Pomodoro/Pomodoro";
import PomodoroSettings from "../Pomodoro/PomodoroSettings";
import './WorkSession.css';


export default function WorkSession({ initialSession, onSave, navigate }) {

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [focusMode, setFocusMode] = useState('');
  const [focusEmoji, setFocusEmoji] = useState('');
  const [focusMinutes, setFocusMinutes] = useState(null);
  const [energyLevel, setEnergyLevel] = useState(undefined);
  const [mode, setMode] = useState('normal'); // 'normal' eller 'pomodoro'
  const [timerControl, setTimerControl] = useState(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [sessionType, setSessionType] = useState("Deep work");


  // Access the timeFormat
  const { timeFormat } = useSettings();

  //Acess the EnergyLogging
  const { energyLogging } = useSettings();

  // Initieras från Timer om data finns
  const [date, setDate] = useState(initialSession?.date ?? "");
  const [startTime, setStartTime] = useState(initialSession?.startTime ?? "");
  const [endTime, setEndTime] = useState(initialSession?.endTime ?? "");


  //toggle 12-hours and 24-hours
  const formatDisplay = (timeInput) => {
    if (!timeInput) return "--:--";
    const date = new Date(timeInput);
    if (timeFormat === '24h') {
      return date.toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' });
    } else {
      const h = date.getHours();
      const m = date.getMinutes().toString().padStart(2, '0');
      const period = h < 12 ? 'FM' : 'EM';
      const displayH = h % 12 || 12;
      return `${displayH}:${m} ${period}`;
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


  const [focusOptions, setFocusOptions] = useState([
    { label: 'Deep Work', emoji: '🎯', minutes: 90, color: '#FF9B49' },
    { label: 'Möte', emoji: '👥', minutes: 30, color: '#2A7FFF' },
    { label: 'Paus', emoji: '☕', minutes: 15, color: '#6DD18C' },
    { label: 'Övrigt', emoji: '📝', minutes: 60, color: '#9096A3' },
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
      energyLevel: energyLogging ? (energyLevel ?? 3) : null, // I changed it becuse I dont want to show 3 in history page if energy logging is turn off
      durationMinutes,
      startTime: new Date(startTimestamp).toISOString(),
      endTime: new Date(endTimestamp).toISOString(),
      createdAt: new Date().toISOString(),
    };

    if (typeof onSave === 'function') {
      onSave(session);
    }

    // Omdirigera till History sidan
    if (typeof navigate === 'function') {
      navigate("/history");
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
    // If energyLogging is true, check if energyLevel is set. 
    // If energyLogging is false, ignore the energyLevel check.
    (energyLogging ? energyLevel !== undefined : true);


  //difference between two time strings
  const calculateMinutes = (start, end) => {
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
    const existingSessions = JSON.parse(localStorage.getItem("sessions") || "[]");
    const updatedSessions = [...existingSessions, newSession];
    localStorage.setItem("sessions", JSON.stringify(updatedSessions));
  };



  return (

    <div className="session-start-container">
      <h1 className="main-title">Timer</h1>
      <p className="subtitle">Starta ditt arbetspass och spåra din tid</p>

      {/* Normal Timer - 3 separata cards */}
      {mode === 'normal' && (
        <>
          {/* Card 1: Timer-väljare */}
          <Card className="card-wrapper">
            <div className="timer-content">
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

          {/* Card 2: Välj fokusläge */}
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

          {/* Card 3: Timer + formulär */}
          <Card className="card-wrapper timer">
            {/* NEW: Time Status Bar */}
            <div className="session-time-status">
              <div className="time-block">
                <span>Startar:</span>
                <strong>{formatDisplay(startTime || new Date())}</strong>
              </div>
              {/* <div className="time-block">
                <span>Slutar:</span>
                <strong>{endTime ? formatDisplay(endTime) : "--:--"}</strong>
              </div> */}
            </div>

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

              {/* just when energy logging is turn on in setting page, show this part */}
              {energyLogging && (
                <div className="energy-logger-container">
                  <EnergyLogger onLevelSelect={setEnergyLevel} />
                </div>
              )}            
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
                    onClick={() => {
                      setTimerControl("stop");
                    }}
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
                    onClick={() => {
                      setTimerControl("stop");
                    }}
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
                {/* If energylogging is on in setting, show it here*/}
                {energyLogging && energyLevel === undefined && "Välj energinivå."} 
              </p>
            )}
          </Card>
        </>
      )}
      {/* Pomodoro Timer - 3 separata cards */}
      {mode === 'pomodoro' && (
        <>
          {/* Card 1: Timer-väljare */}
          <Card className="card-wrapper">
            <div className="timer-content">
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

          {/* Card 2: Tomt (fas-väljaren finns i Pomodoro-komponenten) */}

          {/* Pomodoro-komponenten direkt, utan extra card */}
          <Pomodoro navigate={navigate} />
        </>
      )}
    </div>

  );
}
