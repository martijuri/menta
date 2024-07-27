import { useState } from "react";
import Select from "react-select";

const FiltroInput = ({ options, placeholder, onSelection, label }) => {
  const [selectedOption, setSelectedOption] = useState(placeholder);

  const handleChange = (option) => {
    setSelectedOption(option);
    onSelection(option.value);
  };

  return (
    <>
      <label>{label}</label>
      <Select
        value={selectedOption}
        onChange={handleChange}
        options={options.map(option => ({
          value: option,
          label: option
        }))}
        placeholder={placeholder}
        isSearchable
      />
    </>
  );
};

export default FiltroInput;
