import { useState } from 'react';

const SearchBar = ({ data, onSearch, searchKey }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = () => {
        const filteredData = data.filter(item =>
            item[searchKey].toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
        onSearch(filteredData);
    };

    return (
        <div className="search-bar-container">
            <input
                type="text"
                placeholder={`Search by ${searchKey}...`}
                value={searchTerm}
                onChange={handleInputChange}
            />
            <button onClick={handleSearch}>Search</button>
            <span className="search-icon" onClick={handleSearch}>
                🔍 {/* Puedes reemplazar esto con un icono de Font Awesome */}
            </span>
        </div>
    );
};

export default SearchBar;