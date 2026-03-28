import Card from '../Cards/Cards';
import { PiWarningCircle } from "react-icons/pi";

/**
 * Renderar ett meddelande och en ikon när det saknas sessionsdata för analys.
 * Används som fallback i huvudkomponenten Analysis.
 * @component
 * @returns {JSX.Element} Ett kort med varningsikon och instruktionstext.
 */

const AnalysisEmptyState = () => {
  return (
    <Card>
      <div className="empty-content-analysis">
        <PiWarningCircle size={60}/>
        <h2>Ingen data tillgänglig</h2>
        <p>Börja logga dina sessioner för att se analys och insikter här.</p>
      </div>
    </Card>
  );
};

export default AnalysisEmptyState;