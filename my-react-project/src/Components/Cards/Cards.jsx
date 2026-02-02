import React from 'react'
import './Cards.css'

// Card component with dark and light mode support
const Card = ({ title, description, icon, isDarkMode = false }) => {
  // Determine the card theme based on isDarkMode prop
  const cardTheme = isDarkMode ? 'card-dark' : 'card-light';
  // Determine the icon theme based on isDarkMode prop
  const iconClass = isDarkMode ? 'card-icon-dark' : 'card-icon-light';


  return (
    // Apply base class and theme-specific class
    <div className={`card-base ${cardTheme}`}>
      {/* Apply icon with theme-specific class */}
      <img src={icon} className={`card-icon-base ${iconClass}`} alt="icon" />
      {/* Conditionally render title if provided */}
      {title && <h3 className="card-title">{title}</h3>}
      <div className="card-content">
        {/* Display description text */}
        {description}
      </div>
    </div>
  );
};

export default Card