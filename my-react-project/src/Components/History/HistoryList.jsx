import { useState } from "react";
import './HistoryList.css';
import Card from "../Cards/Cards";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { GoClock } from "react-icons/go"; // ÄNDRAT
import { useSettings } from "../../Contexts/SettingsContext.jsx"; //ÄNDRAT

function HistoryList({ sessions, onEdit, onDelete }) {
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState(null);
  const { timeFormat } = useSettings(); // ÄNDRAT

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

  const getCategoryIcon = (category) => {
    const normalized = (category || "").toLowerCase().trim();
    switch (normalized) {
      case 'deep work': return '🎯'; 
      case 'möte': return '👥';      
      case 'paus': return '☕';     
      case 'övrigt': return '📝';   
      default: return '📍';
    }
  };

  return (
    <div className="history-list-wrapper">
      {editingId && (
        <div className="edit-section-container">
          <Card>
            <div className="edit-form-content">
              <h3>Redigera session</h3>
              <div className="edit-field">
                <label>Titel</label>
                <input 
                  type="text"
                  value={draft.title} 
                  onChange={e => setDraft({ ...draft, title: e.target.value })} 
                />
              </div>
              <div className="edit-field">
                <label>Kategori</label>
                <input 
                  type="text"
                  value={draft.category || ""} 
                  onChange={e => setDraft({ ...draft, category: e.target.value })} 
                />
              </div>
              <div className="edit-buttons">
                <button className="btn-save" onClick={saveEdit}>Spara</button>
                <button className="btn-cancel" onClick={() => setEditingId(null)}>Avbryt</button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {sortedDates.map(date => (
        <div key={date} className="history-date-group">
          <h3 className="history-date-group-header">
            {date === "Okänt datum" ? date : new Date(date).toLocaleDateString('sv-SE', { day: 'numeric', month: 'long', year: 'numeric' })}
          </h3>
          {groupedSessions[date].map(s => (
            <div key={s.id} className={editingId === s.id ? "active-edit-highlight" : "session-card-wrapper"}>
              <Card>
                <div className="history-card-inner">
                  <div className="history-card-icon">
                    {getCategoryIcon(s.focusMode || s.category)}
                  </div>
                  
                  <div className="history-card-info">
                    <div className="history-card-header">
                      <div className="history-card-title-row">
                        <strong>{s.title || 'Session utan titel'}</strong>
                        <span className="history-category-badge">
                          {s.focusMode || s.category || 'Övrigt'}
                        </span>
                      </div>
                      <div className="history-card-subcategory">{s.category || "Ingen kategori"}</div>
                    </div>
                    
                    <div className="history-card-details">
                      <span>{new Date(s.startTime || s.date).toLocaleDateString('sv-SE', { day: 'numeric', month: 'short', year: 'numeric' })}</span> {/* ÄNDRAT */}
                      <span className="dot-separator">•</span>
                      <span className="session-time-display">
                        <GoClock size={14} />
                        {new Date(s.startTime || s.date).toLocaleTimeString('sv-SE', { 
                          hour: '2-digit', 
                          minute: '2-digit', 
                          hour12: timeFormat === "12h" 
                        })}
                      </span>
                      <span className="dot-separator">•</span>
                      <span>{s.durationMinutes || 0}m</span>
                      
                      
                      <span className="dot-separator">•</span>
                      <span className="energy-status">
                        Energi: {s.energyLevel || s.energy}
                      </span>
                    </div>
                  </div>

                  <div className="history-actions-icons">
                    <button onClick={() => startEdit(s)}><MdEdit /></button>
                    <button onClick={() => onDelete(s.id)}><RiDeleteBin5Line style={{ color: "#ff4d4d" }} /></button>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default HistoryList;