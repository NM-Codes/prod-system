import { useState, useEffect } from 'react';
import './App.css';
import Header from './Components/Header/Header';
import Dashboard from './pages/Dashboard';
import TimerPage from "./pages/Timer";
import WorkSession from "./Components/WorkSession/WorkSession";
import HistoryPage from "./pages/History";

function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [sessions, setSessions] = useState(() => {
    const saved = localStorage.getItem("sessions");
    return saved ? JSON.parse(saved) : [];
  });
  const [draftSession, setDraftSession] = useState(null);

  useEffect(() => {
    localStorage.setItem("sessions", JSON.stringify(sessions));
  }, [sessions]);

  function handleEdit(id, updatedData) {
    setSessions(prev =>
      prev.map(s => s.id === id ? { ...s, ...updatedData } : s)
    );
  }

  function handleDelete(id) {
    setSessions(prev => prev.filter(s => s.id !== id));
  }

  return (
    <div className="body-container">
      <Header changePage={setActivePage} activePage={activePage} />

      <main>
        {activePage === "Dashboard" && <Dashboard />}
       

        {activePage === "Timer" && (
          <TimerPage
            onStop={(data) => {
              setDraftSession(data);
              setActivePage("Session");
            }}
          />
        )}

        {activePage === "Session" && (
          <WorkSession
            initialSession={draftSession}
            onSave={(session) => {
              setSessions(prev => [...prev, session]);
              setDraftSession(null);
              setActivePage("History");
            }}
          />
        )}

        {activePage === "History" && (
          <HistoryPage
            sessions={sessions}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </main>
    </div>
  );
}

export default App;
