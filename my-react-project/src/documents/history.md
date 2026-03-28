# History

Dokumentation över historikkomponenten och dess undersystem för att hantera avslutade sessioner.

## Komponentstruktur
- **History.jsx**: Huvudvy som hanterar state för filtrering och sökning.
- **HistoryList.jsx**: Grupperar sessioner efter datum och hanterar redigerings-state (`editingId`).
- **HistoryCard.jsx**: Renderar detaljer för ett arbetspass (titel, kategori, tid, energi).
- **HistoryFilter.jsx**: Innehåller sökfält och kategori-väljare.
- **HistoryEmptyState.jsx**: Hanterar villkorlig rendering för tomma sökresultat eller tom historik.
- **HistoryEditForm.jsx**: Formulär för att ändra sparad data.

## Funktioner
- **Filtrering**: Sökning sker via `startsWith` på kategorinivå.
- **Gruppering**: Använder `reduce` för att sortera sessioner under rätt datumrubrik.
- **Redigering**: Möjlighet att uppdatera titel och kategori via ett draft-objekt.