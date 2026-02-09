# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


# Produktivitetssystem

# User Stories

US 01: Som användare vill jag kunna logga mina aktiviteter under dagen i minuter för att se hur lång tid jag lagt på varje aktivitet.  
K: T1  
K: T2  
K: T3  
K: M1

US 02: Som användare vill jag kunna se min historik över tidigare arbete och produktivitet för att motivera mig själv och förstå mina arbetsmönster.  
K: T3  
K: EP3  
K. M2

US 03: Som användare vill jag kunna ta bort tidigare pass och redigera tid, kategori och titel för ett tidigare pass för att säkerställa att min historik är korrekt  
K: T4

US 04: Som användare vill jag få rekommendationer baserat på mina tidigare energinivåer för att veta när jag arbetar som bäst under dagen.  
K: EP1

US 05: Som användare vill jag kunna se en historik över mina pass, så att jag kan se vad jag har lagt tid på och hur mycket, upptäcka mönster och vanor och förbättra min produktivitet över tid.  
K: EP1  
K: EP2  
K: EP3  
K: T3

US 06: Som användare vill jag kunna navigera enkelt mellan systemets olika vyer så att jag snabbt hittar den funktion eller information jag behöver.  
K: M4

US 07: Som användare vill jag att systemet ska vara anpassat för desktop-skärmar så att jag kan arbeta effektivt med tydliga layout och bra överblick.  
K: A1

US 08: Som användare som lätt fastnar framför skärmen, vill jag enkelt kunna växla till “paus-läge” som döljer mina arbetsuppgifter, så att jag får en mental paus och kommer ihåg att sträcka på mig.  
K: F3

US 09: Som användare vill jag kunna välja bland tre olika fokuslägen som loggas i färger och har anpassade timers för att se en indikation på vilket läge som är aktivt.  
K: F1  
K: F2  
K: F3

US 10: Som användare vill jag att min historik sparas tills nästa gång jag använder hemsidan för att inte förlora min historik.  
K: A4

US 11: Som användare vill jag kunna växla mellan dark/light mode och ändra mina inställningar utefter mina egna preferenser så att appen känns bekväm att använda.  
K: A2  
K: A3

**Egna krav utöver baskrav:**  
US 01: Som användare vill jag att appen automatiskt loggar datum och tid när jag använder timern, så att jag slipper skriva in det manuellt och kan lita på att min historik blir korrekt och konsekvent.

US 02: Som användare vill jag kunna mata in nya tasks via ett inputfält så att jag kan planera och hålla koll på vad jag behöver göra.
