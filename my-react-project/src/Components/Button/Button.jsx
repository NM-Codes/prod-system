import React from 'react';
import './Button.css'

// component for a button with light and dark mode styles
function MyButton({children, onClick, isDarkMode = false, variant = 'default', ...props }){
// Determine base theme (Light/Dark)
    let themeClass = isDarkMode ? 'btn-dark' : 'btn-light';

    if (variant === 'orange'){
        themeClass = 'btn-orange';
    }

    return(
        <button 
        className={`btn-base ${themeClass}`}
        onClick = {onClick}
        {...props} // Spreads other props like 'type' or 'disabled'
        > {children}
        </button>
    )
}

export default MyButton