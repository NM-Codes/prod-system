import { useState } from 'react';
import './App.css';
import './index.css';
import Header from './Components/Header/Header';
import DashboardPage from './pages/DashboardPage.jsx';
import WorkSessionPage from './pages/WorkSessionpage.jsx';
import HistoryPage from "./pages/History";
import { ThemeProvider, useTheme } from './Contexts/ThemeContext.jsx'
import ThemeToggle from './Components/ThemeToggle/ThemeToggle.jsx'
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useSettings } from './Contexts/SettingsContext.jsx';



function App() {
  const navigate = useNavigate(); // Used to redirect the user programmatically 

  // const [activePage, setActivePage] = useState("Dashboard"); //we don't need any more. we use react router.
const { sessions, setSessions } = useSettings();  
const [draftSession, setDraftSession] = useState(null);
  
  const { theme } = useTheme();
  const themeChange = theme === 'dark' ? 'theme-toggle-dark' : 'theme-toggle-light';

  // useEffect(() => {
  //   localStorage.setItem("sessions", JSON.stringify(sessions));
  // }, [sessions]);

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
           
      {/* <Header changePage={setActivePage} activePage={activePage} /> */}
      <Header /> {/* new change for react router dom */}

      {/* <main>
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

      <Header changePage={setActivePage} activePage={activePage} />

      <main>
        {activePage === "Dashboard" && <DashboardPage />}
       

        {(activePage === "Timer" || activePage === "WorkSession") && (
          <WorkSessionPage

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
      </main> */}

      <main> 
      <Routes>
          <Route path="/" element={<DashboardPage />} />
          
          <Route path="/timer" element={
            <TimerPage
              onStop={(data) => {
                setDraftSession(data);
                navigate("/session"); 
              }}
            />
          } />

          <Route path="/session" element={
            <WorkSession
              initialSession={draftSession}
              onSave={(newSession) => {
                setSessions(prev => [...prev, newSession]);
                setDraftSession(null);
                navigate("/history"); 
              }}
            />
          } />

          <Route path="/history" element={
            <HistoryPage
              sessions={sessions}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          } />

          <Route path="/setting" element={<Setting />} />
          
          {/* Fallback for 404 - redirects to dashboard if path doesn't exist */}
          <Route path="*" element={<DashboardPage />} />
        </Routes>
        </main> 
    </div>
  );
}

export default App;
