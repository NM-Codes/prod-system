import { useState } from 'react';
import './SettingsTimer.css';

export default function SettingsTimer({ onSave, initialMinutes = null }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedFocus, setSelectedFocus] = useState(null);
  const [selectedMinutes, setSelectedMinutes] = useState(initialMinutes);

  const focusPresets = [
    { label: 'Deep Work', emoji: '🎯', defaultMinutes: 90, color: '#FF9B49' },
    { label: 'Möte',      emoji: '👥', defaultMinutes: 15, color: '#2A7FFF' },
    { label: 'Paus',      emoji: '☕', defaultMinutes: 15, color: '#6DD18C' },
    { label: 'Övrigt',     emoji: '📝', defaultMinutes: 60, color: '#9096A3' },
  ];

  const commonDurations = [15, 20, 25, 30, 45, 50, 60, 90, 120];
  
  

 
  const handleSelectFocus = (preset) => {
    setSelectedFocus(preset);
    setSelectedMinutes(preset.defaultMinutes);
  };

  const handleSave = () => {
    if (!selectedFocus || !selectedMinutes) return;
    
    onSave({
      label: selectedFocus.label,
      emoji: selectedFocus.emoji,
      minutes: selectedMinutes
    });
    
    setShowDropdown(false);
  };

  const handleCancel = () => {
    setShowDropdown(false);
    setSelectedFocus(null);
    setSelectedMinutes(null);
  };

  return (
    <div className="settings-timer-wrapper">
      <button 
        className="settings-btn"
        onClick={() => setShowDropdown(!showDropdown)}
        aria-label="Öppna timerinställningar"
        aria-expanded={showDropdown}
      >
      <span className='gear-icon'>⚙️</span>
      <span className='gear-text'>Timer-inställningar</span>
      </button>

      {showDropdown && (
        <div className="settings-dropdown">
          <div className="dropdown-header">
            <h4>Anpassa timer-varaktigheter</h4>
            
          </div>

          <div className="focus-presets">
            {focusPresets.map(preset => {
              const isActive = selectedFocus?.label === preset.label;
              return (
                <div 
                  key={preset.label}
                  className={`focus-group ${isActive ? 'active' : ''}`}
                  style={{ '--accent': preset.color }}
                >
                  <button
                    className="focus-title"
                    onClick={() => handleSelectFocus(preset)}
                  >
                    <span className="emoji">{preset.emoji}</span>
                    <span className="name">{preset.label}</span>
                    <span className="default-time">{preset.defaultMinutes} min</span>
                  </button>

                  {isActive && (
                    <div className="duration-grid">
                      {commonDurations.map(min => (
                        <button
                          key={min}
                          className={`duration-chip 
                            ${selectedMinutes === min ? 'selected' : ''} 
                            ${min === preset.defaultMinutes ? 'recommended' : ''}`}
                          onClick={() => setSelectedMinutes(min)}
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

          <div className="actions">
            <button 
              className="btn-save"
              disabled={!selectedFocus || !selectedMinutes}
              onClick={handleSave}
            >
              Spara
            </button>
            <button className="btn-cancel" onClick={handleCancel}>
              Avbryt
            </button>
          </div>
        </div>
      )}
    </div>
  );
}