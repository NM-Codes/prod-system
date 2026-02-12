import { useEffect, useState } from "react";
import "./TaskList.css";

function Tasks() {

  //useState körs med en funktion som bara körs VID FÖRSTA rendern
  //Detta används för att läsa från localStorage en gång
  const [todos, setTodos] = useState(() => {
    //Hämtar sparade todos från webbläsaren
    const saved = localStorage.getItem("todos");

    //localStorage lagrar endast strängar
    //JSON.parse gör om strängen till JS-array igen. Om inget finns sparat > returnera tom array
    return saved ? JSON.parse(saved) : [];
  });

  //Input för nya todo: text = vad användaren skriver i inputfältet
  //setText = uppdaterar texten
  const [text, setText] = useState("");

  //Redigera läge: editingId = id på den todo som just nu redigeras
  //null betyder att ingen redigeras
  const [editingId, setEditingId] = useState(null);

  //draft = tillfällig text när man redigerar en todo
  //används för att kunna avbryta utan att ändra originalet
  const [draft, setDraft] = useState("");

  //localStorage sync
  //useEffect körs VARJE gång "todos" ändras
  //då sparar vi automatiskt allt i localStorage
  useEffect(() => {
    //JSON.stringify gör om JS-array till sträng
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]); //dependency array = körs endast när todos ändras

  //Lägg yill todo
  function addTodo() {
    //trim() tar bort mellanslag och stoppar tomma todos
    if (!text.trim()) return;

    //Uppdatera todos baserat på föregående värde
    setTodos(prev => [
      ...prev,//behåll alla gamla todos
      {
        id: Date.now(), //unikt id baserat på tid
        text //text från input
      }
    ]);

    //Töm inputfältet efter tillägg
    setText("");
  }

  //Ta bort todo
  function deleteTodo(id) {
    //filter skapar en ny array utan den todo som matchar id
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }

  //Starta redigering
  function startEdit(todo) {
    //Anger vilken todo som redigeras
    setEditingId(todo.id);

    //Kopiera texten till draft aka temporär redigering
    setDraft(todo.text);
  }

  //Spara redigering
  function saveEdit() {
    setTodos(prev =>
      prev.map(todo =>
        //skapa nytt objekt med ny text
        todo.id === editingId
          ? { ...todo, text: draft } //spread = kopiera allt, skriv över text
          : todo                     //annars: returnera oförändrat
      )
    );

    //Avsluta redigering
    cancelEdit();
  }

  //Avbryt redigering
  function cancelEdit() {
    //Nollställ edit-läge
    setEditingId(null);
    setDraft("");
  }

  //Rendering
  return (
    <div className="todo">
      <div className="todo-inner">
        <h2>Task List</h2>

        {/* Input för att lägga till ny todo */}
        <input
          className="todo-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Skriv uppgift här..."
        />

        <button onClick={addTodo}>Lägg till</button>

        {/* Visar lista över todos */}
        <div className="todo-list">
          {todos.map((todo) => (
            <div key={todo.id} className="todo-item">
              {editingId === todo.id ? (
                <div className="todo-edit">
                  {/* Edit-läge med spara och avbryt knappar */}
                  <input
                    className="todo-input"
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                  />

                  <div className="todo-actions">
                    <button onClick={saveEdit}>Spara</button>
                    <button onClick={cancelEdit}>Avbryt</button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Visningsläge med redigera och ta bort knappar */}
                  <span>{todo.text}</span>

                  <div className="todo-actions">
                    <button onClick={() => startEdit(todo)}>Redigera</button>
                    <button onClick={() => deleteTodo(todo.id)}>Ta bort</button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Tasks;