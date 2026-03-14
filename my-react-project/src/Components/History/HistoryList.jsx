import { useState } from "react";
import './HistoryList.css';
import Card from "../Cards/Cards";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";




/*

  HistoryList

  -----------

  - Visar alla sessions

  - Senaste överst

  - Full redigering av ALLA fält

*/



function HistoryList({ sessions, onEdit, onDelete }) {

  const [editingId, setEditingId] = useState(null);

  const [draft, setDraft] = useState(null);



  // Sorterar så nyaste kommer överst

  const sorted = [...sessions].sort((a, b) => {

    return new Date(`${b.date} ${b.startTime}`) - new Date(`${a.date} ${a.startTime}`);

  });



  function startEdit(session) {

    setEditingId(session.id);

    setDraft({ ...session });

  }



  function saveEdit() {

    onEdit(draft.id, draft);

    setEditingId(null);

    setDraft(null);

  }


  return (
    <div className="history-list-wrapper">
      {sorted.map((s) => (
        <Card key={s.id}>
          {s.id !== editingId ? (
            <div className="history-card-inner">
              <strong>{s.title}</strong>
              <p>{s.date} {s.startTime}–{s.endTime}</p>
              <p>{s.category} | {s.sessionType} | Energi {s.energyLevel}</p>
              <div className="history-actions-icons">
                <button onClick={() => startEdit(s)}>
                  <MdEdit/>
                </button>
                <button onClick={() => onDelete(s.id)}>
                  <RiDeleteBin5Line style={{color:"red"}}/>
                </button>
              </div>
            </div>
          ) : (
            <div> 
              <input value={draft.title} onChange={e => setDraft({ ...draft, title: e.target.value })} />
              <input type="date" value={draft.date} onChange={e => setDraft({ ...draft, date: e.target.value })} />
              <input type="time" step="1" value={draft.startTime} onChange={e => setDraft({ ...draft, startTime: e.target.value })} />
              <input type="time" step="1" value={draft.endTime} onChange={e => setDraft({ ...draft, endTime: e.target.value })} />

              <select value={draft.category} onChange={e => setDraft({ ...draft, category: e.target.value })}>
                <option>Arbete</option>
                <option>Personligt</option>
                <option>Lärande</option>
                <option>Övrigt</option>
              </select>

              <select value={draft.sessionType} onChange={e => setDraft({ ...draft, sessionType: e.target.value })}>
                <option>Deep work</option>
                <option>Möte</option>
                <option>Paus</option>
              </select>

              <select value={draft.energyLevel} onChange={e => setDraft({ ...draft, energyLevel: Number(e.target.value) })}>
                {[1,2,3,4,5].map(n => <option key={n}>{n}</option>)}
              </select>

              <button onClick={saveEdit}>Spara</button>
              <button onClick={() => setEditingId(null)}>Avbryt</button>
            </div>
          )}
        </Card>
      ))}
    </div> 
  ); 
} 

export default HistoryList; 