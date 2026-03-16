import React from 'react';
// Här importerar vi komponenten (vi kan kalla den AnalysisComponent för tydlighet)
import AnalysisComponent from '../Components/Analysis/Analysis'; 

const AnalysisPage = ({ sessions }) => {
  return (
    <div className="page-container">
      {/* Här använder vi den importerade komponenten */}
      <AnalysisComponent sessions={sessions} />
    </div>
  );
};

export default AnalysisPage;