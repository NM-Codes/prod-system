import "./Dashboard.css"
import Card from "../Cards/Cards"

function Dashboard({ totalMinutes, goal, progress, sessionCount, averageEnergy }) {
  return (
    <div className="dashboard">

      {/* HEADER */}
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Snabb översikt över din produktivitet</p>
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
                    <span className="stat-value-green">12h</span>
                </div>
            </div>
        </Card>
      </section>

      {/* DEL 2 – 4 STATS */}
      <section className="dashboard-stats">
        <Card>
          <span className="stat-title">Total tid</span>
          <span className="stat-value">{totalMinutes}m</span>
        </Card>

        <Card>
          <span className="stat-title">Sessioner</span>
          <span className="stat-value">{sessionCount}</span>
        </Card>

        <Card>
          <span className="stat-title">Snitt energi</span>
          <span className="stat-value">{averageEnergy}</span>
        </Card>

        <Card>
          <span className="stat-title">Snitt/session</span>
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
