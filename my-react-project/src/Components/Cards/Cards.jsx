import React from 'react'
import './Cards.css'
import { useTheme } from '../../Contexts/ThemeContext';

// Card component with dark and light mode support
const Card = ({ title, children, icon}) => {
  const {theme} = useTheme();

  //toggle the cards dark and light mode 
  const cardTheme = theme === 'light' ? 'card-dark' : 'card-light';
  const iconTheme = theme ==='light' ? 'card-icon-dark' : 'card-icon-light';


  return (
    // Apply base class and theme-specific class
    <div className={`card-base ${cardTheme}`}>
      {/* Apply icon with theme-specific class */}
      <img src={icon} className={`card-icon-base ${iconTheme}`} alt="icon" />
      {/* Conditionally render title if provided */}
      {title && <h3 className="card-title">{title}</h3>}
      <div className="card-content">
        {/* Display description text */}
        {children}
      </div>
    </div>
  );
};

export default Card
