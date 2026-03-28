# Analysis

Dokumentation över analysmodulen som beräknar och visualiserar användarens produktivitetsdata.

## Komponentstruktur
- **Analysis.jsx**: Huvudkomponent som innehåller den tunga beräkningslogiken via `useMemo`.
- **ProductivityScore.jsx**: Visar den sammanvägda poängen baserat på tid, konsistens och energi.
- **StatsCards.jsx**: Fyra snabbkort som visar Peak-tid, Bästa dag, Snittlängd och Total tid.
- **AnalysisCharts.jsx**: Innehåller grafer för veckomönster (Area), timfördelning (Bar), fokuslägen (Pie) och energitrend (Line).
- **AnalysisInsights.jsx**: Genererar textbaserade insikter baserat på den uträknade statistiken.
- **AnalysisEmptyState.jsx**: Visas när inga sessioner finns lagrade.

## Beräkningslogik
- **useMemo**: Används för att optimera prestanda så att grafer och statistik endast ritas om när `sessions`-arrayen ändras.
- **Energi-mapping**: Omvandlar emojis (😫-🚀) till siffervärden (1-5) för att kunna skapa trender.
- **Produktivitetspoäng**: En algoritm som väger samman total arbetstid med genomsnittlig energinivå.
- **Tidstrender**: Beräknar vilken veckodag och vilket klockslag som har högst frekvens av loggade pass.