import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./Contexts/ThemeContext";
import { SettingProvider } from "./Contexts/SettingsContext.jsx";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <SettingProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </SettingProvider>
    </BrowserRouter>
  </StrictMode>,
);
