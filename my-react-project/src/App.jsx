import { useState } from 'react'
import { useTheme } from './Contexts/ThemeContext.jsx'
import ThemeToggle from './Components/ThemeToggle/ThemeToggle.jsx'
import './App.css'
import './index.css'
import Header from './components/Header/Header'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Tasks from  "./pages/Tasks"
import Timer from "./pages/Timer"
import HistoryPage from "./pages/History"


//Mappar sidnamn till komponenter för dynamisk rendering
const pages = {
  Home: <Home />,
  Dashboard: <Dashboard />,
  Tasks: <Tasks />,
  Timer: <Timer />,
  History: <HistoryPage />
}

function App() {
  const [ activePage, setActivePage ] = useState("Home");
    const { theme } = useTheme();
    const themeChange = theme === 'light'? 'theme-toggle-dark' : 'theme-toggle-light';


  return(
    <div className={`body-container ${themeChange}`}>
      {/* toggle theme color */}
      <ThemeToggle />

      {/* Header tar emot funktionen för att byta sida samt nuvarande status */}
      <Header changePage={setActivePage} activePage={activePage}/>
      
      <main>
        {/* Renderar den sida som matchar nuvarande state */}
        {pages[activePage]}
      </main>
    </div>
  )
}

export default App
