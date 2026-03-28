import './HistoryFilter.css';
import { GoSearch } from "react-icons/go";
import { FiFilter } from "react-icons/fi";
import { useTheme } from '../../Contexts/ThemeContext';

/**
 * Komponent för sökning och filtrering av historiklistan.
 * @component
 * @param {Object} props
 * @param {string} props.searchTerm - Den aktuella söksträngen.
 * @param {Function} props.onSearchChange - Callback när söksträngen ändras.
 * @param {string} props.selectedCategory - Den valda kategorin från dropdown-menyn.
 * @param {Function} props.onCategoryChange - Callback när en ny kategori väljs.
 */

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