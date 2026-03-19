import { it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import '@testing-library/jest-dom';

//Komponenter som testas
import Header from "./Components/Header/Header";
import ThemeToggle from "./Components/ThemeToggle/ThemeToggle";
import Card from "./Components/Cards/Cards";
import HistoryFilter from "./Components/History/HistoryFilter";
import EnergyLogger from "./Components/EnergyLogger/EnergyLogger";

// Importera ThemeProvider den måste finnas med då den ej är en egen funktion i Dashboard utan den renderas innan Dashboard - Vi måste omsluta Dashboard med ThemeProvider eftersom Dashboard (och dess barn) använder useTheme-hooken för att hämta globala inställningar.
import { ThemeProvider } from "./Contexts/ThemeContext";



// TEST 1: HEADERN 
it('Headern ritar ut menyvalet Dashboard', () => {
  render(
    <BrowserRouter>
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    </BrowserRouter>
  );

  // Vi kollar om ordet "Dashboard" finns i headern
  expect(screen.getByText("Dashboard")).toBeInTheDocument();
});





//TEST 2: KOLLAR ATT ALT-TEXT FINNS

it('ThemeToggle visar sin knapp-bild', () => {
  render(
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>
  );

  // Vi letar bara efter alt-texten. Finns den, så fungerar komponenten!
  expect(screen.getByAltText("Toggle Theme")).toBeInTheDocument();
});






//TEST 3: CARD VISAR TITEL

it('Card visar sin titel', () => {
  render(
    <ThemeProvider>
      <Card title="Min Rubrik" />
    </ThemeProvider>
  );

  // Vi kollar bara om texten vi skickade in som titel finns där
  expect(screen.getByText("Min Rubrik")).toBeInTheDocument();
});





//TEST 4: KOLLA DROPDOWN MENYN I HISTORYFILTER

it('HistoryFilter har alternativet Deep work i dropdownen', () => {
  render(
    <ThemeProvider>
      <HistoryFilter />
    </ThemeProvider>
  );

  // Vi letar efter texten i ett av våra <option>-element så vi måste hämta in option
  const option = screen.getByText("Deep work");
  expect(option).toBeInTheDocument();
});




//TEST 5: OM VI KLICKAR PÅ EN EMOJI I ENERGYLOGGER SÅ SKA VI HITTA TILLHÖRANDE SIFFRA EX. KLICKAR MAN PÅ RAKET SKA MAN HITTA SIFFRAN 5 - KOLLA ATT KOPPLING MELLAN EMOJI OCH NIVÅ FINNS

it('5. EnergyLogger visar rätt siffra för raket-emojin', () => {
  render(<EnergyLogger />);

  //vi hämtar knappen med emojin vi vill testa
  const rocketEmoji = screen.getByText("🚀");
  //vi hämtar in siffran
  const levelFive = screen.getByText("5");
  //vi kontrollerar att de båda finns att hitta i dokumentet
  expect(rocketEmoji).toBeInTheDocument();
  expect(levelFive).toBeInTheDocument();
});
