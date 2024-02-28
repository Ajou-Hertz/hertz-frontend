import React, { useState } from 'react';

const DropdownMenu = ({ options, onSelect, defaultOptionText }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelect = (e) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);
    onSelect(selectedValue);
  };

  return (
    <select value={selectedOption} onChange={handleSelect} style={{ backgroundColor: '#D6E0F3', border: '1px solid white', textAlign: 'center' }}>
      <option value="">{defaultOptionText}</option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default DropdownMenu;
