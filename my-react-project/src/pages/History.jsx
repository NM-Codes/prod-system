import History from "../Components/History/History";

function HistoryPage({ sessions, onEdit, onDelete }) {
  return (
    <div className="main-container">
      <History
        sessions={sessions}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  );
}

export default HistoryPage;
