import { useState } from 'react';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = () => {
        // Implement search logic here
        console.log('Searching for:', searchTerm);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleInputChange}
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default SearchBar;