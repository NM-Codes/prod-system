import WorkSession from "../Components/WorkSession/WorkSession";
import "../Components/WorkSession/WorkSession.css";

export default function WorkSessionPage({ initialSession, onSave }) {
  return (
    <div>
      <WorkSession initialSession={initialSession} onSave={onSave} />
    </div>
  );
}