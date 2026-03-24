# WorkSession 

**Fil:** `WorkSession.jsx`  
**Syfte:** Detta är huvudkomponenten för att **starta och spara ett arbetspass** med timer.

---

## Vad användaren får

- En enkel och snygg timer-sida där man kan:
  - Välja mellan **Normal Timer** (flexibel tid) eller **Pomodoro Timer**
  - Välja ett fokusläge (Deep Work, Möte, Paus, Övrigt) med emoji och rekommenderad tid
  - Skriva en titel och kategori för passet
  - Logga sin energinivå (om det är påslaget i inställningarna)
  - Starta, pausa och stoppa timern
  - Automatiskt spara hela sessionen när man är klar
  - Bli skickad till History-sidan efter avslutat pass

Allt är uppdelat i tydliga kort (Cards) så det är lätt att använda.

---

## Hur sidan fungerar – Steg för steg

1. Användaren öppnar sidan
2. Väljer läge: **Normal Timer** eller **Pomodoro**
3. Väljer ett fokusläge (t.ex. Deep Work 90 minuter)
4. Fyller i **Titel** och **Kategori**
5. (Valfritt) Väljer energinivå
6. Trycker **Start**
7. Timern börjar räkna ner
8. När passet är slut eller man trycker **Stopp & Spara**:
   - All information sparas
   - Användaren skickas till historiken
   - Sidan återställs för nästa pass

---

## Viktiga delar i koden – vad den gör

### State-variabler (det som React "kommer ihåg")

| Variabel              | Vad den gör |
|-----------------------|-------------|
| `title`               | Titeln på arbetspasset (t.ex. "Vad arbetar du med?") |
| `category`            | Kategori (t.ex. "Projekt", "Studier") |
| `focusMode`           | Vilket fokusläge som är valt (Deep Work, Möte...) |
| `focusEmoji`          | Emoji som visas medan timern kör |
| `focusMinutes`        | Hur många minuter fokusläget ska vara |
| `energyLevel`         | Energinivå (1–5), visas bara om energilogging är på |
| `mode`                | `'normal'` eller `'pomodoro'` (pomodoran är ett tillägg) |
| `isTimerRunning`      | `true` när timern är igång |
| `isPaused`            | `true` när timern är pausad |
| `focusOptions`        | Listan med alla fokuslägen (Deep Work 90 min, Möte 30 min osv.) |

### Funktioner – vad händer när?

- **`formatDisplay()`**  
  Visar tid i rätt format (12-timmars eller 24-timmars) beroende på inställningar.

- **`handleSettingsSave()`**  
  Uppdaterar fokuslägena när användaren ändrar dem via SettingsTimer.

- **`handleTimerComplete()`** ← **Viktigaste funktionen**  
  När timern stoppas:
  - Beräknar hur länge passet var
  - Skapar ett sessions-objekt med all info
  - Sparar sessionen via `onSave()`
  - Navigerar till `/history`
  - Återställer alla fält

- **`isFormValid`**  
  Kollar att titel och fokusläge är ifyllda (och energinivå om det krävs).  
  Start-knappen är inaktiverad tills allt är klart.

---

## Strukturen på sidan (Normal Timer)

Sidan består av **tre kort**:

1. **Lägeskortet**  
   Två knappar: Normal Timer ↔ Pomodoro Timer

2. **Fokuslägeskortet**  
   - Visa alla fokusalternativ som knappar  
   - En liten kugghjulsikon som öppnar inställningar för att ändra tider (finns mer om detta i `workSettingTimer.md`)

3. **Timer-kortet** (det stora kortet)  
   - Visar starttid
   - Den riktiga `<Timer />`-komponenten
   - Formulär: Titel + Kategori + Energinivå (valfritt)
   - Knappar: **Start** / **Paus** / **Fortsätt** / **Stopp & Spara**
   - Varningstext om något saknas i formuläret (Tooltip)

---

## Pomodoro-läget

När användaren väljer **Pomodoro** visas istället komponenten `<Pomodoro />`.  
All Pomodoro-logik (25 min fokus + 5 min paus) ligger i den filen. ( Läs mer `pomodora.md`)

---

## Sammanfattning – vad som händer i bakgrunden

- All data sparas i `localStorage` via `onSave`-funktionen
- Inställningar (12/24h och energilogging) hämtas från `SettingsContext`
- Timern styrs via props (`control`, `onStart`, `onStop`)
- När timern stoppas skapas ett komplett sessions-objekt som används på History- och Dashboard-sidorna

---

**Tips för dig som användare:**
- Vill du ändra hur långa fokuslägena är? → Använd kugghjulet i fokus-kortet
- Energilogging kan stängas av helt i inställningarna
- Allt är byggt så det är lätt att utöka med fler fokuslägen

---

**Skapad:** Mars 2026  
**Författare:** Najah
