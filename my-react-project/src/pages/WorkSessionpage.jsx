import WorkSessionForm from "../components/WorkSession";
import "../components/WorkSession.css";

export default function WorkSessionPage() {
  const handleStartSession = (sessionData) => {
    console.log("Starting session:", sessionData);
  };

  return (
    <div>
      <WorkSession onStart={handleStartSession} />
    </div>
  );
}