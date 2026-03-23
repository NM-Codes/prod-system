import { useState, useMemo } from 'react';
import './Analysis.css';
import { useTheme } from '../../Contexts/ThemeContext';

// ALLA MODULER detta blir barnen till analysis
import ProductivityScore from './ProductivityScore';
import StatsCards from './StatsCards';
import AnalysisCharts from './AnalysisCharts';
import AnalysisInsights from './AnalysisInsights';
import AnalysisEmptyState from './AnalysisEmptyState'; 

//Vi hämtar in sessions från worksession och finns ej pass har vi en fallback till en tom array för att undvika en krasch
//Hämtar hooken: Vi ropar på useTheme() för att fråga appen: "Vilket läge är vi i nu?
//Om användaren har klickat på "Dark Mode", så blir isDark sant annars är light mode sant
const Analysis = ({ sessions = [] }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  

//Alla uträkningar i denna fil ligger i en usememo för att sidan inte ska laddas om vid minsta lilla klick utan enbart när ett nytt pass exempelvis lagts till och först då ritas grafer och liknande om för att undvika en krasch eller en tugg applikation
  const stats = useMemo(() => {
    if (!sessions || sessions.length === 0) return null;

    //alla startvärden
    //Innan vi börjar analysera användarens data förbereder vi ett antal startvärden och tomma behållare. Vi nollställer räknare för tid och energi, och vi skapar en mall för veckografen så att alla veckodagar finns med från början. Det här säkerställer att vi har en strukturerad plats att spara all information i när vi sedan loopar igenom användarens historik
    const days = ['Sön', 'Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör'];
    const weeklyData = days.map(day => ({ name: day, poäng: 0 }));
    const energyTrend = [];
    const energyMap = { '😫': 1, '🥱': 2, '😐': 3, '😊': 4, '🔥': 5, '🚀': 5 };
    let totalMinutes = 0;
    let totalEnergy = 0;
    let energyCount = 0;
    const hourCounts = {};
    const dayMinutes = {};
    const categoryCounts = {};

    //vi skapar en kopia över alla sessions och sen tar vi och jämför två pass (a,b) och kollar först a och starttid och saknas det så kollar vi a och datum och så har vi ett minusstreck för att skapa en jämförelse med b och då kollar vi ex. tiden så a - b för att se vilken som skapades senast
    const sortedSessions = [...sessions].sort((a, b) => new Date(a.startTime || a.date) - new Date(b.startTime || b.date));

    //efter sortering skapar vi innehåll till varje session med date, dag, klockslag, längd på pass och parseInt avrundar till heltal om det ej finns blir värdet 0
    sortedSessions.forEach(s => {
      const date = new Date(s.startTime || s.date || s.createdAt);
      const dayName = days[date.getDay()];
      const hour = date.getHours();
      const duration = parseInt(s.durationMinutes || 0);

      //find: Letar i weeklyData-lista ('Mån', 'Tis', etc.) efter den dag som matchar dayName
      //dayObj.poäng += duration: Om vi hittar dagen, så plussar vi på passets minuter på den dagens totala poäng
      //(dayMinutes[dayName] || 0): Ta det vi redan har räknat ihop för den här dagen. Om det är första gången vi ser den här dagen, börja på 0
      //hourscount =Här räknar vi hur många pass som har gjorts vid varje klockslag
      //Duration står för passets längd i minuter - passets minuter i den stora potten för all tid användaren någonsin lagt i appen
      const dayObj = weeklyData.find(d => d.name === dayName);
      if (dayObj) dayObj.poäng += duration;

      dayMinutes[dayName] = (dayMinutes[dayName] || 0) + duration;
      hourCounts[hour] = (hourCounts[hour] || 0) + 1;
      totalMinutes += duration;


      //Finns energin sparad under namnet energyLevel? Om inte, kolla under namnet energy
      //rawEnergy är ex. raketen, så tittar koden i din energyMap (ordlistan) och ser att det betyder 5. Då blir energyVal = 5
      //Om energin inte finns i ordlistan (kanske står det "Nivå 3"), så letar den efter siffror i texten det är denna del /\d+/ - letar efter nummer inuti en textsträng. Om det står "Jag är på nivå 4", så hittar den "4
      //Om vi hittade en siffra (match), gör om den till ett riktigt tal (parseInt)Annars, sätt värdet till 0
      //energyVal Det färdiga numret som ritas ut i grafen
      const rawEnergy = s.energyLevel || s.energy; 
      let energyVal = 0;
      if (rawEnergy) {
        if (energyMap[rawEnergy]) energyVal = energyMap[rawEnergy];
        else {
          const match = String(rawEnergy).match(/\d+/);
          energyVal = match ? parseInt(match[0]) : 0;
        }
      }
      
      //!isNaN kollar så det verkligen är siffror 
      //energyVal > 0: Vi vill bara räkna pass där du faktiskt har angett ett mående
      //allt är okej, plussar vi på totalEnergy och ökar energyCount
      //Här skapar vi data och pushar det till energytrend som startar tom
      //date.toLocaleDateString('sv-SE', ...) så vi får ett datum som följer standard
      //day: 'numeric' är dagens datum
      //month 'short' är det korta för månad mars blir mar
      //energy koppas ihop med energyVal som är kopplat ihop med värdet en siffra
      if (!isNaN(energyVal) && energyVal > 0) {
        totalEnergy += energyVal;
        energyCount++;
        energyTrend.push({
          datum: date.toLocaleDateString('sv-SE', { day: 'numeric', month: 'short' }),
          energy: energyVal
        });
      }
      
      //kollar efter fokusläge, annars kategori annars ge det kategorin övrigt
      //vi kikar om vi tidigare har sparat något i denna kategori och har vi det så plussar vi på och finns det ej ger vi det värdet 0
      const cat = s.focusMode || s.category || 'Övrigt';
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    });

    //finns det några loggade minuter och är det över 0 så 
    //vi kollar alla dagar med minuter 
    //vi gör en jämförelse mellan a och ser om det är större än b och är det typ måndag som har fler minuter än tisdag så får måndag möta onsdag  för att se när vi har flest minuter loggade - samma gäller för besthour som kollar om det är ex. klockan 14 vi är mest produktiva
    const bestDay = Object.keys(dayMinutes).length > 0 
      ? Object.keys(dayMinutes).reduce((a, b) => dayMinutes[a] > dayMinutes[b] ? a : b) 
      : "Måndag";
    const bestHour = Object.keys(hourCounts).length > 0 
      ? Object.keys(hourCounts).reduce((a, b) => hourCounts[a] > hourCounts[b] ? a : b) 
      : 9;

      //Här räknar vi ut snitt om sessions längd över alla loggade pass är över 0 så tar vi totalt antal minuter och delar med antalet loggade pass
      //math.round avrundar till närmsta heltal
    const avgSession = sessions.length > 0 ? Math.round(totalMinutes / sessions.length) : 0;
    //snitt på energinivå med toFixed som avrundar till en decimall
    const avgEnergy = energyCount > 0 ? (totalEnergy / energyCount).toFixed(1) : "0";
    //totala antal minuter delat med 12 och lägger till snitt energi som gångrats med 4 för att sedan slås ihop i en rolig produktivitetspoäng
    const prodScore = Math.round((totalMinutes / 12) + (parseFloat(avgEnergy) * 4));
    //obejct.keys tar in antal pass för varje kateogir - använder sen .map för att skapa små objekt med namn och värde (siffra) 
    const pieData = Object.keys(categoryCounts).map(name => ({ name, value: categoryCounts[name] }));
    //räknar också antal pass per kategori den jämför siffror och ser vilka som har högst siffra och visar bara topp tre kategorier 
    const topCategories = Object.entries(categoryCounts).sort(([,a], [,b]) => b - a).slice(0, 3);

    //sammanställning av uträkningar 
    //slice -7 menar med att vi enbart visar de senaste 7 passen
    //totalminutes/60 är alla minuter delat med 60 och tofixed avrundar till en decimal
    //att avsluta med en array som innehåller sessions = Kör bara om alla dessa tunga uträkningar (snitt, grafer, poäng) OM innehållet i sessions har ändrats.
    return {
      weeklyData, prodScore, avgEnergy, bestDay, 
      peakTime: `${bestHour}:00 - ${parseInt(bestHour) + 1}:00`,
      avgSession, pieData, energyTrend: energyTrend.slice(-7), 
      topCategories, totalSessions: sessions.length, totalHours: (totalMinutes / 60).toFixed(1)
    };
  }, [sessions]);

  const hasNoSessions = !sessions || sessions.length === 0 || !stats;

  return (
    <div className="analysis-container">
      <div className="analysis-header">
        <div className="title-section">
          <h1>Analys</h1>
          <p>Djupgående insikter om dina arbetsmönster</p>
        </div>
        
      </div>

      {hasNoSessions ? (
        <AnalysisEmptyState />
      ) : (
        <div className="analysis-content">
          <ProductivityScore stats={stats} theme={theme} isDark={isDark} />
          <StatsCards stats={stats} />
          <AnalysisCharts stats={stats} isDark={isDark} />
          <AnalysisInsights stats={stats} isDark={isDark} />
        </div>
      )}
    </div>
  );
};

export default Analysis;