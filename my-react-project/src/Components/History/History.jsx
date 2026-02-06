import HistoryList from "./HistoryList";

function History({ sessions, onEdit, onDelete }) {
  return (
    <section className="history-page">
      <h1>History</h1>

      <HistoryList
        sessions={sessions}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </section>
  );
}

export default History;
