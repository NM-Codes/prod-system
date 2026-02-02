export default function WorkSession() {
  const [title, setTitle] = useState(" ");
  const [category, setCategory] = useState("Välj kategori");
  const [sessionType, setSessionType] = useState ("Deep work");
  const [date, setDate] = useState("2026-01-19");
  const [startTime, setStartTime] = useState ("");
  const [endTime, setEndTime] = useState ("");
  
  /* Lägga till priortering, hög (röd), medel (orange), låg (grön)*/
  /*Sektion för sparade arbetssektioner */

  function handleSubmit(e){
    e.preventDefault();
    
    const newWorkSession = {
      id: crypto.randomUUID(),
      date,
      startTime,
      endTime,
      title,
      sessionType,
      category,
        
        
    };

    

    console.log("Nytt arbetspass:", newWorkSession);
  }

  return(
    <div className="worksession-container">

      {/* -------- SEKTIONSEN FÖR ATT LÄGGA TILL ARBETSSEKTION ------- */}
      <h2 className="worksession-title">Ny arbetssession</h2>

      <form className="worksession-form" onSubmit={handleSubmit}>
        
        <div className="form-group">
          <label className="worksession-input-label">Titel *</label>
          <input className="worksession-input"
              type="text"
              placeholder="T.ex. Kodsprint på feature X"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
          />
        </div>

        
        <div className="form-row">
            <div className="form-group">
              <label className="worksession-input-label">Kategori</label>
              <select className="worksession-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Arbete</option>
                <option>Personligt</option>
                <option>Lärande</option>
                <option>Övrigt</option>
              </select>
            </div>

            <div className="form-group">
              <label className="worksession-input-label">Sessiontyp</label>
              <select className="worksession-select"
                value={sessionType}
                onChange={(e) => setSessionType(e.target.value)}
              >
                <option>🎯 Deep Work</option>
                <option>👥 Möte</option>
                <option>📋 Planering</option>   
                <option>📚 Lärande</option>   
                <option>☕ Paus</option>   
                <option>📌 Övrigt</option>   
              </select>
            </div>
        </div>

        
        <div className="form-group">
          <label className="worksession-input-label">Datum *</label>
          <input className="worksession-input"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required 
          />
        </div>

        
        <div className="form-row">
            <div className="form-group">
              <label className="worksession-input-label">Starttid *</label>
              <input className="worksession-input"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required 
              />
            </div>
            <div className="form-group">
              <label className="worksession-input-label">Sluttid *</label>
              <input className="worksession-input"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
              />
            </div>
        </div>

        {/* -------- KNAPPAR FÖR SPARA ELLER AVBRYTA ------- */}

        <div className="form-actions">
          <button className="worksession-button" type="submit">
            Spara session
          </button>
          <button className="worksession-reset-btn" type="reset">
            Avbryt
          </button>
        </div>
      </form>
    </div>
  );
}