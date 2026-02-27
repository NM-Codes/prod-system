import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Tasks from "./pages/Tasks";
import TimerPage from "./pages/Timer";
import WorkSession from "./Components/WorkSession/WorkSession";
import HistoryPage from "./pages/History";
import Setting from './pages/Setting.jsx';
import { useTheme } from './Contexts/ThemeContext.jsx'
import ThemeToggle from './Components/ThemeToggle/ThemeToggle.jsx'


function App() {
  const [activePage, setActivePage] = useState("Home");
  const [sessions, setSessions] = useState(() => {
    const saved = localStorage.getItem("sessions");
    return saved ? JSON.parse(saved) : [];
  });
  const [draftSession, setDraftSession] = useState(null);
  
  const { theme } = useTheme();
  const themeChange = theme === 'light'? 'theme-toggle-dark' : 'theme-toggle-light';

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
      <div className={`body-container ${themeChange}`}>
      {/* toggle theme color */}
      <ThemeToggle />      
      <Header changePage={setActivePage} activePage={activePage} />

      <main>
        
        {activePage === "Home" && <Home />}
        {activePage === "Dashboard" && <Dashboard />}
        {activePage === "Tasks" && <Tasks />}

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
        {activePage === "Setting" && <Setting />}
      </main>
    </div>
  );
}

export default App;
