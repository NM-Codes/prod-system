import { useState } from 'react';
import './SettingsTimer.css';

export default function SettingsTimer({ onSave, initialFocusOptions = null }) {
  
  const defaultPresets = [
    { label: 'Deep Work', emoji: '🎯', minutes: 90, color: '#FF9B49' },
    { label: 'Möte',      emoji: '👥', minutes: 30, color: '#2A7FFF' },
    { label: 'Paus',      emoji: '☕', minutes: 15, color: '#6DD18C' },
    { label: 'Övrigt',    emoji: '📝', minutes: 60, color: '#9096A3' },
  ];


  
  const [focusOptions, setFocusOptions] = useState(initialFocusOptions ?? defaultPresets);
  const [selectedFocusLabel, setSelectedFocusLabel] = useState(null); 
  const [showDropdown, setShowDropdown] = useState(false);

  /* GEMENSAMMA TIDSALTERNATIV */
  const commonDurations = [15, 20, 25, 30, 45, 50, 60, 90, 120];

  /* VÄLJ KORT */
  const handleSelectFocus = (label) => setSelectedFocusLabel(label);

  /* ÄNDRA MINUTER PÅ ETT KORT */
  const handleMinutesChange = (label, minutes) => {
    setFocusOptions(prev =>
      prev.map(f => f.label === label ? { ...f, minutes } : f)
    );
  };

  /* Spara alla ändringar */
  const handleSaveAll = () => {
    if (typeof onSave === 'function') {
      onSave(focusOptions);
    }
    setShowDropdown(false);
  };

  /* Avbryt */
  const handleCancel = () => {
    setShowDropdown(false);
  };

  return (
    <div className="settings-timer-wrapper">
      {/* Knapp för att öppna inställningar */}
      <button
        className="settings-btn"
        onClick={() => setShowDropdown(!showDropdown)}
        aria-label="Öppna timerinställningar"
        aria-expanded={showDropdown}
      >
        ⚙️ Timer-inställningar
      </button>

      {showDropdown && (
        <div className="settings-dropdown">
          <h4>Anpassa timer-varaktigheter</h4>

          <div className="focus-presets">
            {focusOptions.map(preset => {
              const isActive = selectedFocusLabel === preset.label;
              return (
                <div
                  key={preset.label}
                  className={`focus-group ${isActive ? 'active' : ''}`}
                  style={{ '--accent': preset.color }}
                >
                  <button
                    className="focus-title"
                    onClick={() => handleSelectFocus(preset.label)}
                  >
                    <span className="emoji">{preset.emoji}</span>
                    <span className="name">{preset.label}</span>
                    <span className="default-time">{preset.minutes} min</span>
                  </button>

                  {/* Om kortet är valt visas alternativ för minuter */}
                  {isActive && (
                    <div className="duration-grid">
                      {commonDurations.map(min => (
                        <button
                          key={min}
                          className={`duration-chip ${preset.minutes === min ? 'selected' : ''}`}
                          onClick={() => handleMinutesChange(preset.label, min)}
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