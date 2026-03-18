import { useState } from "react";
import HistoryList from "./HistoryList";
import HistoryFilter from "./HistoryFilter"; 
import './History.css';
import Card from "../Cards/Cards";

function History({ sessions, onEdit, onDelete }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Alla lägen");

  const hasNoSessionsAtAll = !sessions || sessions.length === 0;

  {/* FILTRERINGSLOGIK: Använder startsWith för att starta filtreringen exakt vid första bokstaven */}
  const filteredSessions = (sessions || []).filter(s => {
    const search = searchTerm.toLowerCase().trim();
    const focusMode = (s.focusMode || "").toLowerCase();

    
   {/* Matchar om ordet BÖRJAR på det du skriver (t.ex. Ö matchar Övrigt men inte Möte) */}
    const matchesSearch = search === "" || focusMode.startsWith(search);
    
    const matchesCategory = selectedCategory === "Alla lägen" || 
                            s.focusMode === selectedCategory;

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

      {hasNoSessionsAtAll ? (
        <div className="wrapper-empty-history-content">
          <Card>
            <div className="empty-history-content">
              <p>Inga sessioner ännu.</p>
              <span>Starta din första timer!</span>
            </div>
          </Card>
        </div>
      ) : hasNoFilterResults ? (
        <div className="wrapper-empty-history-content">
          <Card>
            <div className="empty-history-content">
              <p>Inga sessioner matchar din sökning</p>
            </div>
          </Card>
        </div>
      ) : (
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