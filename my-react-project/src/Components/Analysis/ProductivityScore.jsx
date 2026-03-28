import Card from '../Cards/Cards';
import { PiMedal } from "react-icons/pi";
import { FaFireFlameCurved } from "react-icons/fa6";
import { BsLightningCharge } from "react-icons/bs";

/**
 * Visar användarens totala produktivitetspoäng i en cirkulär design.
 * @component
 * @param {Object} props
 * @param {Object} props.stats - Innehåller prodScore, totalSessions och avgEnergy.
 * @param {string} props.theme - Nuvarande tema (light/dark).
 * @param {boolean} props.isDark - För villkorlig styling av textfärger.
 */

const ProductivityScore = ({ stats, theme, isDark }) => {
  return (
    <Card style={{
      background: isDark ? 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)' : '#f5f3ff',
      border: isDark ? 'none' : '1px solid #ddd6fe',
      padding: '30px',
      marginBottom: '20px'
    }}>
      <div className='productivity-card-layout'>
        <div className={`productivity-card-scorecircle ${theme}`}>
          <p className='score-number' style={{ color: isDark ? 'white' : '#4c1d95', margin: 0 }}>{stats.prodScore}</p>
          <p className='score-label' style={{ color: isDark ? 'white' : '#7c3aed', margin: 0 }}>Poäng</p>
          <PiMedal size={30} style={{color:"gold"}}/>
        </div>
        <div className='productivity-card-text'>
          <h2 style={{ color: isDark ? 'white' : '#2e1065', margin:"0" }}>Produktivitetspoäng</h2>
          <p style={{ color: isDark ? 'rgba(255,255,255,0.7)' : '#5b21b6', margin: '5px 0 20px' }}>Baserat på konsistens, energi och tid</p>
          <div className='score-features'>
            <span className='features-label-shortnote'>
              <FaFireFlameCurved size={20} style={{color:"purple", marginRight: '5px'}}/>
              {stats.totalSessions} pass
            </span>
            <span className='features-label-shortnote'>
              <BsLightningCharge size={20} style={{color:"gold", marginRight: '5px'}}/>
              {stats.avgEnergy} snitt energi
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProductivityScore;