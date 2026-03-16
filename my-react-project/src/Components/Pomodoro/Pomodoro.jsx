import { useState, useEffect, useRef, useCallback } from "react";
import "./Pomodoro.css";
import Card from "../Cards/Cards";
import PomodoroSettings from "./PomodoroSettings";

function Pomodoro({ navigate }) {
  const [mode, setMode] = useState('pomodoro');
  const [selectedPhase, setSelectedPhase] = useState('work'); // work, shortBreak, longBreak
  const [workMinutes, setWorkMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [longBreakMinutes, setLongBreakMinutes] = useState(15);
  const [sessions, setSessions] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentPhase, setCurrentPhase] = useState("work"); // work, break, longBreak
  const [timeLeft, setTimeLeft] = useState(workMinutes * 60);

  // Hantera val av fas (fokus, kort paus, lång paus)
  const handlePhaseSelect = (phase) => {
    if (!isRunning) {
      setSelectedPhase(phase);
      setCurrentPhase(phase);
      
      // Sätt rätt tid baserat på vald fas
      switch(phase) {
        case 'work':
          setTimeLeft(workMinutes * 60);
          break;
        case 'shortBreak':
          setTimeLeft(breakMinutes * 60);
          break;
        case 'longBreak':
          setTimeLeft(longBreakMinutes * 60);
          break;
      }
    }
  };

  // Pomodoro fas-options
  const phaseOptions = [
    { 
      label: 'Fokus', 
      emoji: '🎯', 
      minutes: workMinutes, 
      color: '#FF6B6B',
      phase: 'work'
    },
    { 
      label: 'Kort paus', 
      emoji: '☕', 
      minutes: breakMinutes, 
      color: '#4ECDC4',
      phase: 'shortBreak'
    },
    { 
      label: 'Lång paus', 
      emoji: '🌴', 
      minutes: longBreakMinutes, 
      color: '#45B7D1',
      phase: 'longBreak'
    },
  ];

  // Hantera inställningar från PomodoroSettings
  const handleSettingsSave = (settings) => {
    setWorkMinutes(settings.workMinutes);
    setBreakMinutes(settings.breakMinutes);
    setLongBreakMinutes(settings.longBreakMinutes);
    
    // Uppdatera timeLeft om vi är i work-phase och timern inte körs
    if (currentPhase === "work" && !isRunning) {
      setTimeLeft(settings.workMinutes * 60);
    }
  };

  const intervalRef = useRef(null);

  const handlePhaseComplete = useCallback(() => {
    // Spela ljud eller notifikation här
    setIsRunning(false);
    setIsPaused(false);

    // Byt till nästa fas
    if (currentPhase === "work") {
      setSessions(prev => prev + 1);
      if ((sessions + 1) % 4 === 0) {
        // Var fjärde session = lång paus
        setCurrentPhase("longBreak");
        setTimeLeft(longBreakMinutes * 60);
      } else {
        setCurrentPhase("break");
        setTimeLeft(breakMinutes * 60);
      }
    } else {
      // Gå tillbaka till arbete
      setCurrentPhase("work");
      setTimeLeft(workMinutes * 60);
    }
  }, [currentPhase, sessions, workMinutes, breakMinutes, longBreakMinutes]);

  // Timer-logik
  useEffect(() => {
    if (isRunning && !isPaused) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Timer färdig - byt fas
            handlePhaseComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, isPaused, handlePhaseComplete]);

  const handleStart = () => {
    setIsRunning(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsPaused(false);
  };

  const handleStop = () => {
    setIsRunning(false);
    setIsPaused(false);
    setCurrentPhase("work");
    setTimeLeft(workMinutes * 60);
    setSessions(0);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const getPhaseColor = () => {
    switch (currentPhase) {
      case "work":
        return "#FF6B6B";
      case "shortBreak":
      case "break":
        return "#4ECDC4";
      case "longBreak":
        return "#45B7D1";
      default:
        return "#FF6B6B";
    }
  };

  const getPhaseText = () => {
    switch (currentPhase) {
      case "work":
        return `${workMinutes} min fokus`;
      case "shortBreak":
      case "break":
        return `${breakMinutes} min paus`;
      case "longBreak":
        return `${longBreakMinutes} min lång paus`;
      default:
        return `${workMinutes} min fokus`;
    }
  };

  return (
    <div className="session-start-container">
      <h1 className="main-title">Timer</h1>
      <p className="subtitle">Välj timer-läge och spåra din tid</p>

      {/* Timerläge Card - Identisk med WorkSession */}
      <Card className="card-wrapper">
        <div className="timer-content">
          <div className="modes">
            <button
              className={`mode-btn ${mode === 'normal' ? 'selected' : ''}`}
              onClick={() => navigate && navigate("Timer")}
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

      {/* Pomodoro Faser Card - Istället för "välj fokusläge" */}
      <Card className="card-wrapper focus">
        <div className={`timer-content ${isRunning ? 'locked' : ''}`}>
          <div className="focus-header">
            <h3>Välj Pomodoro-fas</h3>
          </div>
        <div className="timer-content">
          <PomodoroSettings
            onSave={handleSettingsSave}
            workMinutes={workMinutes}
            breakMinutes={breakMinutes}
            longBreakMinutes={longBreakMinutes}
          />
        </div>

          <div className="focus-mode-buttons">
            {phaseOptions.map((option) => (
              <button
                key={option.phase}
                className={`focus-btn ${selectedPhase === option.phase ? 'selected' : ''}`}
                onClick={() => handlePhaseSelect(option.phase)}
                disabled={isRunning}
              >
                <span className="emoji">{option.emoji}</span>
                <span className="label">{option.label}</span>
                <span className="minutes">{option.minutes} min</span>
              </button>
            ))}
          </div>
        </div>
      </Card>

    
      {/* Timer Ring Card */}
      <Card className="card-wrapper timer">
        <div className="timer-display">
          <div 
            className="timer-circle"
            style={{ borderColor: getPhaseColor() }}
          >
            <div className="timer-time">{formatTime(timeLeft)}</div>
            <div className="timer-phase-text">{getPhaseText()}</div>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="control-buttons">
          {!isRunning && !isPaused && (
            <button className="btn-start" onClick={handleStart}>
              ▶ Starta
            </button>
          )}
          
          {isRunning && (
            <button className="btn-pause" onClick={handlePause}>
              ⏸ Paus
            </button>
          )}
          
          {isPaused && (
            <button className="btn-resume" onClick={handleResume}>
              ▶ Fortsätt
            </button>
          )}
          
          {(isRunning || isPaused) && (
            <button className="btn-stop" onClick={handleStop}>
              ⏹ Stopp
            </button>
          )}
        </div>

      </Card>
    </div>
  );
}

export default Pomodoro;
