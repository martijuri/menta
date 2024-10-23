import { useState, useEffect } from 'react';
import '../../styles/SearchBar.css'; 

const SearchBar = ({ data, onSearch, searchKey, searchOnChange = false }) => {
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

    useEffect(() => {
        if (searchOnChange) {
            handleSearch();
        }
    }, [searchTerm]);

    return (
        <div className="search-bar-container">
            <input
                type="text"
                placeholder={`Buscar por ${searchKey}...`}
                value={searchTerm}
                onChange={handleInputChange}
            />
            {!searchOnChange && (
                <>
                    <button onClick={handleSearch}>Buscar</button>
                    <span className="search-icon" onClick={handleSearch}>
                        🔍 {/* Puedes reemplazar esto con un icono de Font Awesome */}
                    </span>
                </>
            )}
        </div>
    );
};

export default SearchBar;