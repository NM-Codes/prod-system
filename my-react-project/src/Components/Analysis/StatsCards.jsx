import Card from '../Cards/Cards';
import { LuCalendarDays } from "react-icons/lu";
import { FiClock, FiTrendingUp } from "react-icons/fi";
import { BiStats } from "react-icons/bi";

/**
 * Renderar fyra mindre informationskort med nyckeltal.
 * @component
 * @param {Object} props
 * @param {Object} props.stats - Innehåller bestDay, peakTime, avgSession och totalHours.
 */

const StatsCards = ({ stats }) => {
  return (
    <div className='analsysis-small-cards-stats'>
      <Card>
        <div className='small-card-inner-content'>
          <div className='small-card-header'>
            <div className="icon-box blue"><LuCalendarDays/></div>
            <h2>Mest produktiv</h2>
          </div>
          <p className='small-card-value'>{stats.bestDay}</p>
          <p className='small-card-label'>Veckodag</p>
        </div>
      </Card> 
      
      <Card>
        <div className='small-card-inner-content'>
          <div className='small-card-header'>
            <div className="icon-box green"><FiClock /></div>
            <h2>Peak-tid</h2>
          </div>
          <p className='small-card-value'>{stats.peakTime}</p>
          <p className='small-card-label'>Flest sessioner</p>
        </div>
      </Card> 
      
      <Card>
        <div className='small-card-inner-content'>
          <div className='small-card-header'>
            <div className="icon-box purple"><BiStats /></div>
            <h2>Snitt session</h2>
          </div>
          <p className='small-card-value'>{stats.avgSession}m</p>
          <p className='small-card-label'>Per pass</p>
        </div>
      </Card> 
      
      <Card>
        <div className='small-card-inner-content'>
          <div className='small-card-header'>
            <div className="icon-box orange"><FiTrendingUp /></div>
            <h2>Total tid</h2>
          </div>
          <p className='small-card-value'>{stats.totalHours}h</p>
          <p className='small-card-label'>Loggad tid</p>
        </div>
      </Card> 
    </div>
  );
};

export default StatsCards;