import Card from '../Cards/Cards';
import { PiWarningCircle } from "react-icons/pi";

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