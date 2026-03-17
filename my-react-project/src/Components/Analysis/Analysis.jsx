import  { useState } from 'react';
import './Analysis.css';
import Card from '../Cards/Cards';
import { useTheme } from '../../Contexts/ThemeContext';
import { PiWarningCircle } from "react-icons/pi";
import { PiMedal } from "react-icons/pi";
import { FaFireFlameCurved } from "react-icons/fa6";
import { BsLightningCharge } from "react-icons/bs";
import { LuCalendarDays } from "react-icons/lu";
import { FiClock } from "react-icons/fi";
import { BiStats } from "react-icons/bi";
import { FiTrendingUp } from "react-icons/fi";



const Analysis = ({ sessions }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark'
  const [activeFilter, setActiveFilter] = useState('7 dagar');

  // MOCKDATA: Vi skapar en fejkad session så att hasNoSessions blir false
  const mockSessions = [{ id: 1, duration: 25, type: 'Deep Work' }];

  // Logik för att kontrollera om data saknas vi provar med mockdata
  const hasNoSessions = !mockSessions || mockSessions.length === 0;



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
          {/* HÄR BÖRJAR LAYOUTEN FÖR NÄR DATA FINNS DET STORA PRODUKTIVITETSKORTET */}
            <Card style={{
            background: isDark ? 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)' : '#f5f3ff',
            border: isDark ? 'none' : '1px solid #ddd6fe',
            padding: '30px',
            marginBottom: '20px'
          }}>
             <div className='productivity-card-layout'>
             <div className={`productivity-card-scorecircle ${theme}`}>
                <p className='score-number' style={{ color: isDark ? 'white' : '#4c1d95', margin: 0 }}>18</p>
                <p className='score-label' style={{ color: isDark ? 'white' : '#7c3aed', margin: 0 }}>Poäng</p>
                <PiMedal size={30} style={{color:"gold"}}/>
            </div>

            <div className='productivity-card-text'>
                <h2 style={{ color: isDark ? 'white' : '#2e1065', margin:"0" }}>Produktivitetspoäng</h2>
                <p style={{ color: isDark ? 'rgba(255,255,255,0.7)' : '#5b21b6', margin: '5px 0 20px' }}>
                  Baserat på konsistens, energi och tid
                </p>

            <div className='score-features'>
                <span className='features-label-shortnote'>
                <FaFireFlameCurved size={20} style={{color:"purple"}}/>
                1 dagars streak
                </span>
                 <span className='features-label-shortnote'>
                <BsLightningCharge size={20} style={{color:"gold"}}/>
                3.0 snitt energi
                </span>

            </div>
        </div>
        </div>

          </Card>


          {/* HÄR BÖRJAR LAYOUTEN FÖR DE FYRA KORTEN UNDER PRODUKTIVITETSKORTET */}

          <div className='analsysis-small-cards-stats'>
           <Card>
                <div className='small-card-inner-content'>
                    <div className='small-card-header'>
                        <div className="icon-box blue">
                        <LuCalendarDays/>
                        </div>
                        <h2>Mest produktiv</h2>
                    </div>
                    <p className='small-card-value'>Måndag</p>
                    <p className='small-card-label'>Veckodag</p>
                </div>
           </Card> 

            <Card>
                <div className='small-card-inner-content'>
                    <div className='small-card-header'>
                        <div className="icon-box green">
                        <FiClock />
                        </div>
                        <h2>Peak-tid</h2>
                    </div>
                    <p className='small-card-value'>23.00-24.00</p>
                    <p className='small-card-label'>Flest sessioner</p>
                </div>
           </Card> 

            <Card>
                <div className='small-card-inner-content'>
                    <div className='small-card-header'>
                        <div className="icon-box purple">
                        <BiStats />
                        </div>
                        <h2>Snitt session</h2>
                    </div>
                    <p className='small-card-value'>0m</p>
                    <p className='small-card-label'>Per pass</p>
                </div>
           </Card> 

            <Card>
                <div className='small-card-inner-content'>
                    <div className='small-card-header'>
                        <div className="icon-box orange">
                        <FiTrendingUp />
                        </div>
                        <h2>Streak</h2>
                    </div>
                    <p className='small-card-value'>1 dagar</p>
                    <p className='small-card-label'>I rad</p>
                </div>
           </Card> 



          </div>


          
        </div>
      )}
    </div>
  );
};

export default Analysis;