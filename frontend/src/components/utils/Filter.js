import '../../styles/Filter.css';

const Filter = ({ label, options, selectedValue, handleChange }) => {
  return (
    <div className="generic-filter">
      <label htmlFor="generic-select">{label}:</label>
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