# Timer

**Fil:** `Timer.jsx`  
**Syfte:** Detta är den faktiska countdown-timern som används i Normal Timer-läget (WorkSession).  
Den räknar upp från 0 och stannar automatiskt när den når vald fokus-tid (t.ex. 90 minuter för Deep Work).

---

## Vad användaren får

- En stor, snygg cirkulär timer som visar minuter och sekunder
- Timern startar, pausas, fortsätter och stoppas via knapparna i WorkSession
- Den räknar uppåt (istället för att räkna ner) så man ser exakt hur lång tid man har arbetat
- När den når den valda tiden (focusMinutes) stoppas den automatiskt och sessionen sparas
- Ger exakta start- och sluttider som används för att spara sessionen i historiken

---

## Hur komponenten fungerar – Steg för steg

1. WorkSession skickar `focusMinutes` (t.ex. 90) och en `control`-signal ("start", "pause", "resume", "stop")
2. Användaren trycker Start → timern börjar räkna upp varje sekund
3. Timern visar tid i formatet `MM:SS`
4. När timern når `focusMinutes` stoppas den automatiskt
5. Vid stopp skickas start- och sluttid tillbaka till WorkSession via `onStop()`
6. WorkSession sparar då hela sessionen och navigerar till History

---

## Viktiga delar i koden – vad den gör

### State & Refs

| Variabel                    | Vad den gör |
|-----------------------------|-------------|
| `milliseconds`              | Håller reda på hur många millisekunder som har passerat (används för att räkna tid) |
| `intervalRef`               | Sparar intervallet så det kan stoppas/pausas |
| `startTimestampRef`         | Sparar exakt när timern startade (används för att spara sessionens starttid) |
| `durationMs`                | Beräknad total tid i millisekunder (focusMinutes × 60 000) |

### Funktioner – vad händer när?

- **`handleStart()`**  
  Startar timern från 0, sätter starttid och börjar räkna upp varje sekund.  
  Om tiden når `focusMinutes` stoppas timern automatiskt.

- **`handlePause()`**  
  Pausar timern genom att stänga av intervallet.

- **`handleResume()`**  
  Fortsätter räkna upp från där den pausades.

- **`handleStop()`** ← **Viktigaste funktionen**  
  Stoppar timern, skapar ett objekt med `startTimestamp` och `endTimestamp` och skickar det till WorkSession via `onStop()`.  
  Återställer sedan allt för nästa session.

- **`useEffect` för control**  
  Lyssnar på kommandon från WorkSession (`start`, `pause`, `resume`, `stop`) och kör rätt funktion.

### Visning av tid

```js
const time = {
  minutes: Math.floor(milliseconds / 60000),
  seconds: Math.floor(milliseconds / 1000) % 60,
};
