# Header & Navigation

Dokumentation över applikationens toppsektion och navigeringsstruktur.

## Komponenter
- **Header.jsx**: Huvudkomponent för navigering. Renderar logotyp, menyval och `ThemeToggle`.
- **navData.jsx**: En centraliserad datakälla (array) som innehåller titlar, ikoner och sökvägar (paths) för alla menyval.

## Funktioner och Logik
- **Dynamisk Meny**: Menyn skapas genom att mappa över `menuItems`. 
- **Filtrering**: Innehåller logik för att exkludera specifika vyer från menyn (t.ex. "Session") med `.filter()`.
- **Aktiv länk**: Använder `NavLink` från `react-router-dom` för att automatiskt hantera CSS-klassen `.active` baserat på nuvarande URL.
- **Temaväxling**: Innehåller `ThemeToggle` som kommunicerar med appens globala tema-kontext.