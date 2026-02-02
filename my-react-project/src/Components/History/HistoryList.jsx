import { useState } from 'react';
import "./HistoryList.css";

//sessions = array med arbetspass (själva historiken)
// onEdit = funktionen som göra att vi kan redigera sessions
// onDelete = funktionen som gör att vi kan ta bort sessions
//editingId = det unika id på varje pass (se format på mockWorkSessions)
//setEditingId = funktion som uppdaterar editingId
//useState(null) = i början så redigeras inget pass så därför är värdet null
//draft är temporär kopia av session medan man redigerar det. Behövs för att man inte ska ändra originaldatan direkt. Användaren ska kunna avbryta redigeringen
function HistoryList({ sessions, onEdit, onDelete}) {
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState(null);

  //STARTA EDIT = funktionen som pekar på det specifika passet användaren klickade redigera på. Spread operatorn gör temporär kopia > ...session
  function startEdit(session) {
    setEditingId(session.id);
    setDraft({ ...session });
  }

  //CANCEL EDIT = funktionen för att avbryta en redigering av en session. null är för att ingen session längre är i edit läge. setDraft blir ett slängt utkast då ändringar försvinner när användaren klickar på avbryt
  function cancelEdit() {
    setEditingId(null);
    setDraft(null);
  }

  //SAVE EDIT = funktionen som sparar alla ändringar i det specifika session användaren tryckt edit för. onEdit anropas här från parent-komponenten längst upp. draft.id = pass som ska uppdateras, draft = de nya värdena
  function saveEdit() {
    onEdit(draft.id, draft);
    cancelEdit(); //detta gör så att vi kan avsluta edit läge efter sparande
  }

  //RENDERING
  return (
    <div className="history-list">
      {sessions.map((session) => {

        const isEditing = session.id === editingId;

        return (
          <div //grundlig css style för UI för HistoryList
            key={session.id} //key är krav vid list-rendering i React (key används så att React förstår vad som har ändrats)
            className="history-card"
          >
            
            {!isEditing ? (
              //om passet inte redigeras ska det visa läsläge. om det redigeras så ska det visa edit läge
              <>
                <p className="history-title">
                  <strong>{session.title}</strong>
                </p>

                <p className="history-meta">
                  {session.date} {session.startTime}-{session.endTime}
                </p>

                <p className="history-info">
                  {session.sessionType} | Energi: {session.energyLevel}/5
                </p>

                <div className="history-actions">
                  <button className="btn-base btn-light" onClick={() => startEdit(session)}>
                    Redigera
                  </button>

                  <button className="btn-base btn-dark" onClick={() => onDelete(session.id)}>
                    Ta bort
                  </button>
                </div>
              </>
            ) : (
              
              //EDIT LÄGE
              <>
                <div className="history-edit">
                  <input className="history-input"
                    value={draft.title} //gäller endast för title
                    onChange={(e) => //triggas varje gång user skriver
                      setDraft({
                        ...draft, //behåll allt annat
                        title: e.target.value, //uppdatera title
                      })
                    }
                    />

                    <select className="history-select" //Dropdown för sessionType
                      value={draft.sessionType}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          sessionType: e.target.value,
                        })
                      }
                    >
                      <option>Deep Work</option>
                      <option>Möte</option>
                      <option>Paus</option>
                    </select>

                  <div className="history-edit-footer">
                      <select className="history-energy" //Dropdown för energinivå
                        value={draft.energyLevel}
                        onChange={(e) => 
                          setDraft({
                            ...draft,
                            energyLevel: Number(e.target.value),
                          })
                        }
                      >
                        {[1, 2, 3, 4, 5].map((lvl) => ( //array av energy nivåer 1-5, renderas som dropdown
                          <option key={lvl} value={lvl}>
                            {lvl}
                          </option>
                        ))}
                      </select>  

                      <button className="btn-base btn-light" onClick={saveEdit}>Spara</button>
                      <button className="btn-base" onClick={cancelEdit}>Avbryt</button>
                  </div>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default HistoryList