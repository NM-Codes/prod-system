import { useState } from "react";
import HistoryList from "./HistoryList";
import HistoryFilter from "./HistoryFilter"; 
import HistoryEmptyState from "./EmptyHistoryState";
import './History.css';

/**
 * Renderar historiksidan och hanterar filtrering av arbetspass.
 * @component
 * @param {Object} props
 * @param {Array<Object>} props.sessions - En lista med session-objekt från databasen/state.
 * @param {Function} props.onEdit - Funktion som anropas när en användare vill ändra en session.
 * @param {Function} props.onDelete - Funktion som tar ett ID för att radera en session.
 */

function History({ sessions, onEdit, onDelete }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Alla lägen");

  const hasNoSessionsAtAll = !sessions || sessions.length === 0;

  {/* FILTRERINGSLOGIK: Använder startsWith för att starta filtreringen exakt vid första bokstaven */}
  const filteredSessions = (sessions || []).filter(s => {
    const search = searchTerm.toLowerCase().trim();
    
    // 1. Vi hämtar kategorin (från både focusMode eller category för att vara säkra)
    const sessionCat = (s.focusMode || s.category || "Övrigt").toLowerCase();
    
    // 2. Vi gör även dropdown-valet till små bokstäver för jämförelsen
    const selectedCat = selectedCategory.toLowerCase();

    // Sök-matchning
    const matchesSearch = search === "" || sessionCat.startsWith(search);
    
    // Kategori-matchning (Dropdown)
    // Vi kollar om "Alla lägen" är valt, annars jämför vi "small" mot "small"
    const matchesCategory = selectedCategory === "Alla lägen" || sessionCat === selectedCat;

    return matchesSearch && matchesCategory;
  });

  {/* Trigga "Inga resultat"-rutan direkt vid första bokstaven om ingen match finns*/}
  const isSearching = searchTerm.trim().length > 0 || selectedCategory !== "Alla lägen";
  const hasNoFilterResults = isSearching && filteredSessions.length === 0;

  return (
    <section className="history-page">
      <h1>Historik</h1>
      <p>Se och hantera dina tidigare sessioner</p>

      <HistoryFilter 
        searchTerm={searchTerm} 
        onSearchChange={setSearchTerm} 
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* Denna komponent hanterar nu hasNoSessionsAtAll och hasNoFilterResults */}
      <HistoryEmptyState 
        hasNoSessionsAtAll={hasNoSessionsAtAll} 
        hasNoFilterResults={hasNoFilterResults} 
      />

      {/* Listan visas endast om det finns sessioner och filter-matchningar */}
      {!hasNoSessionsAtAll && !hasNoFilterResults && (
        <HistoryList
          sessions={filteredSessions}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
    </section>
  );
}

export default History;