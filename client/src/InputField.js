import React from 'react';

const InputField = ({ type, placeholder, value, onChange, ariaLabel, error }) => {
  return (
    <div>
      <label className={error ? 'label error' : 'label'}>
        {placeholder}:
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          aria-label={ariaLabel}
        />
      </label>
      {error && <p className="error-text">{error}</p>}
    </div>
  );
}

export default InputField;
