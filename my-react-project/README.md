# Produktivitetssystem

En React-app för att planera uppgifter, följa fokuspass och se historik och produktivitetsanalys.

## Demo

När GitHub Pages-arbetsflödet har körts finns demon på [nm-codes.github.io/prod-system](https://nm-codes.github.io/prod-system/).

Appen sparar inställningar, uppgifter och pass lokalt i webbläsaren. Den använder ingen backend eller inloggning.

## Teknik

- React 19
- React Router
- Vite
- Recharts
- React Icons

## Kör lokalt

```sh
npm ci
npm run dev
```

## Publicering

Varje push till `dev` bygger `my-react-project` och publicerar den till GitHub Pages. Arbetsflödet skapar också en fallback-sida så att direkta länkar till appens vyer fungerar.

## User stories

- Som användare vill jag logga mina aktiviteter i minuter och se hur lång tid jag lagt på varje aktivitet.
- Som användare vill jag se historik över tidigare arbete och produktivitet för att förstå mina arbetsmönster.
- Som användare vill jag kunna redigera och ta bort tidigare pass.
- Som användare vill jag få rekommendationer baserade på mina energinivåer.
- Som användare vill jag navigera enkelt mellan systemets olika vyer.
- Som användare vill jag använda systemet på desktop med tydlig layout och bra överblick.
- Som användare vill jag kunna växla till pausläge.
- Som användare vill jag välja mellan fokuslägen med anpassade timers.
- Som användare vill jag att historik och inställningar sparas till nästa besök.
- Som användare vill jag växla mellan dark och light mode.
- Som användare vill jag att appen loggar datum och tid för mina pass automatiskt.
- Som användare vill jag kunna lägga till och hålla koll på uppgifter.
