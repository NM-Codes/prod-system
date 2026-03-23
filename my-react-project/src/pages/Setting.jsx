import React, { useEffect } from "react";
import "./Setting.css";
import Card from "./../Components/Cards/Cards";
import Button from "../Components/Button/Button";
import Input from "../Components/Input/Input";
import { useTheme } from "../Contexts/ThemeContext.jsx";
import ThemeToggle from "../Components/ThemeToggle/ThemeToggle.jsx";
import { useSettings } from "../Contexts/SettingsContext.jsx";

import { RxAvatar } from "react-icons/rx";
import { MdOutlineDateRange } from "react-icons/md";
import {
  IoNotificationsOutline,
  IoSunnyOutline,
  IoNotificationsOffOutline,
  IoEyeOutline,
  IoSaveOutline,
  IoEyeOffOutline,
  IoBulbOutline,
} from "react-icons/io5";
import { LuImport, LuSaveOff } from "react-icons/lu";
import { CgExport } from "react-icons/cg";
import { IoIosWarning } from "react-icons/io";
import { FiDatabase, FiShield } from "react-icons/fi";
import { AiFillThunderbolt } from "react-icons/ai";
import { HiOutlineSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { GoClock } from "react-icons/go";
import { FaRegTrashAlt } from "react-icons/fa";



export default function Setting() {
  const { theme, toggleTheme } = useTheme();
  const [stats, setStats] = React.useState({
    timeFormat: "24h",
    weekStart: "Måndag",
    notifications: { push: true, sound: true, volume: 50 },
    dailyGoal: 240,
    energyLogging: true,
    autoSave: true,
    sessions: 0,
    logs: 0,
  });

  const {
    timeFormat,
    setTimeFormat,
    weekStart,
    setWeekStart,
    notifications,
    updateNotify,
    dailyGoal,
    setDailyGoal,
    energyLogging,
    setEnergyLogging,
    autoSave,
    setAutoSave,
    saveChange,
    setSaveChange,
    sessions
  } = useSettings();


  const themeLabel = theme === "light" ? "Ljust läge" : "Mörkt läge";
  const buttonText = theme === "light" ? "Ljust" : "Mörkt";



  const accountStyle = {
    backgroundColor:
      theme === "light"
        ? "var(--color-account-setting-blue)"
        : "var(--color-account-setting-dark)",
    border:
      theme === "light"
        ? "1px solid var(--color-card-light-border)"
        : "1px solid var(--color-card-dark-border)",
    color:
      theme === "light"
        ? "var(--color-card-light-text)"
        : "var(--color-card-dark-text)",
  };

  

  // Helper to convert minutes to "Xh Ym per day"
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
    localStorage.setItem(
      "appSettings",
      JSON.stringify({
        timeFormat,
        weekStart,
        notifications,
        dailyGoal,
        energyLogging,
        autoSave,
      }),
    );
    // Turn off the "Saved" state after 2 seconds
    setTimeout(() => {
      setSaveChange(false);
    }, 2000);
  };

  // Auto-Save
  useEffect(() => {
    // Only execute if autoSave is enabled
    if (autoSave) {
      const settingsToSave = {
        timeFormat,
        weekStart,
        notifications,
        dailyGoal,
        energyLogging,
        autoSave,
      };
      localStorage.setItem("appSettings", JSON.stringify(settingsToSave));
      console.log("Inställningar sparades automatiskt");
    }
    // This array tells React to run the effect whenever these change:
  }, [timeFormat, weekStart, notifications, dailyGoal, energyLogging, autoSave]);


  //Export EnergiLogging
  const formatTimeOnly = (isoString) => {
    if (!isoString) return "--:--";
    const date = new Date(isoString);

    return date.toLocaleTimeString('sv-SE', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  useEffect(() => {
    const savedSessions = JSON.parse(localStorage.getItem("sessions") || "[]");
    const logs = savedSessions.filter(s => s.energyLevel != null).length;
    setStats(prev => ({ ...prev, sessions: savedSessions.length, logs }));
  }, [sessions]);

  const sessionCount = sessions.length;
  const energyLogCount = sessions.filter(s => s.energyLevel != null).length;

  const exportEnergyLogs = () => {
    if (!sessions || sessions.length === 0) {
      alert("Ingen sessionsdata hittades att exportera.");
      return;
    }
    // Filter out only sessions that have an energy level
    const energyLogs = sessions
      .filter(s => s.energyLevel !== null && s.energyLevel !== "")
      .map(s => ({
        date: s.date,
        startTime: formatTimeOnly(s.startTime),
        endTime: formatTimeOnly(s.endTime),
        energyLevel: s.energyLevel,
        title: s.title,
        duration: s.duration || s.durationMinutes,
        category: s.category,
        sessionType: s.sessionType,

      }));

    if (energyLogs.length === 0) {
      alert("Inga energiloggar hittades i dina sparade sessioner.");
      return;
    }
    //Create the download
    const dataStr = JSON.stringify(energyLogs, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `energiloggar_${new Date().toLocaleDateString()}.json`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };



  return (
    <div className={`settings-container ${theme}`}>
      <h1 className="settings-title">Inställningar</h1>
      <p className="settings-subtitle">
        Anpassa din upplevelse och hantera din data
      </p>

      {/* ACCOUNT MANAGEMENT CARD */}
      <div className="settings-grid">
        <Card style={accountStyle} title="">
          <div className="account-card-layout">
            {/* column 1: Icon */}
            <div className="column-icon">
              <RxAvatar size={50} />
            </div>

            {/* column 2: Text */}
            <div className="column-text">
              <h3 className="main-label">
                Kontohantering
              </h3>
              <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem" }}>
                Logga in
              </p>
            </div>

            {/* column 3: Button */}
            <div className="column-button">
              <Button >Logga in</Button>
            </div>
          </div>
          <div
            className={
              theme === "light" ? "authentication-light" : "authentication-dark"
            }
          >
            <div className="card-icon">{<FiShield size={22} />}</div>
            <div className="authentication-description">
              Kommande funktion: Användarautentisering och molnsynkronisering
            </div>
          </div>
        </Card>
      </div>

      {/* --- APPEARANCE CARD --- */}
      <div className="settings-grid2">
        <Card >
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
            <Button className="theme-btn" onClick={toggleTheme}>
              {buttonText}
            </Button>
          </div>
        </Card>

        {/* --- TIME & CALENDER CARD --- */}
        <Card>
          <div className="icon-title-container">
            <div className="card-icon"> {<MdOutlineDateRange size={22} />}</div>
            <h3 className="card-text">Tid & Kalender</h3>
          </div>

          <div></div>

          {/* Time Format Row */}
          <div className="setting-item-group">
            <p className="group-title">Tidsformat</p>
            <div className="button-group">
              <Button
                className={`group-btn ${timeFormat === "24h" ? "active" : ""}`}
                onClick={() => setTimeFormat("24h")}
              >
                24-timmars
              </Button>
              <Button
                className={`group-btn ${timeFormat === "12h" ? "active" : ""}`}
                onClick={() => setTimeFormat("12h")}
              >
                12-timmars
              </Button>
            </div>
          </div>

          {/* Week Start Row */}
          <div className="setting-item-group">
            <p className="group-title">Veckan börjar på</p>
            <div className="button-group">
              <Button
                className={`group-btn ${weekStart === "Måndag" ? "active" : ""}`}
                onClick={() => setWeekStart("Måndag")}
              >
                Måndag
              </Button>
              <Button
                className={`group-btn ${weekStart === "Söndag" ? "active" : ""}`}
                onClick={() => setWeekStart("Söndag")}
              >
                Söndag
              </Button>
            </div>
          </div>
        </Card>

        {/* NOTIFICATIONS CARD */}

        <Card>
          <div className="icon-title-container">
            <div className="card-icon">
              {" "}
              {<IoNotificationsOutline size={22} />}
            </div>
            <h3 className="card-text">Notifikationer</h3>
          </div>
          {/* Push Notifications Row */}
          <div className="push-notification">
            <div>
              {notifications.push ? (
                <IoNotificationsOutline size={22} color="green" />
              ) : (
                <IoNotificationsOffOutline size={22} />
              )}
            </div>
            <div>
              <p className="main-label">Push-notifikationer</p>
            </div>
            <Button
              className={`notification-btn theme-btn ${notifications.push ? "active" : ""}`}
              onClick={() => updateNotify("push", !notifications.push)}
            >
              {notifications.push ? "På" : "Av"}
            </Button>
          </div>
          {/* Notification Sound Row */}
          <div className="push-notification">
            <div>
              {notifications.sound ? (
                <HiOutlineSpeakerWave size={22} color="blue" />
              ) : (
                <HiSpeakerXMark size={22} />
              )}
            </div>
            <div>
              <p className="main-label">Notifikationsljud</p>
            </div>
            <Button
              className={`notification-btn theme-btn ${notifications.sound ? "active" : ""}`}
              onClick={() => updateNotify("sound", !notifications.sound)}
            >
              {notifications.sound ? "På" : "Av"}
            </Button>
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
              onChange={(e) => updateNotify("volume", parseInt(e.target.value))}
            />
          </div>
          {/* gray underline */}
          <div className="gray-underline"></div>

          {/* Pauspåminnelser */}
          <div className="push-notification">
            <div className="push-notification-icon">
              {<GoClock size={22} color="orange" />}
            </div>
            <div>
              <p className="main-label">Pauspåminnelser</p>
            </div>
            <Button
              className={`notification-btn theme-btn ${notifications.push ? "active" : ""}`}
              onClick={() => updateNotify("push", !notifications.push)}
            >
              {notifications.push ? "På" : "Av"}
            </Button>
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
              className="goal-input"
              style={{ height: "30px" }}
              onChange={(e) => setDailyGoal(Number(e.target.value))}
            />
            <p className="sub-label">{formatGoalHint(dailyGoal)}</p>
          </div>

          <div className="push-notification">
            <div className="push-notification-icon">
              {energyLogging ? (
                <IoEyeOutline size={22} color="#980FFA" />
              ) : (
                <IoEyeOffOutline size={22} />
              )}
            </div>
            <div>
              <p className="main-label">Energiloggning</p>
              <p className="sub-label">Logga energinivå efter sessioner</p>
            </div>
            <Button
              className={`notification-btn theme-btn ${energyLogging ? "active" : ""}`}
              onClick={() => setEnergyLogging(!energyLogging)}
            >
              {energyLogging ? "På" : "Av"}
            </Button>
          </div>

          <div className="push-notification">
            <div className="push-notification-icon">
              {autoSave ? < IoSaveOutline size={22} color="green" /> : < LuSaveOff size={22} />}
            </div>
            <div>
              <p className="main-label">Auto-spara</p>
              <p className="sub-label">Spara automatiskt till localStorage</p>
            </div>
            <Button
              className={`notification-btn theme-btn ${autoSave ? "active" : ""}`}
              onClick={() => {
                const newValue = !autoSave;
                setAutoSave(newValue);
                if (newValue) {
                  localStorage.setItem(
                    "appSettings",
                    JSON.stringify({
                      timeFormat, weekStart, notifications, dailyGoal, energyLogging, autoSave: true
                    })
                  );
                }
              }}
            >
              {autoSave ? "På" : "Av"}
            </Button>
          </div>
        </Card>
      </div>

      {/* SAVE ALL CHANGES BUTTON */}
      <div className="save-container">
        <Button onClick={handleSaveChange}>
          <IoSaveOutline size={18} style={{ marginRight: "8px" }} />
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
            <p className="sub-label">{sessionCount} tidposter • {energyLogCount} energiloggar</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p className="main-label">0.36 KB</p>
            <p className="sub-label">Total storlek</p>
          </div>
        </div>

        <p className="data-description">
          Exportera dina data till JSON-format för backup eller använd på en
          annan enhet.
        </p>

        {/* Button Grid */}
        <div className="data-button-grid">
          <Button className="data-btn">
            <CgExport /> Exportera all data
          </Button>
          <Button className="data-btn">
            <CgExport /> Exportera tidposter
          </Button>
          <Button className="data-btn" onClick={exportEnergyLogs}>
            <CgExport /> Exportera energiloggar
          </Button>
          <Button className="data-btn">
            <LuImport /> Importera data
          </Button>
        </div>

        {/* Warning Banner */}
        <div className="data-warning">
          <IoIosWarning size={20} color="#f59e0b" />
          <p>
            <strong>Varning:</strong> Vid import kommer all befintlig data att
            ersättas. Exportera din nuvarande data först för att skapa en
            backup.
          </p>
        </div>

        {/* Danger Action */}
        <Button
          className="delete-data-btn"
          onClick={() => {
            if (
              window.confirm(
                "Är du säker på att du vill radera all data? Detta kan inte ångras.",
              )
            ) {
              localStorage.clear();
              window.location.reload();
            }
          }}
        >
          <FaRegTrashAlt size={18} />
          Radera all data
        </Button>
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
  );
}
