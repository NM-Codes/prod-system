import { useState, useEffect } from 'react';
import './App.css';
import './index.css';
import Header from './Components/Header/Header';
import DashboardPage from './pages/DashboardPage.jsx';
import WorkSessionPage from './pages/WorkSessionpage.jsx';
import PomodoroPage from './pages/PomodoroPage.jsx';
import HistoryPage from "./pages/History";
import { ThemeProvider, useTheme } from './Contexts/ThemeContext.jsx'
import ThemeToggle from './Components/ThemeToggle/ThemeToggle.jsx'



function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [sessions, setSessions] = useState(() => {
    const saved = localStorage.getItem("sessions");
    return saved ? JSON.parse(saved) : [];
  });
  const [draftSession, setDraftSession] = useState(null);
  
  const { theme } = useTheme();
  const themeChange = theme === 'dark' ? 'theme-toggle-dark' : 'theme-toggle-light';

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
           
      <Header changePage={setActivePage} activePage={activePage} />

      <main>
        {activePage === "Dashboard" && <DashboardPage />}
        
        {activePage === "Pomodoro" && <PomodoroPage navigate={(page) => setActivePage(page)} />}

        {(activePage === "Timer" || activePage === "WorkSession") && (
          <WorkSessionPage
            initialSession={draftSession}
            onSave={(session) => {
              setSessions(prev => [...prev, session]);
              setDraftSession(null);
              setActivePage("History");
            }}
            navigate={(page) => setActivePage(page)}
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
