# SettingsTimer 

**Fil:** `SettingsTimer.jsx`  
**Syfte:** Låter användaren anpassa hur långa de olika fokuslägena ska vara (Deep Work, Möte, Paus, Övrigt).  
Det är den lilla ⚙️-knappen som syns i fokus-kortet på WorkSession-sidan.

---

## Vad användaren får

- En knapp med ⚙️ som heter **"Timer-inställningar"**
- När man klickar öppnas en dropdown-ruta där man kan:
  - Klicka på ett fokusläge (t.ex. Deep Work)
  - Välja ny tid bland vanliga alternativ (15, 20, 25, 30, 45, 50, 60, 90, 120 minuter)
  - Spara alla ändringar eller avbryta
- Ändringarna gäller direkt nästa gång man startar en timer

---

## Hur komponenten fungerar – Steg för steg

1. Användaren klickar på **⚙️ Timer-inställningar**
2. En ruta dyker upp med alla fyra fokuslägen
3. Användaren klickar på ett fokusläge för att välja det
4. Under det valda läget visas en rad med tidsalternativ som knappar
5. Användaren klickar på önskad tid → tiden uppdateras direkt
6. När man är klar trycker man **Spara**
7. Ändringarna skickas tillbaka till WorkSession och sparas

---

## Viktiga delar i koden – vad den gör

### State-variabler (det som React "kommer ihåg")

| Variabel                | Vad den gör |
|-------------------------|-------------|
| `focusOptions`          | Lista med alla fokuslägen (emoji, namn, minuter, färg). Kommer från WorkSession eller använder standardvärden. |
| `selectedFocusLabel`    | Håller reda på vilket fokusläge användaren just nu har markerat. |
| `showDropdown`          | `true` när inställningsrutan är öppen, `false` när den är stängd. |

### Funktioner – vad händer när?

- **`handleSelectFocus(label)`**  
  Markerar vilket fokusläge användaren har klickat på så att tidsalternativen visas under just det läget.

- **`handleMinutesChange(label, minutes)`**  
  Ändrar antalet minuter för ett specifikt fokusläge.  
  Exempel: Ändrar Deep Work från 90 till 120 minuter.

- **`handleSaveAll()`** ← **Viktigaste funktionen**  
  Sparar alla ändringar genom att kalla `onSave(focusOptions)`.  
  Skickar den uppdaterade listan tillbaka till WorkSession och stänger dropdown-rutan.

- **`handleCancel()`**  
  Stänger bara dropdown-rutan utan att spara några ändringar.

### Standardvärden (defaultPresets)

```js
defaultPresets = [
  { label: 'Deep Work', emoji: '🎯', minutes: 90, color: '#FF9B49' },
  { label: 'Möte',      emoji: '👥', minutes: 30, color: '#2A7FFF' },
  { label: 'Paus',      emoji: '☕', minutes: 15, color: '#6DD18C' },
  { label: 'Övrigt',    emoji: '📝', minutes: 60, color: '#9096A3' }
]
