import WorkSession from "../Components/WorkSession/WorkSession";
import "../Components/WorkSession/WorkSession.css";

/*
 * WorkSessionPage fungerar som en wrapper för WorkSession-komponenten.
 * Den tar emot:
 *  - initialSession: en eventuell session som ska visas/redigeras
 *  - onSave: callback för att spara sessionen
 *  - navigate: callback för att navigera till en annan sida
 */
export default function WorkSessionPage({ initialSession, onSave, navigate }) {
  return (
    <div className="page-wrapper">
      <WorkSession 
        initialSession={initialSession} 
        onSave={onSave} 
        navigate={navigate} 
      />
    </div>
  );
}