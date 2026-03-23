import Card from '../Cards/Cards';
import { LuBrain } from "react-icons/lu";
import { FaFireFlameCurved } from "react-icons/fa6";

const AnalysisInsights = ({ stats, isDark }) => {
  return (
    <div className='insight-wrapper'>
      <Card style={{ 
        background: isDark ? 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)' : '#f8fafc', 
        border: isDark ? '1px solid rgba(99, 102, 241, 0.2)' : '1px solid #e2e8f0' 
      }}>
        <div className='insight-wrapper-content'>
          <div className='insight-header'>
            <LuBrain size={30}/>
            <h2>Insikter</h2>
          </div>
          <ul className='insights-list'>
            <li>Din mest produktiva tid är <strong>{stats.peakTime}</strong></li>
            <li>Du arbetar bäst på <strong>{stats.bestDay}dagar</strong></li>
            <li>Din genomsnittliga energinivå är <strong>{stats.avgEnergy}/5</strong></li>
            <li className='insight-list-text-icon'>
              Fortsätt så! Bra jobbat med dina {stats.totalSessions} sessioner! 
              <FaFireFlameCurved size={20} style={{color:"purple"}}/>
            </li>
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default AnalysisInsights;