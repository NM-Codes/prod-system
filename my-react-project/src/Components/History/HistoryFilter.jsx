import './HistoryFilter.css';
import { GoSearch } from "react-icons/go";
import { FiFilter } from "react-icons/fi";
import { useTheme } from '../../Contexts/ThemeContext';

const HistoryFilter = ({ searchTerm, onSearchChange, selectedCategory, onCategoryChange }) => {
  const { theme } = useTheme();

  return (
    <div className={`search-filter-wrapper ${theme}`}>
      <div className="history-filter-container">
        <div className="search-group">
          <span className="search-icon"><GoSearch /></span>
          <input 
            type="text" 
            placeholder="Sök på fokusläge..." 
            className="search-input"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <div className="v-divider"></div>
          <span className="filter-icon"><FiFilter/></span>
          <select 
            className="filter-select"
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            <option value="Alla lägen">Alla lägen</option>
            <option value="Deep work">Deep work</option>
            <option value="Möte">Möte</option>
            <option value="Paus">Paus</option>
            <option value="Övrigt">Övrigt</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default HistoryFilter;