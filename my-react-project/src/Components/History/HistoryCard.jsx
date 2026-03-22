import Card from "../Cards/Cards";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { GoClock } from "react-icons/go";

const HistoryCard = ({ s, editingId, timeFormat, onEdit, onDelete }) => {
  
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
    <div className={editingId === s.id ? "active-edit-highlight" : "session-card-wrapper"}>
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
              <span>{new Date(s.startTime || s.date).toLocaleDateString('sv-SE', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
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
                {s.energyLevel && (
                  <>
                    <span>Energi: {s.energyLevel}</span>
                  </>
                )}
              </span>
            </div>
          </div>

          <div className="history-actions-icons">
            <button onClick={() => onEdit(s)} aria-label="Redigera"><MdEdit /></button>
            <button onClick={() => onDelete(s.id)} aria-label="Radera">
              <RiDeleteBin5Line style={{ color: "#ff4d4d" }} />
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default HistoryCard;