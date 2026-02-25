import HistoryList from "./HistoryList";
import HistoryFilter from "./HistoryFilter"; 
import './History.css';
import Card from "../Cards/Cards";

function History({ sessions, onEdit, onDelete }) {
  const hasNoSessions = !sessions || sessions.length === 0;
  return (
    <section className="history-page">
      <h1>Historik</h1>
      <p>Se och hantera dina tidigare sessioner</p>

      
      <HistoryFilter />

{hasNoSessions ? (
  <div className="wrapper-empty-history-content">
  <Card>
    <div className="empty-history-content">
      <p>Inga sessioner ännu.</p>
      <span>Starta din första timer!</span>
    </div>
  </Card>
  </div>
) : (

      
      <HistoryList
        sessions={sessions}
        onEdit={onEdit}
        onDelete={onDelete}
      />
      )}
      </section>
  );
}

export default History;