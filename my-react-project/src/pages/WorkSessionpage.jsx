import WorkSession from "../Components/WorkSession/WorkSession";
import "../Components/WorkSession/WorkSession.css";

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