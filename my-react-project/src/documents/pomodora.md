# Pomodoro 

**Filer:** `Pomodoro.jsx` och `PomodoroSettings.jsx`  
**Syfte:** Klassisk Pomodoro-timer med fokus-sessioner, automatiska pauser och möjlighet att anpassa tiderna.  
Pomodoro-komponenten hanterar timern och fasväxlingarna medan PomodoroSettings hanterar inställningarna.

---

## Vad användaren får

- En fullständig Pomodoro-timer med tre faser: **Fokus**, **Kort paus** och **Lång paus**
- Automatisk växling mellan faserna (lång paus efter var 4:e fokus-session)
- Stor cirkulär timer med färg som matchar fasen
- Möjlighet att välja fas manuellt
- Knapp för att anpassa alla tider (Fokus, Kort paus, Lång paus)
- Start, Paus, Fortsätt och Stopp-knappar
- Timern låser fasval medan den kör

---

## Hur sidan fungerar – Steg för steg

1. Användaren ser tre fas-knappar: Fokus (25 min), Kort paus (5 min), Lång paus (15 min)
2. Kan klicka på en fas för att välja den (om timern inte kör)
3. Öppnar **⚙️ Pomodoro-inställningar** för att ändra tiderna
4. Trycker **Starta** → timern börjar räkna ner
5. När tiden är slut byter timern automatiskt fas
6. Efter 4 fokus-sessioner kommer en längre paus
7. Användaren kan pausa, fortsätta eller stoppa helt när som helst

---

## Viktiga delar i Pomodoro.jsx – vad den gör

### State-variabler

| Variabel              | Vad den gör |
|-----------------------|-------------|
| `selectedPhase`       | Vilken fas användaren har valt (work, shortBreak, longBreak) |
| `workMinutes`         | Antal minuter för fokus (standard 25) |
| `breakMinutes`        | Antal minuter för kort paus (standard 5) |
| `longBreakMinutes`    | Antal minuter för lång paus (standard 15) |
| `sessions`            | Hur många fokus-sessioner som är genomförda |
| `isRunning`           | `true` när timern räknar ner |
| `isPaused`            | `true` när timern är pausad |
| `currentPhase`        | Vilken fas som faktiskt kör just nu |
| `timeLeft`            | Återstående sekunder i nuvarande fas |

### Funktioner – vad händer när?

- **`handlePhaseSelect(phase)`**  
  Byter fas och sätter rätt tid om timern inte är igång.

- **`handleSettingsSave(settings)`**  
  Tar emot nya tider från PomodoroSettings och uppdaterar komponenten.

- **`handlePhaseComplete()`** ← **Viktigaste funktionen**  
  När en fas tar slut: ökar sessions-räknaren och bestämmer nästa fas (lång paus var 4:e gång).

- **`handleStart / handlePause / handleResume / handleStop`**  
  Kontrollerar start, paus och stopp av timern.

- **`formatTime(seconds)`**  
  Visar tiden snyggt som `25:00`.

- **`getPhaseColor()` & `getPhaseText()`**  
  Ger rätt färg och beskrivning beroende på fas.

### Timer-logik
Använder `useEffect` + `setInterval` för att räkna ner varje sekund. När tiden når 0 anropas `handlePhaseComplete()` automatiskt.

---

## Strukturen på Pomodoro-sidan

Sidan består av **två stora kort**:

1. **Fas-kortet**  
   - Rubrik: "Välj Pomodoro-fas"  
   - ⚙️ Pomodoro-inställningar-knapp  
   - Tre knappar: Fokus, Kort paus, Lång paus (med emoji och tid)

2. **Timer-kortet**  
   - Stor cirkulär timer med färg som matchar fasen  
   - Visar tid i mitten + text under (t.ex. "25 min fokus")  
   - Knappar: Starta / Paus / Fortsätt / Stopp

---

## PomodoroSettings.jsx 

**Syfte:** Hanterar inställningarna för Pomodoro-tiderna. Samma stil som SettingsTimer.

### Vad användaren får av PomodoroSettings?

- Knapp med ⚙️ **"Pomodoro-inställningar"**
- Dropdown-ruta där man kan ändra:
  - Fokustid (15–90 min)
  - Kort paus (5–25 min)
  - Lång paus (30–60 min)
- Ändringarna sparas och används direkt i timern

### Viktiga delar i PomodoroSettings

| Variabel            | Vad den gör |
|---------------------|-------------|
| `focusTime`         | Aktuell fokustid |
| `shortBreak`        | Aktuell kort paus-tid |
| `longBreak`         | Aktuell lång paus-tid |
| `selectedPreset`    | Vilken fas som är markerad |
| `showDropdown`      | Visar/gömmer inställningsrutan |

### Funktioner

- **`handleMinutesChange(type, minutes)`**  
  Ändrar tiden för vald fas.

- **`handleSaveAll()`** ← **Viktigaste**  
  Skickar de nya tiderna tillbaka till Pomodoro via `onSave()`.

- **`getDurationsForType(type)`**  
  Visar olika tidsalternativ beroende på fas (längre alternativ för fokus).

---

## Sammanfattning – hela flödet

1. Öppna Pomodoro-sidan
2. Välj fas eller ändra tider via ⚙️ Pomodoro-inställningar
3. Tryck **Starta**
4. Timern räknar ner och byter fas automatiskt
5. Efter 4 fokus-sessioner → lång paus
6. Användaren kan stoppa när som helst

---

**Tips för dig som utvecklar:**
- Lång paus kommer automatiskt var 4:e fokus-session
- Alla tider kan ändras i realtid
- PomodoroSettings använder samma CSS som SettingsTimer
- Det finns plats att lägga till ljudnotifikation i `handlePhaseComplete()`

---

**Skapad:** Mars 2026  
**Författare:** Najah
