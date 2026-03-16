import  { useState } from 'react';
import './Analysis.css';
import Card from '../Cards/Cards';
import { useTheme } from '../../Contexts/ThemeContext';
import { PiWarningCircle } from "react-icons/pi";


const Analysis = ({ sessions }) => {
  const { theme } = useTheme();
  const [activeFilter, setActiveFilter] = useState('7 dagar');

  // Logik för att kontrollera om data saknas
  const hasNoSessions = !sessions || sessions.length === 0;

  return (
    <div className="analysis-container">
      <div className="analysis-header">
        <div className="title-section">
          <h1>Analys</h1>
          <p>Djupgående insikter om dina arbetsmönster</p>
        </div>
        
        <div className={`filter-group ${theme}`}>
          {['7 dagar', '30 dagar', 'Allt'].map((f) => (
            <button 
              key={f} 
              className={`filter-btn ${activeFilter === f ? 'active' : ''}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* 2. VILLKORLIG RENDERING */}
      {hasNoSessions ? (
        <div>
          <Card>
            <div className="empty-content-analysis">
                <PiWarningCircle size={60}/>
              <h2>Ingen data tillgänglig</h2>
              <p>Börja logga dina sessioner för att se analys och insikter här.</p>
            </div>
          </Card>
        </div>
      ) : (
        <div>
          {/* HÄR BÖRJAR LAYOUTEN FÖR NÄR DATA FINNS */}
          
        </div>
      )}
    </div>
  );
};

export default Analysis;