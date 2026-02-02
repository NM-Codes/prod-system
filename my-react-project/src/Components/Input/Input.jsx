import React from 'react'
import './Input.css'

// Input component with dark and light mode support
const Input = ({
  label, error,value, onChange, isDarkMode = false, placeholder, type = 'text', ...rest
}) => {
  // Determine label class based on isDarkMode prop
  const labelClassName = `inputLabel ${isDarkMode ? 'labelDark' : 'labelLight'}`;
  // Determine input field class based on isDarkMode prop and error presence
  const inputClassName = `inputField ${
    isDarkMode ? 'inputDark' : 'inputLight'
  } ${error ? 'inputError' : ''}`;

  return(
    <div className = "inputContainer">
      {/* Conditionally render label if provided */}
      {label && <label className = {labelClassName}>{label}</label>}
      <input 
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className={inputClassName}
      // Spread any additional props
      {...rest} />
      {/*Conditionally render error message if present */}
      {error && (<span className="errorText">{error}</span>)}
    </div>
  );
};

export default Input;