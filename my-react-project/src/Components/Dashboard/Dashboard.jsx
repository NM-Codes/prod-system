import "./Dashboard.css"
import Card from "../Cards/Cards"
import { useSettings } from "../../Contexts/SettingsContext.jsx";



function Dashboard({ totalMinutes, goal, progress, sessionCount, averageEnergy,  weeklyMinutes}) {
  const { timeFormat } = useSettings();

  //toggle 12-hours and 24-hours and shows in the dashboard
  const getFormattedDateTime = () => {
  const now = new Date();
  const datePart = now.toLocaleDateString('sv-SE', { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long' 
  });

  let timePart = now.toLocaleTimeString('sv-SE', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false 
  });

  if (timeFormat === '12h') {
    const hours24 = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    
    const period = hours24 < 12 ? 'FM' : 'EM';
    
    let hours12 = hours24 % 12;
    hours12 = hours12 ? hours12 : 12; 
    
    timePart = `${hours12}:${minutes} ${period}`;
  }

  return `${datePart.charAt(0).toUpperCase() + datePart.slice(1)}, ${timePart}`;
};


  return (
    <div className="dashboard">

      {/* HEADER */}
      <header className="dashboard-header">
        <div className="header-left">
          <h1>Dashboard</h1>
          <p>Snabb översikt över din produktivitet</p>
        </div>
        {/* 3. Display the formatted date/time */}
        <div className="header-date">
          <span className="current-date-text">{getFormattedDateTime()}</span>
        </div>
      </header>


      {/* DEL 1 – IDAG */}
      <section className="dashboard-stats">
        <Card title="Idag"
          className="card-today">
          <div className="stat-row">
            <div className="stat-group">
              <span className="stat-title">Arbetstid</span>
              <span className="stat-value-blue">{totalMinutes} Min</span>
              <span >{Math.round(progress)}% av mål</span>

            </div>

            <div className="stat-group">
              <span className="stat-title">Sessioner</span>
              <span className="stat-value-purple">{sessionCount}</span>
            </div>

            <div className="stat-group">
              <span className="stat-title">Denna vecka</span>
              <span className="stat-value-green">{Math.floor(weeklyMinutes / 60)}h {(weeklyMinutes % 60).toFixed(0)}m</span>
            </div>
          </div>
        </Card>
      </section>

      {/* DEL 2 – 4 STATS */}
      <section className="dashboard-stats">
        <Card>
          <span className="stat-title">Total tid </span>
          <span className="stat-value">{totalMinutes}m</span>
        </Card>

        <Card>
          <span className="stat-title">Sessioner </span>
          <span className="stat-value">{sessionCount}</span>
        </Card>

        <Card>
          <span className="stat-title">Snitt energi </span>
          <span className="stat-value">{averageEnergy}/ 5</span>
          <span className="energy-max"></span>
        </Card>
        

        <Card>
          <span className="stat-title">Snitt/session </span>
          <span className="stat-value">{sessionCount > 0 ? Math.round(totalMinutes / sessionCount) : 0}m</span>
        </Card>
      </section>

      {/* DEL 3 – GRID */}
      <section className="dashboard-grid">
        <Card title="Aktivitet denna veckan" className="large-card">
          <div className="chart-placeholder">
            Ingen aktivtet ännu.
          </div>
        </Card>

        <Card title="Fokuslägen">
          <ul className="session-list">
            <li>🎯 Deep Work</li>
            <li>👥 Möte</li>
            <li>☕️ Paus</li>
            <li>📝 Övrigt</li>
          </ul>
        </Card>
      </section>

      {/* DEL 4 – SENASTE AKTIVITET */}
      <section className="dashboard-stats">
        <Card title="Senaste aktiviteter">
          <p className="empty-text">
            Inga aktiviteter ännu.
          </p>
        </Card>
      </section>

      {/* DEL 5 – KOM IGÅNG */}
      <section className="dashboard-stats">

        <Card title="🚀 Kom igång!" className="footer-card">

          <ul className="start-list">
            <li>Gå till Timer-sidan och starta din första session</li>
            <li>Välj mellan Normal timer eller Pomodoro</li>
            <li>Logga din energinivå</li>
            <li>Se dina framsteg här i Dashboard</li>
          </ul>
        </Card>
      </section>

    </div>
  )
}

export default Dashboard
