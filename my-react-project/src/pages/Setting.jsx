import React from "react"
import './Setting.css'
import Card from './../Components/Cards/Cards'
import Button from '../Components/Button/Button'
import Input from '../Components/Input/Input'
import { useTheme } from '../Contexts/ThemeContext.jsx'
import ThemeToggle from '../Components/ThemeToggle/ThemeToggle.jsx'
import { useSettings } from '../Contexts/SettingsContext.jsx'

import { RxAvatar } from 'react-icons/rx'
import { MdOutlineDateRange } from 'react-icons/md'
import { 
  IoNotificationsOutline,
  IoSunnyOutline,
  IoNotificationsOffOutline, 
  IoEyeOutline, IoSaveOutline, 
  IoEyeOffOutline,
  IoBulbOutline,
} from 'react-icons/io5'
import { LuImport } from "react-icons/lu";
import { CgExport } from "react-icons/cg";
import { IoIosWarning } from "react-icons/io";
import { FiDatabase } from "react-icons/fi";
import { AiFillThunderbolt } from "react-icons/ai";
import { HiOutlineSpeakerWave , HiSpeakerXMark } from 'react-icons/hi2'
import { GoClock } from "react-icons/go";
import { FaRegTrashAlt } from "react-icons/fa";






export default function Setting(){
  const { theme, toggleTheme } = useTheme();
  const themeLabel = theme === 'light' ? 'Ljust läge' : 'Mörkt läge';
  const buttonText = theme === 'light' ? 'Ljust' : 'Mörkt' ;


  const accountStyle = {
  backgroundColor: theme === 'light' ? 'var( --color-account-setting-dark)' : 'var(--color-account-setting-blue)',
  border: theme === 'light' ? '1px solid var(--color-card-dark-border)' : '1px solid var(--color-card-light-border)',
  color: theme === 'light' ? 'var(--color-card-dark-text)': 'var(--color-card-light-text)',
};

  const { timeFormat, setTimeFormat, weekStart, setWeekStart, notifications, updateNotify,
    dailyGoal, setDailyGoal, energyLogging, setEnergyLogging, autoSave, setAutoSave, saveChange, setSaveChange
   } = useSettings();
  

// Helper to convert minutes to "Xh Ym per dag"
const formatGoalHint = (minutes) => {
  // Convert to number and default to 0 if input is empty/invalid
  const totalMinutes = parseInt(minutes, 10) || 0;
  
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return `${h}h ${m}m per dag`;
};


const handleSaveChange = () => {
    setSaveChange(true);
    
    // Save to localStorage
    localStorage.setItem('appSettings', JSON.stringify({
      timeFormat, weekStart, notifications, dailyGoal, energyLogging, autoSave
    }));

    // Turn off the "Saved" state after 2 seconds
    setTimeout(() => {
      setSaveChange(false);
    }, 2000);
  };


  return(
  
    <div className="settings-container">
      <h1 className="settings-title">Inställningar</h1>
      <p className="settings-subtitle">Anpassa din upplevelse och hantera din data</p>
      
      {/* ACCOUNT MANAGEMENT CARD */}
      <div className="settings-grid">
          <Card
             style={accountStyle} title="">
            <div className="account-card-layout">
              {/* column 1: Icon */}
             <div className="column-icon">
                <RxAvatar size={50} />
             </div>

              {/* column 2: Text */}
             <div className="column-text">
                <h3 style={{ color: theme === 'light' ? 'var(--color-card-dark-text)': 'var(--color-card-light-text)' }}> Kontohantering</h3>
                <p style={{color: 'var(--color-text-muted)', fontSize: "0.9rem" }}>
                    Logga in för att synka data mellan enheter och säkerhetskopiera i molnet
                </p>
             </div>

              {/* column 3: Button */}
             <div className="column-button">
                <button className="login-button">
                     Logga in
                </button>
              </div>

            </div>
            <div className={theme === 'light'? 'authentication-dark': 'authentication-light'}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shield w-4 h-4" aria-hidden="true"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path></svg>
                <div className="authentication-description" >Kommande funktion: Användarautentisering och molnsynkronisering</div>
            </div> 
          </Card>
      </div>
      
      {/* --- APPEARANCE CARD --- */}
      <div className="settings-grid2">
          <Card>
        <div className="icon-title-container">
        <div className="card-icon">{<IoSunnyOutline size={22} />}</div>
        <h3 className="card-text">Utseende</h3>
       </div>

            <div className="setting-row">
               <div className="setting-label">
                 <p className="main-label">Tema</p>
                 <p className="sub-label">{themeLabel}</p>
               </div>
              {/* The Toggle Button */}
              <button className="theme-btn" onClick={toggleTheme} >
                 {buttonText}
              </button>
            </div>
          </Card>
          
          {/* --- TIME & CALENDER CARD --- */}
          <Card>
            <div className="icon-title-container">
              <div className="card-icon"> {<MdOutlineDateRange size={22} />}</div>
              <h3 className="card-text">Tid & Kalender</h3>
            </div>
                      
         <div>
          
         </div>

          {/* Time Format Row */}
          <div className="setting-item-group">
            <p className="group-title">Tidsformat</p>
             <div className="button-group">
                <button 
          className={`group-btn ${timeFormat === '24h' ? 'active' : ''}`}
          onClick={() => setTimeFormat('24h')}
        >
          24-timmars
        </button>
        <button 
          className={`group-btn ${timeFormat === '12h' ? 'active' : ''}`}
          onClick={() => setTimeFormat('12h')}
        >
          12-timmars
        </button>
              </div>
          </div>

          {/* Week Start Row */}
          <div className="setting-item-group">
            <p className="group-title">Veckan börjar på</p>
            <div className="button-group">
              <button 
                className={`group-btn ${weekStart === 'Måndag' ? 'active' : ''}`}
                 onClick={() => setWeekStart('Måndag')}
              >
                 Måndag
              </button>
              <button 
                 className={`group-btn ${weekStart === 'Söndag' ? 'active' : ''}`}
                  onClick={() => setWeekStart('Söndag')}
              >
               Söndag
              </button>
            </div>
          </div>
          </Card>
       


 {/* NOTIFICATIONS CARD */}

       <Card>
       <div className="icon-title-container">
        <div className="card-icon"> {<IoNotificationsOutline size={22} />}</div>
        <h3 className="card-text">Notifikationer</h3>
       </div>
        {/* Push Notifications Row */}
        <div className="push-notification">
          <div>
            {notifications.push 
            ? (<IoNotificationsOutline size={22} color="green"/>)
            : (<IoNotificationsOffOutline size={22} />)
            }
            
            </div>
           <div>
            <p className="main-label">Push-notifikationer</p>
          </div>
            <button 
               className={`notification-btn theme-btn ${notifications.push ? 'active' : ''}`} 
               onClick={() => updateNotify('push', !notifications.push)}
            >
              {notifications.push ? 'På' : 'Av'}
            </button>
        </div>
        {/* Notification Sound Row */}
        <div className="push-notification">
            <div>
              {notifications.sound
              ? (<HiOutlineSpeakerWave size={22} color="blue"/>)
              : (<HiSpeakerXMark size={22}/>)}</div>
           <div>
            <p className="main-label">Notifikationsljud</p>
          </div>
            <button 
              className={`notification-btn theme-btn ${notifications.sound ? 'active' : ''}`} 
              onClick={() => updateNotify('sound', !notifications.sound)}
            >
                {notifications.sound ? 'På' : 'Av'}
           </button>
       </div>

  {/* Volume Slider */}
  <div className="volume-section">
    <div className="volume-header">
       <p className="group-title">Volym</p>
       <span className="volume-percentage">{notifications.volume}%</span>
    </div>
    <input 
      type="range" 
      min="0" 
      max="100" 
      value={notifications.volume} 
      className="volume-slider"
      onChange={(e) => updateNotify('volume', parseInt(e.target.value))}
    />
  </div>
  {/* gray underline */}
  <div className="gray-underline"></div>

  {/* Pauspåminnelser */}
  <div className="push-notification">
          <div className="push-notification-icon">{<GoClock size={22} color="orange"/>}</div>
           <div>
            <p className="main-label">Pauspåminnelser</p>
          </div>
            <button 
               className={`notification-btn theme-btn ${notifications.push ? 'active' : ''}`} 
               onClick={() => updateNotify('push', !notifications.push)}
            >
              {notifications.push ? 'På' : 'Av'}
            </button>
        </div>
</Card>

{/* PRODUCTIVITY CARD */}
<Card>
  
  <div className="icon-title-container">
        <div className="card-icon"> {<AiFillThunderbolt size={22} />}</div>
        <h3 className="card-text">Produktivitet</h3>
       </div>
        <div className="setting-item-group">
    <p className="group-title">Dagligt mål (minuter)</p>
    
    <Input
     type="number" 
      value={dailyGoal}
      className="goal-input" style={{height: "30px"}}
      onChange={(e) => setDailyGoal(Number(e.target.value))}
    />
    <p className="sub-label">{formatGoalHint(dailyGoal)}</p>
  </div>

  <div className="push-notification">
    <div className="push-notification-icon">
      {energyLogging
      ? (<IoEyeOutline size={22} color="#980FFA"/>)
      : (<IoEyeOffOutline size={22}/>)
    }
      </div>
    <div>
      <p className="main-label">Energiloggning</p>
      <p className="sub-label">Logga energinivå efter sessioner</p>
    </div>
    <button 
      className={`notification-btn theme-btn ${energyLogging ? 'active' : ''}`}
      onClick={() => setEnergyLogging(!energyLogging)}
    >
      {energyLogging ? 'På' : 'Av'}
    </button>
  </div>

  <div className="push-notification">
    <div className="push-notification-icon">
      <IoSaveOutline size={22} color="green"/>
      </div>
    <div>
      <p className="main-label">Auto-spara</p>
      <p className="sub-label">Spara automatiskt till localStorage</p>
    </div>
    <button 
      className={`notification-btn theme-btn ${autoSave ? 'active' : ''}`}
      onClick={() => setAutoSave(!autoSave)}
    >
      {autoSave ? 'På' : 'Av'}
    </button>
  </div>
</Card>
</div>

{/* SAVE ALL CHANGES BUTTON */}
<div className="save-container">
  <Button onClick={handleSaveChange}> 
  <IoSaveOutline size={18} style={{marginRight: '8px'}} />
  {saveChange ? "Sparat!" : "Spara ändringar"}
</Button>
</div>

{/* DATA MANAGEMENT */}
<Card>
 <div className="icon-title-container">
        <div className="card-icon"> {<FiDatabase size={22} />}</div>
        <h3 className="card-text">Datahantering</h3>
       </div>
  {/* Storage Stats Row */}
  <div className="storage-stats">
    <div>
      <p className="main-label">Lagrad data</p>
      <p className="sub-label">0 tidposter • 0 energiloggar</p>
    </div>
    <div style={{ textAlign: 'right' }}>
      <p className="main-label">0.36 KB</p>
      <p className="sub-label">Total storlek</p>
    </div>
  </div>

  <p className="data-description">
    Exportera dina data till JSON-format för backup eller använd på en annan enhet.
  </p>

  {/* Button Grid */}
  <div className="data-button-grid">
    <button className="data-btn"><CgExport /> Exportera all data</button>
    <button className="data-btn"><CgExport /> Exportera tidposter</button>
    <button className="data-btn"><CgExport /> Exportera energiloggar</button>
    <button className="data-btn"><LuImport /> Importera data</button>
  </div>

  {/* Warning Banner */}
  <div className="data-warning">
    <IoIosWarning size={20} color="#f59e0b" />
    <p>
      <strong>Varning:</strong> Vid import kommer all befintlig data att ersättas. Exportera din nuvarande data först för att skapa en backup.
    </p>
  </div>

  {/* Danger Action */}
  <button 
    className="delete-data-btn"
    onClick={() => {
      if(window.confirm("Är du säker på att du vill radera all data? Detta kan inte ångras.")) {
        localStorage.clear();
        window.location.reload();
      }
    }}
  >
    <FaRegTrashAlt size={18} />
    Radera all data
  </button>
</Card>

{/* Productivity Tips Card - Green Section */}
<div className="tips-container">
  <div className="tips-header">
    <IoBulbOutline size={20} color="orange" />
    <h3>Produktivitetstips</h3>
  </div>
  <ul>
    <li>Sätt realistiska dagliga mål baserat på din arbetsvardag</li>
    <li>Aktivera pauspåminnelser för att undvika utbrändhet</li>
    <li>Exportera din data regelbundet för säkerhetskopior</li>
    <li>Logga energinivåer för att hitta dina mest produktiva tider</li>
  </ul>
</div>

      
        
    </div>
)
}