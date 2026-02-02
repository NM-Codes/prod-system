import { useEffect, useState } from 'react';
// useState = sparar data i komponenten
//useEffect = gör så att vi kan köra kod som en effekt när något ändras

import { mockWorkSessions } from "./mockWorkSessions.jsx";
import HistoryList from "./HistoryList"; //importerar UI delen för History

function History() {
  const [sessions, setSessions] = useState(() => {
    const saved = localStorage.getItem("workSessions"); // sparar i webbläsaren, vid refresh så finns det kvar

    return saved
      ? JSON.parse(saved)
      : mockWorkSessions; //JSON.parse gör om string från localStorage till JS-data. Denna del betyder i princip att om det finns sparad data = gör om JSON-string till JS-array, annars använd mockdata (detta blir fallback)
  });

  //useEffect = side effect -> spara till localStorage. Körs efter varje render OM sessions har ändrats
  useEffect(() => {
    localStorage.setItem(
      "workSessions",
      JSON.stringify(sessions) //JSON.stringify för att göra om objekt till text då localStorage endast kan lagra string
    );
  }, [sessions]); //dependency arrayen som gör att effekten körs varje gång sessions ändras

  //REDIGERA PASS
  function handleEdit(id, updateData) { //utgår från passets unika id och updatedData är de nya värden eller värdet som ändrats

    //prev är viktig här då state beror på det famla värdet (vid redigering). map arrayen returnerar en ny array via det unika id, spread operatatorn skapar nytt objekt genom att kopiera gamla värden (...session) och skriver över ändrade fält (...updatedData)
    setSessions((prev) =>
      prev.map((session) =>
      session.id ===id
        ? { ...session, ...updateData }
        : session //annars returnera passet oförändrat
      )
    );
  }

  //TA BORT PASS
  function handleDelete(id) {
    //filter funktionen tar bort element som inte matchar villkor/villkoren
    setSessions((prev) =>
      prev.filter((session) => session.id !== id)
    );
  }

  //RENDERING
  return (
    <section className="history-page">
      <h1>Historik</h1>

      <HistoryList //renderar HistoryList och skickar in:
        sessions={sessions} //datan som ska visas
        onEdit={handleEdit} //callback för redigering
        onDelete={handleDelete} //callback för borttagning
      />
    </section>
  );
}

export default History