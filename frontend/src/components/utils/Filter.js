import '../../styles/Filter.css';
import { useEffect, useState } from 'react';

const Filter = ({ label, options, selectedValue, handleChange }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const displayLabel = windowWidth < 426 ? 'Filtrar' : label;

  return (
    <div className="generic-filter">
      <label htmlFor="generic-select">{displayLabel}:</label>
      <select id="generic-select" value={selectedValue} onChange={handleChange}>
        <option value="">Todos</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;