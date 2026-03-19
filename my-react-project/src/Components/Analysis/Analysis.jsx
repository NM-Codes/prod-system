import { useState, useMemo } from 'react';
import './Analysis.css';
import Card from '../Cards/Cards';
import { useTheme } from '../../Contexts/ThemeContext';
import { PiWarningCircle, PiMedal } from "react-icons/pi";
import { FaFireFlameCurved } from "react-icons/fa6";
import { BsLightningCharge } from "react-icons/bs";
import { LuCalendarDays, LuBrain } from "react-icons/lu";
import { FiClock, FiTrendingUp } from "react-icons/fi";
import { BiStats } from "react-icons/bi";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const Analysis = ({ sessions = [] }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [activeFilter, setActiveFilter] = useState('7 dagar');

  // --- LOGIK FÖR ATT HÄMTA DATA ---
  const stats = useMemo(() => {
    if (!sessions || sessions.length === 0) return null;

    const days = ['Sön', 'Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör'];
    const weeklyData = days.map(day => ({ name: day, poäng: 0 }));
    const energyTrend = [];
    
    // Översättningstabell för emojis till siffervärden (1-5)
    const energyMap = {
      '😫': 1, '🥱': 2, '😐': 3, '😊': 4, '🔥': 5, '🚀': 5
    };

    let totalMinutes = 0;
    let totalEnergy = 0;
    let energyCount = 0;
    const hourCounts = {};
    const dayMinutes = {};
    const categoryCounts = {};

    // Sortera sessioner efter datum för trendlinjen
    const sortedSessions = [...sessions].sort((a, b) => new Date(a.startTime || a.date) - new Date(b.startTime || b.date));

    sortedSessions.forEach(s => {
      const date = new Date(s.startTime || s.date || s.createdAt);
      const dayName = days[date.getDay()];
      const hour = date.getHours();
      const duration = parseInt(s.durationMinutes || 0);

      // Veckomönster
      const dayObj = weeklyData.find(d => d.name === dayName);
      if (dayObj) dayObj.poäng += duration;

      // Småkort & Statistik
      dayMinutes[dayName] = (dayMinutes[dayName] || 0) + duration;
      hourCounts[hour] = (hourCounts[hour] || 0) + 1;
      totalMinutes += duration;

      // Energi-hantering (Emoji till Siffra-konvertering)
      const rawEnergy = s.energyLevel || s.energy; 
      let energyVal = 0;

      if (rawEnergy) {
        if (energyMap[rawEnergy]) {
          energyVal = energyMap[rawEnergy];
        } else {
          const match = String(rawEnergy).match(/\d+/);
          energyVal = match ? parseInt(match[0]) : 0;
        }
      }
      
      if (!isNaN(energyVal) && energyVal > 0) {
        totalEnergy += energyVal;
        energyCount++;
        energyTrend.push({
          datum: date.toLocaleDateString('sv-SE', { day: 'numeric', month: 'short' }),
          energy: energyVal
        });
      }

      // Kategorier
      const cat = s.focusMode || s.category || 'Övrigt';
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    });

    const bestDay = Object.keys(dayMinutes).length > 0 
      ? Object.keys(dayMinutes).reduce((a, b) => dayMinutes[a] > dayMinutes[b] ? a : b) 
      : "Måndag";

    const bestHour = Object.keys(hourCounts).length > 0 
      ? Object.keys(hourCounts).reduce((a, b) => hourCounts[a] > hourCounts[b] ? a : b) 
      : 9;

    const avgSession = sessions.length > 0 ? Math.round(totalMinutes / sessions.length) : 0;
    const avgEnergy = energyCount > 0 ? (totalEnergy / energyCount).toFixed(1) : "0";
    const prodScore = Math.round((totalMinutes / 12) + (parseFloat(avgEnergy) * 4));

    const pieData = Object.keys(categoryCounts).map(name => ({ name, value: categoryCounts[name] }));
    
    const topCategories = Object.entries(categoryCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3);

    return {
      weeklyData,
      prodScore,
      avgEnergy,
      bestDay,
      peakTime: `${bestHour}:00 - ${parseInt(bestHour) + 1}:00`,
      avgSession,
      pieData,
      energyTrend: energyTrend.slice(-7), 
      topCategories,
      totalSessions: sessions.length,
      totalHours: (totalMinutes / 60).toFixed(1)
    };
  }, [sessions]);

  const hasNoSessions = !sessions || sessions.length === 0;

  return (
    <div className="analysis-container">
      <div className="analysis-header">
        <div className="title-section">
          <h1>Analys</h1>
          <p>Djupgående insikter om dina arbetsmönster</p>
        </div>
        
        <div className={`filter-group ${theme}`}>
          {['7 dagar', '30 dagar', 'Allt'].map((f) => (
            <button 
              key={f} 
              className={`filter-btn ${activeFilter === f ? 'active' : ''}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {hasNoSessions ? (
        <Card>
          <div className="empty-content-analysis">
            <PiWarningCircle size={60}/>
            <h2>Ingen data tillgänglig</h2>
            <p>Börja logga dina sessioner för att se analys och insikter här.</p>
          </div>
        </Card>
      ) : (
        <div className="analysis-content">
          {/* PRODUKTIVITETSKORTET */}
          <Card style={{
            background: isDark ? 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)' : '#f5f3ff',
            border: isDark ? 'none' : '1px solid #ddd6fe',
            padding: '30px',
            marginBottom: '20px'
          }}>
            <div className='productivity-card-layout'>
              <div className={`productivity-card-scorecircle ${theme}`}>
                <p className='score-number' style={{ color: isDark ? 'white' : '#4c1d95', margin: 0 }}>{stats.prodScore}</p>
                <p className='score-label' style={{ color: isDark ? 'white' : '#7c3aed', margin: 0 }}>Poäng</p>
                <PiMedal size={30} style={{color:"gold"}}/>
              </div>
              <div className='productivity-card-text'>
                <h2 style={{ color: isDark ? 'white' : '#2e1065', margin:"0" }}>Produktivitetspoäng</h2>
                <p style={{ color: isDark ? 'rgba(255,255,255,0.7)' : '#5b21b6', margin: '5px 0 20px' }}>Baserat på konsistens, energi och tid</p>
                <div className='score-features'>
                  <span className='features-label-shortnote'>
                    <FaFireFlameCurved size={20} style={{color:"purple", marginRight: '5px'}}/>
                    {stats.totalSessions} pass
                  </span>
                  <span className='features-label-shortnote'>
                    <BsLightningCharge size={20} style={{color:"gold", marginRight: '5px'}}/>
                    {stats.avgEnergy} snitt energi
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* DE FYRA SMÅ KORTEN */}
          <div className='analsysis-small-cards-stats'>
            <Card>
              <div className='small-card-inner-content'>
                <div className='small-card-header'><div className="icon-box blue"><LuCalendarDays/></div><h2>Mest produktiv</h2></div>
                <p className='small-card-value'>{stats.bestDay}</p>
                <p className='small-card-label'>Veckodag</p>
              </div>
            </Card> 
            <Card>
              <div className='small-card-inner-content'>
                <div className='small-card-header'><div className="icon-box green"><FiClock /></div><h2>Peak-tid</h2></div>
                <p className='small-card-value'>{stats.peakTime}</p>
                <p className='small-card-label'>Flest sessioner</p>
              </div>
            </Card> 
            <Card>
              <div className='small-card-inner-content'>
                <div className='small-card-header'><div className="icon-box purple"><BiStats /></div><h2>Snitt session</h2></div>
                <p className='small-card-value'>{stats.avgSession}m</p>
                <p className='small-card-label'>Per pass</p>
              </div>
            </Card> 
            <Card>
              <div className='small-card-inner-content'>
                <div className='small-card-header'><div className="icon-box orange"><FiTrendingUp /></div><h2>Total tid</h2></div>
                <p className='small-card-value'>{stats.totalHours}h</p>
                <p className='small-card-label'>Loggad tid</p>
              </div>
            </Card> 
          </div>

          {/* VECKOMÖNSTER GRAF */}
          <div className='chart-card-weekly-pattern'>
            <Card>
              <div className="small-card-header"><h2>Veckomönster</h2></div>
              <div style={{ width: '100%', height: 300, marginTop: '20px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={stats.weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorPoäng" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/><stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? "rgba(255,255,255,0.05)" : "#f1f5f9"} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: isDark ? '#94a3b8' : '#64748b', fontSize: 12 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: isDark ? '#94a3b8' : '#64748b', fontSize: 12 }} />
                    <Tooltip contentStyle={{ backgroundColor: isDark ? '#1e293b' : '#fff', border: 'none', borderRadius: '8px' }} />
                    <Area type="monotone" dataKey="poäng" stroke="#3b82f6" strokeWidth={3} fill="url(#colorPoäng)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          {/* GRID MED DE FYRA SISTA KORTEN */}
          <div className="analysis-charts-grid">
            <Card>
              <div className="small-card-header"><h2>Timfördelning</h2></div>
              <div style={{ width: '100%', height: 200, marginTop: '20px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats.weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? "rgba(255,255,255,0.05)" : "#f1f5f9"} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: isDark ? '#94a3b8' : '#64748b', fontSize: 10 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: isDark ? '#94a3b8' : '#64748b', fontSize: 10 }} />
                    <Tooltip cursor={{fill: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)'}} contentStyle={{ backgroundColor: isDark ? '#1e293b' : '#fff', border: 'none', borderRadius: '8px' }} />
                    <Bar dataKey="poäng" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card>
              <div className="small-card-header"><h2>Fokuslägesfördelning</h2></div>
              <div style={{ width: '100%', height: 220, position: 'relative' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={stats.pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={8} dataKey="value" stroke="none">
                      <Cell fill="#8b5cf6" /><Cell fill="#3b82f6" /><Cell fill="#6366f1" /><Cell fill={isDark ? "#334155" : "#e2e8f0"} />
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: isDark ? '#1e293b' : '#fff', border: 'none', borderRadius: '8px' }} />
                  </PieChart>
                </ResponsiveContainer>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', pointerEvents: 'none' }}>
                  <p style={{ margin: 0, fontSize: '10px', opacity: 0.5, fontWeight: '600' }}>PASS</p>
                  <p style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: isDark ? '#fff' : '#1e293b' }}>{stats.totalSessions}</p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="small-card-header">
                <h2 style={{ fontSize: '14px', fontWeight: '600' }}>Energitrend</h2>
              </div>
              <div style={{ width: '100%', height: 200, marginTop: '20px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={stats.energyTrend}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? "rgba(255,255,255,0.05)" : "#f1f5f9"} />
                    <XAxis dataKey="datum" axisLine={false} tickLine={false} tick={{ fill: isDark ? '#94a3b8' : '#64748b', fontSize: 10 }} />
                    <YAxis domain={[0, 5]} tickCount={6} axisLine={false} tickLine={false} tick={{ fill: isDark ? '#94a3b8' : '#64748b', fontSize: 10 }} />
                    <Tooltip contentStyle={{ backgroundColor: isDark ? '#1e293b' : '#fff', border: 'none', borderRadius: '8px' }} />
                    <Line type="monotone" dataKey="energy" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: isDark ? '#1e1b4b' : '#fff' }} activeDot={{ r: 6 }} connectNulls={true} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card>
              <div className="small-card-header"><h2>Top kategorier</h2></div>
              <div style={{ marginTop: '25px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {stats.topCategories.map(([name, count], index) => (
                  <div key={name} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: index === 0 ? '#8b5cf6' : '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '12px' }}>{index + 1}</div>
                    <div>
                      <h3 style={{ margin: 0, fontSize: '14px', fontWeight: '600' }}>{name}</h3>
                      <p style={{ margin: 0, fontSize: '12px', opacity: 0.5 }}>{count} sessioner</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* INSIKTER */}
          <div className='insight-wrapper'>
            <Card style={{ background: isDark ? 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)' : '#f8fafc', border: isDark ? '1px solid rgba(99, 102, 241, 0.2)' : '1px solid #e2e8f0' }}>
              <div className='insight-wrapper-content'>
                <div className='insight-header'><LuBrain size={30}/><h2>Insikter</h2></div>
                <ul className='insights-list'>
                  <li>Din mest produktiva tid är <strong>{stats.peakTime}</strong></li>
                  <li>Du arbetar bäst på <strong>{stats.bestDay}dagar</strong></li>
                  <li>Din genomsnittliga energinivå är <strong>{stats.avgEnergy}/5</strong></li>
                  <li className='insight-list-text-icon'>Fortsätt så! Bra jobbat med dina {stats.totalSessions} sessioner! <FaFireFlameCurved size={20} style={{color:"purple"}}/></li>
                </ul>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analysis;