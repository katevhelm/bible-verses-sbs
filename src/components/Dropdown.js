import React from 'react';

const Dropdown = ({
  options,
  valueDisplayed,
  optionsName,
  label,
  selectedValue,
  onSelectedChange,
}) => {
  const list = options.map((option) => {
    return (
      <option key={option.id} value={option[valueDisplayed]} id={option.id}>
        {option[valueDisplayed]}
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
