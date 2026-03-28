import { useState } from "react";
import './HistoryList.css';
import { useSettings } from "../../Contexts/SettingsContext.jsx"; 
import HistoryEditForm from "./HistoryEditForm";
import HistoryCard from "./HistoryCard";

/**
 * Grupperar och renderar sessioner baserat på datum.
 * Hanterar lokalt tillstånd för vilken session som redigeras.
 * @component
 * @param {Object} props
 * @param {Array<Object>} props.sessions - Lista med filtrerade arbetspass som ska visas.
 * @param {Function} props.onEdit - Funktion för att spara uppdaterad sessionsdata.
 * @param {Function} props.onDelete - Funktion för att radera en session via dess ID.
 */

function HistoryList({ sessions, onEdit, onDelete }) {
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState(null);
  const { timeFormat } = useSettings(); 

  // Gruppera sessioner efter datum
  const groupedSessions = sessions.reduce((groups, session) => {
    const rawDate = session.date || session.startTime || session.createdAt || "";
    let dateKey = "Okänt datum";
    if (rawDate && typeof rawDate === 'string' && rawDate.length >= 10) {
      dateKey = rawDate.substring(0, 10);
    }
    if (!groups[dateKey]) groups[dateKey] = [];
    groups[dateKey].push(session);
    return groups;
  }, {});

  const sortedDates = Object.keys(groupedSessions).sort().reverse();

  function startEdit(session) {
    setEditingId(session.id);
    setDraft({ ...session });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function saveEdit() {
    onEdit(draft.id, draft);
    setEditingId(null);
  }

  return (
    <div className="history-list-wrapper">
      {/* Redigeringsformulär (visas bara vid behov) */}
      {editingId && (
        <HistoryEditForm 
          draft={draft}
          setDraft={setDraft}
          onSave={saveEdit}
          onCancel={() => setEditingId(null)}
        />
      )}

      {/* Listan grupperad per datum */}
      {sortedDates.map(date => (
        <div key={date} className="history-date-group">
          <h3 className="history-date-group-header">
            {date === "Okänt datum" ? date : new Date(date).toLocaleDateString('sv-SE', { day: 'numeric', month: 'long', year: 'numeric' })}
          </h3>
          
          {groupedSessions[date].map(s => (
            <HistoryCard 
              key={s.id}
              s={s}
              editingId={editingId}
              timeFormat={timeFormat}
              onEdit={startEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default HistoryList;