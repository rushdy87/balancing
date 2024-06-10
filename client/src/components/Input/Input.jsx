import { useState } from 'react';

import './Input.scss';

const Input = ({ style, label, type, id, name, placeholder, errorText }) => {
  const [inputValue, setInputValue] = useState(
    type === 'date' ? new Date().toISOString().slice(0, 10) : ''
  );

  const inputChangeHandler = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className='input-container'>
      <div className='input'>
        <label htmlFor={id}>{label}</label>
        <input
          style={style}
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          value={inputValue}
          onChange={inputChangeHandler}
        />
      </div>
      <p className='error-text'>{errorText && errorText}</p>
    </div>
  );
};

export default Input;
