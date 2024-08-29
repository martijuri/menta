import { useState } from "react";
import Select from "react-select";


/**
 * FiltroInput - Un componente de selección que permite filtrar opciones.
 *
 * @param {Array} options - Las opciones disponibles para seleccionar.
 * @param {string} placeholder - El texto de marcador de posición para el campo de selección.
 * @param {Function} onSelection - La función que se llama cuando se selecciona una opción.
 * @param {string} label - La etiqueta para el campo de selección.
 *
 * @returns {JSX.Element} El componente de selección.
 */
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
