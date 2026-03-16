import { useState } from 'react';
import '../WorkSession/SettingsTimer.css';

export default function PomodoroSettings({ onSave, workMinutes = 25, breakMinutes = 5, longBreakMinutes = 15 }) {
  
  const [focusTime, setFocusTime] = useState(workMinutes);
  const [shortBreak, setShortBreak] = useState(breakMinutes);
  const [longBreak, setLongBreak] = useState(longBreakMinutes);
  const [selectedPreset, setSelectedPreset] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  /* POMODORO PRESETS */
  const pomodoroPresets = [
    { 
      label: 'Fokustid', 
      emoji: '🎯', 
      minutes: workMinutes, 
      color: '#FF6B6B',
      type: 'focus'
    },
    { 
      label: 'Kort paus', 
      emoji: '☕', 
      minutes: breakMinutes, 
      color: '#4ECDC4',
      type: 'shortBreak'
    },
    { 
      label: 'Lång paus', 
      emoji: '🌴', 
      minutes: longBreakMinutes, 
      color: '#45B7D1',
      type: 'longBreak'
    },
  ];

  /* TIDSALTERNATIV FÖR VARJE TYP */
  const focusDurations = [15, 20, 25, 30, 35, 40, 45, 50, 60, 90];
  const shortBreakDurations = [ 5, 10, 15, 20, 25];
  const longBreakDurations = [30, 40, 45, 50, 60];

  /* VÄLJ PRESET */
  const handleSelectPreset = (type) => setSelectedPreset(type);

  /* ÄNDRA MINUTER */
  const handleMinutesChange = (type, minutes) => {
    switch(type) {
      case 'focus':
        setFocusTime(minutes);
        break;
      case 'shortBreak':
        setShortBreak(minutes);
        break;
      case 'longBreak':
        setLongBreak(minutes);
        break;
    }
  };

  /* SÄTTER RÄTTA DURATIONER */
  const getDurationsForType = (type) => {
    switch(type) {
      case 'focus': return focusDurations;
      case 'shortBreak': return shortBreakDurations;
      case 'longBreak': return longBreakDurations;
      default: return [];
    }
  };

  /* HÄMTA AKTUELLA MINUTER */
  const getCurrentMinutes = (type) => {
    switch(type) {
      case 'focus': return focusTime;
      case 'shortBreak': return shortBreak;
      case 'longBreak': return longBreak;
      default: return 25;
    }
  };

  /* UPPDATERA PRESETS MED NYA VÄRDEN */
  const getUpdatedPresets = () => {
    return pomodoroPresets.map(preset => ({
      ...preset,
      minutes: getCurrentMinutes(preset.type)
    }));
  };

  /* SPARA ALLA ÄNDRINGAR */
  const handleSaveAll = () => {
    if (typeof onSave === 'function') {
      onSave({
        workMinutes: focusTime,
        breakMinutes: shortBreak,
        longBreakMinutes: longBreak
      });
    }
    setShowDropdown(false);
    setSelectedPreset(null);
  };

  /* AVBRYT */
  const handleCancel = () => {
    setShowDropdown(false);
    setSelectedPreset(null);
  };

  return (
    <div className="settings-timer-wrapper">
      {/* Knapp för att öppna inställningar */}
      <button
        className="settings-btn"
        onClick={() => setShowDropdown(!showDropdown)}
        aria-label="Öppna pomodoro-inställningar"
        aria-expanded={showDropdown}
      >
        ⚙️ Pomodoro-inställningar
      </button>

      {showDropdown && (
        <div className="settings-dropdown">
          <h4>Anpassa Pomodoro-varaktigheter</h4>

          <div className="focus-presets">
            {getUpdatedPresets().map(preset => {
              const isActive = selectedPreset === preset.type;
              return (
                <div
                  key={preset.type}
                  className={`focus-group ${isActive ? 'active' : ''}`}
                  style={{ '--accent': preset.color }}
                >
                  <button
                    className="focus-title"
                    onClick={() => handleSelectPreset(preset.type)}
                  >
                    <span className="emoji">{preset.emoji}</span>
                    <span className="name">{preset.label}</span>
                    <span className="default-time">{preset.minutes} min</span>
                  </button>

                  {/* Om kortet är valt visas alternativ för minuter */}
                  {isActive && (
                    <div className="duration-grid">
                      {getDurationsForType(preset.type).map(min => (
                        <button
                          key={min}
                          className={`duration-chip ${preset.minutes === min ? 'selected' : ''}`}
                          onClick={() => handleMinutesChange(preset.type, min)}
                        >
                          {min} 
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Spara / Avbryt */}
          <div className="actions">
            <button className="btn-save" onClick={handleSaveAll}>Spara</button>
            <button className="btn-cancel" onClick={handleCancel}>Avbryt</button>
          </div>
        </div>
      )}
    </div>
  );
}
