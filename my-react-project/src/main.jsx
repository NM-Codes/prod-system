import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider} from './Contexts/ThemeContext'
import { SettingProvider } from './Contexts/SettingsContext.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <SettingProvider>
  <ThemeProvider>

    <App />

  </ThemeProvider>
  </SettingProvider>
  </StrictMode>
)
