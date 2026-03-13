import { useState } from "react"
import "./EnergyLogger.css"

function EnergyLogger({onLevelSelect}) {
  // Lista över tillgängliga energinivåer med tillhörande beskrivningar
  const energyLevels = [
    {level: "😴", description: "1", label: "Låg"},
    {level: "🥱", description: "2"},
    {level: "😐", description: "3"},
    {level: "😊", description: "4" },
    {level: "🚀", description: "5"},
  ]

  // Lokal state för att hålla koll på vilken nivå som är vald
  const [energy, setEnergy] = useState(0)

  //Uppdaterar både lokal state och informerar föräldrakomponenten vid klick på energinivå-knapp
  const handleClick = (level) => {

    //Om man klickar på samma knapp igen ska den avväljas annars sätt till level
    const newLevel = energy === level ? 0 : level

    // Uppdatera state med det nya värdet
    setEnergy(newLevel)

    // Skickar värdet vidare så att det kan sparas i historiken, om funktionen finns och något värde är valt
    onLevelSelect ? onLevelSelect(newLevel) : null
  }

  return(
   <div className="form-group">
      <label htmlFor="category">Energinivå</label> {/* Rubrik för sektionen samma som titel och kategori */}

      <div className="button-group">
      {/* Skapa en knapp för varje energinivå */}
      {energyLevels.map((energyLevel) => (
        <button
        className="button"
        key={energyLevel.level}
        onClick={() => handleClick(energyLevel.level)}
        >
            <span className="energy-level">{energyLevel.level}</span>
            <span className="energy-description">{energyLevel.description}</span>
        </button>
      ))}
      </div>
      {/* Mycket låg text till vänster och Mycket hög text till höger precis under energi nivåerna*/}

      {/*För kontroll att det fungerar*/}
      {energy !== undefined && (
        <p className="selected-energy" >Vald energinivå: <span className="energy-emoji"> {energy || ""}</span></p> 

      )}
   </div>
  )
}

export default EnergyLogger