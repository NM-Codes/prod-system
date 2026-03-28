import Card from "../Cards/Cards";

/**
 * Renderar ett pedagogiskt tomt läge beroende på om data saknas helt eller om filter ej matchar.
 * @component
 * @param {Object} props
 * @param {boolean} props.hasNoSessionsAtAll - Om användaren inte har några sparade sessioner alls.
 * @param {boolean} props.hasNoFilterResults - Om sökningen/filtreringen resulterade i noll träffar.
 * @returns {JSX.Element|null} Returnerar ett meddelandekort eller null om listan inte är tom.
 */

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