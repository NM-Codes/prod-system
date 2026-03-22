import Card from "../Cards/Cards";

const HistoryEmptyState = ({ hasNoSessionsAtAll, hasNoFilterResults }) => {
  // LOGIK 1: Om användaren aldrig har sparat ett pass
  if (hasNoSessionsAtAll) {
    return (
      <div className="wrapper-empty-history-content">
        <Card>
          <div className="empty-history-content">
            <p>Inga sessioner ännu.</p>
            <span>Starta din första timer!</span>
          </div>
        </Card>
      </div>
    );
  }

  // LOGIK 2: Om användaren söker/filtrerar men inget matchar
  if (hasNoFilterResults) {
    return (
      <div className="wrapper-empty-history-content">
        <Card>
          <div className="empty-history-content">
            <p>Inga sessioner matchar din sökning</p>
          </div>
        </Card>
      </div>
    );
  }

  // Om inget av ovanstående stämmer, rendera ingenting
  return null;
};

export default HistoryEmptyState;