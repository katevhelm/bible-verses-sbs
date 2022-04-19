import React from 'react';

const Dropdown = ({
  options,
  optionsName,
  label,
  selectedValue,
  onSelectedChange,
}) => {
  const list = options.map((option) => {
    return (
      <option key={option.id} value={option.name}>
        {option.name}
      </option>
    );
  });

  return (
    <div>
      <label htmlFor={optionsName}>{label}</label>
      <select
        name={optionsName}
        id={optionsName}
        value={selectedValue}
        onChange={onSelectedChange}
      >
        {list}
      </select>
    </div>
  );
};

export default Dropdown;
