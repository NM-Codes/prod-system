import './HistoryFilter.css';
import { GoSearch } from "react-icons/go";
import { FiFilter } from "react-icons/fi";
import { useTheme } from '../../Contexts/ThemeContext'; // Vi använder samma context som Card

const HistoryFilter = () => {
  const { theme } = useTheme();

  // Vi använder exakt samma logik/namngivning som i Cards.jsx
  // Om theme är 'light' får den mörk styling, annars ljus (enligt er nuvarande logik)
  const filterTheme = theme === 'light' ? 'filter-dark' : 'filter-light';

  return (
    <div className={`search-filter-wrapper ${theme}`}>
      <div className="history-filter-container">
        {/* Sök-delen */}
        <div className="search-group">
          <span className="search-icon"><GoSearch /></span>
          <input 
            type="text" 
            placeholder="Sök på titel eller kategori..." 
            className="search-input"
          />
        </div>

        {/* Filter-delen */}
        <div className="filter-group">
          <div className="v-divider"></div>
          <span className="filter-icon"><FiFilter/></span>
          <select className="filter-select">
            <option>Alla lägen</option>
            <option>Deep work</option>
            <option>Möte</option>
            <option>Paus</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default HistoryFilter;