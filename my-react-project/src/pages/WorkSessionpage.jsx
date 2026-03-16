import WorkSession from "../Components/WorkSession/WorkSession";
import "../Components/WorkSession/WorkSession.css";

// export default function WorkSessionPage() {
//   const handleStartSession = (sessionData) => {
//     console.log("Starting session:", sessionData);
//   };

//   return (
//     <div>
//       <WorkSession onStart={handleStartSession} />
//     </div>
//   );
// }

export default function WorkSessionPage({ initialSession, onSave }) {
  
  return (
    <div className="page-wrapper">
      <WorkSession 
        initialSession={initialSession} 
        onSave={onSave} 
      />
    </div>
  );
}