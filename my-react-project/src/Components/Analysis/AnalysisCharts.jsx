import Card from '../Cards/Cards';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const AnalysisCharts = ({ stats, isDark }) => {
  return (
    <>
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

      {/* GRID MED DE FYRA SISTA GRAFERNA/KORTEN */}
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
                <Cell fill="#8b5cf6" /> 
                <Cell fill="#3b82f6" /> 
                <Cell fill="#6366f1" /> 
                <Cell fill="#94a3b8" /> 
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
    </>
  );
};

export default AnalysisCharts;