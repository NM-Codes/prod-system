import  { useState } from 'react';
import './Analysis.css';
import Card from '../Cards/Cards';
import { useTheme } from '../../Contexts/ThemeContext';
import { PiWarningCircle } from "react-icons/pi";
import { PiMedal } from "react-icons/pi";
import { FaFireFlameCurved } from "react-icons/fa6";
import { BsLightningCharge } from "react-icons/bs";
import { LuCalendarDays } from "react-icons/lu";
import { FiClock } from "react-icons/fi";
import { BiStats } from "react-icons/bi";
import { FiTrendingUp } from "react-icons/fi";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { LuBrain } from "react-icons/lu";


const chartData = [
  { name: 'Mån', poäng: 0.034 },
  { name: 'Tis', poäng: 0.012 },
  { name: 'Ons', poäng: 0 },
  { name: 'Tor', poäng: 0 },
  { name: 'Fre', poäng: 0 },
  { name: 'Lör', poäng: 0 },
  { name: 'Sön', poäng: 0 },
];

const energyData = [
  { datum: '16 mars', nivå: 3 },
  { datum: '17 mars', nivå: 2.5 },
];


const Analysis = ({ sessions }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark'
  const [activeFilter, setActiveFilter] = useState('7 dagar');

  // MOCKDATA: En fejkad session så att hasNoSessions blir false
  const mockSessions = [{ id: 1, duration: 25, type: 'Deep Work' }];

  // Logik för att kontrollera om data saknas vi provar med mockdata
  const hasNoSessions = !mockSessions || mockSessions.length === 0;



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

      {/* 2. VILLKORLIG RENDERING */}
      {hasNoSessions ? (
        <div>
          <Card>
            <div className="empty-content-analysis">
                <PiWarningCircle size={60}/>
              <h2>Ingen data tillgänglig</h2>
              <p>Börja logga dina sessioner för att se analys och insikter här.</p>
            </div>
          </Card>
        </div>
      ) : (
        <div>
          {/* HÄR BÖRJAR LAYOUTEN FÖR NÄR DATA FINNS DET STORA PRODUKTIVITETSKORTET */}
            <Card style={{
            background: isDark ? 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)' : '#f5f3ff',
            border: isDark ? 'none' : '1px solid #ddd6fe',
            padding: '30px',
            marginBottom: '20px'
          }}>
             <div className='productivity-card-layout'>
             <div className={`productivity-card-scorecircle ${theme}`}>
                <p className='score-number' style={{ color: isDark ? 'white' : '#4c1d95', margin: 0 }}>18</p>
                <p className='score-label' style={{ color: isDark ? 'white' : '#7c3aed', margin: 0 }}>Poäng</p>
                <PiMedal size={30} style={{color:"gold"}}/>
            </div>

            <div className='productivity-card-text'>
                <h2 style={{ color: isDark ? 'white' : '#2e1065', margin:"0" }}>Produktivitetspoäng</h2>
                <p style={{ color: isDark ? 'rgba(255,255,255,0.7)' : '#5b21b6', margin: '5px 0 20px' }}>
                  Baserat på konsistens, energi och tid
                </p>

            <div className='score-features'>
                <span className='features-label-shortnote'>
                <FaFireFlameCurved size={20} style={{color:"purple"}}/>
                1 dagars streak
                </span>
                 <span className='features-label-shortnote'>
                <BsLightningCharge size={20} style={{color:"gold"}}/>
                3.0 snitt energi
                </span>

            </div>
        </div>
        </div>

          </Card>


          {/* HÄR BÖRJAR LAYOUTEN FÖR DE FYRA KORTEN UNDER PRODUKTIVITETSKORTET */}

          <div className='analsysis-small-cards-stats'>
           <Card>
                <div className='small-card-inner-content'>
                    <div className='small-card-header'>
                        <div className="icon-box blue">
                        <LuCalendarDays/>
                        </div>
                        <h2>Mest produktiv</h2>
                    </div>
                    <p className='small-card-value'>Måndag</p>
                    <p className='small-card-label'>Veckodag</p>
                </div>
           </Card> 

            <Card>
                <div className='small-card-inner-content'>
                    <div className='small-card-header'>
                        <div className="icon-box green">
                        <FiClock />
                        </div>
                        <h2>Peak-tid</h2>
                    </div>
                    <p className='small-card-value'>23.00-24.00</p>
                    <p className='small-card-label'>Flest sessioner</p>
                </div>
           </Card> 

            <Card>
                <div className='small-card-inner-content'>
                    <div className='small-card-header'>
                        <div className="icon-box purple">
                        <BiStats />
                        </div>
                        <h2>Snitt session</h2>
                    </div>
                    <p className='small-card-value'>0m</p>
                    <p className='small-card-label'>Per pass</p>
                </div>
           </Card> 

            <Card>
                <div className='small-card-inner-content'>
                    <div className='small-card-header'>
                        <div className="icon-box orange">
                        <FiTrendingUp />
                        </div>
                        <h2>Streak</h2>
                    </div>
                    <p className='small-card-value'>1 dagar</p>
                    <p className='small-card-label'>I rad</p>
                </div>
           </Card> 



          </div>


{/* HÄR BÖRJAR LAYOUTEN FÖR DET FÖRSTA STORA KORTET MED GRAF*/}

<div className='chart-card-weekly-pattern'>
<Card>
  <div className="small-card-header">
    <h2>Veckomönster</h2>
  </div>
  
  <div style={{ width: '100%', height: 300, marginTop: '20px' }}>
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="colorPoäng" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid 
          strokeDasharray="3 3" 
          vertical={false} 
          stroke={isDark ? "rgba(255,255,255,0.05)" : "#f1f5f9"} 
        />
        <XAxis 
          dataKey="name" 
          axisLine={false} 
          tickLine={false} 
          tick={{ fill: isDark ? '#94a3b8' : '#64748b', fontSize: 12 }}
        />
        <YAxis 
          axisLine={false} 
          tickLine={false} 
          tick={{ fill: isDark ? '#94a3b8' : '#64748b', fontSize: 12 }}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: isDark ? '#1e293b' : '#fff', 
            border: 'none', 
            borderRadius: '8px',
            color: isDark ? '#fff' : '#1e293b' 
          }} 
        />
        <Area 
          type="monotone" 
          dataKey="poäng" 
          stroke="#3b82f6" 
          strokeWidth={3}
          fill="url(#colorPoäng)" 
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
</Card>


{/* HÄR BÖRJAR LAYOUTEN FÖR DE FYRA KORTEN UNDER DEN FÖRSTA STORA GRAFEN */}

<div className="analysis-charts-grid">
    <Card>
      <div className="small-card-header">
      <h2>Timfördelning</h2>
    </div>
    <div style={{ width: '100%', height: 200, marginTop: '20px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid 
            strokeDasharray="3 3" 
            vertical={false} 
            stroke={isDark ? "rgba(255,255,255,0.05)" : "#f1f5f9"} 
          />
          <XAxis 
            dataKey="name" 
            hide={false}
            axisLine={false}
            tickLine={false}
            tick={{ fill: isDark ? '#94a3b8' : '#64748b', fontSize: 10 }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: isDark ? '#94a3b8' : '#64748b', fontSize: 10 }}
          />
          <Tooltip 
            cursor={{fill: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)'}}
            contentStyle={{ 
              backgroundColor: isDark ? '#1e293b' : '#fff', 
              border: 'none', 
              borderRadius: '8px' 
            }} 
          />
          <Bar 
            dataKey="poäng" 
            fill="#8b5cf6"  
            radius={[4, 4, 0, 0]} 
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
    </Card>


    {/* KORT 2: FOKUSLÄGESFÖRDELNING (Donut Chart) */}
<Card>
  <div className="small-card-header">
    <h2 style={{ fontSize: '14px', fontWeight: '600' }}>Fokuslägesfördelning</h2>
  </div>
  
  <div style={{ width: '100%', height: 220, position: 'relative' }}>
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={[
            { name: 'Deep Work', value: 45 },
            { name: 'Möte', value: 25 },
            { name: 'Paus', value: 20 },
            { name: 'Övrigt', value: 10 },
          ]}
          cx="50%"
          cy="50%"
          innerRadius={60}   
          outerRadius={80}
          paddingAngle={8}   
          dataKey="value"
          stroke="none"     
        >
          {/* Färger som matchar vår design */}
          <Cell fill="#8b5cf6" /> {/* Lila */}
          <Cell fill="#3b82f6" /> {/* Blå */}
          <Cell fill="#6366f1" /> {/* Indigo */}
          <Cell fill={isDark ? "#334155" : "#e2e8f0"} /> 
        </Pie>
        <Tooltip 
          contentStyle={{ 
            backgroundColor: isDark ? '#1e293b' : '#fff', 
            border: 'none', 
            borderRadius: '8px',
            fontSize: '12px',
            color: isDark ? '#fff' : '#000'
          }} 
        />
      </PieChart>
    </ResponsiveContainer>
    
    {/* Texten i mitten av donut-hålet */}
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center',
      pointerEvents: 'none'
    }}>
      <p style={{ margin: 0, fontSize: '10px', opacity: 0.5, fontWeight: '600' }}>FOKUS</p>
      <p style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: isDark ? '#fff' : '#1e293b' }}>100%</p>
    </div>
  </div>
</Card>



<Card>
  <div className="small-card-header">
    <h2 style={{ fontSize: '14px', fontWeight: '600' }}>Energitrend</h2>
  </div>
  <div style={{ width: '100%', height: 200, marginTop: '20px' }}>
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={energyData}>
        <CartesianGrid 
          strokeDasharray="3 3" 
          vertical={false} 
          stroke={isDark ? "rgba(255,255,255,0.05)" : "#f1f5f9"} 
        />
        <XAxis 
          dataKey="datum" 
          axisLine={false} 
          tickLine={false} 
          tick={{ fill: isDark ? '#94a3b8' : '#64748b', fontSize: 10 }}
        />
        <YAxis 
          domain={[0, 5]} 
          axisLine={false} 
          tickLine={false} 
          tick={{ fill: isDark ? '#94a3b8' : '#64748b', fontSize: 10 }}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: isDark ? '#1e293b' : '#fff', 
            border: 'none', 
            borderRadius: '8px' 
          }} 
        />
        <Line 
          type="monotone" 
          dataKey="nivå" 
          stroke="#10b981" 
          strokeWidth={3} 
          dot={{ r: 6, fill: '#10b981', strokeWidth: 2, stroke: isDark ? '#1e293b' : '#fff' }} 
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
</Card>



<Card>
  <div className="small-card-header">
    <h2 style={{ fontSize: '14px', fontWeight: '600' }}>Top kategorier</h2>
  </div>
  <div style={{ marginTop: '25px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
      <div style={{ 
        width: '32px', 
        height: '32px', 
        borderRadius: '50%', 
        background: '#8b5cf6', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        color: 'white', 
        fontWeight: 'bold',
        fontSize: '12px'
      }}>1</div>
      <div>
        <h3 style={{ margin: 0, fontSize: '14px', fontWeight: '600' }}>Okategoriserad</h3>
        <p style={{ margin: 0, fontSize: '12px', opacity: 0.5 }}>0m • 4 sessioner • ⚡ 2.5</p>
      </div>
    </div>
  </div>
</Card>
</div>


<div className='insight-wrapper'>
   <Card style={{ 
    background: isDark ? 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)' : '#f8fafc',
    border: isDark ? '1px solid rgba(99, 102, 241, 0.2)' : '1px solid #e2e8f0'
  }}>
    <div className='insight-wrapper-content'>
      <div className='insight-header'>
        <LuBrain size={30}/>
        <h2>Insikter</h2>
      </div>

      <ul className='insights-list'>
        <li>Din mest produktiva tid är <strong>15:00 - 16:00</strong></li>
        <li>Du arbetar bäst på <strong>tisdagar</strong></li>
        <li>Din genomsnittliga energinivå är <strong>2.6/5</strong></li>
        <li className='insight-list-text-icon'>Fortsätt så! Du har en 2-dagars streak<FaFireFlameCurved size={20} style={{color:"purple"}}/></li>
      </ul>
    </div>
   </Card>
</div>


</div>
          
        </div>
      )}
    </div>
  );
};

export default Analysis;