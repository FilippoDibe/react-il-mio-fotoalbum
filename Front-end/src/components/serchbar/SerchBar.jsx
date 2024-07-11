import { useState } from 'react';
import axios from 'axios';
import styles from './SerchBar.module.css';

const apiUrl = import.meta.env.VITE_BASE_API_URL;

const SearchBar = ({ onSearchResults }) => {
    const [searchType, setSearchType] = useState('title');
    const [query, setQuery] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const params = searchType === 'title' ? { title: query } : { categoryName: query };
            const response = await axios.get(`${apiUrl}/photo`, { params });
            onSearchResults(response.data);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    return (
        <form onSubmit={handleSearch} className={styles.searchForm}>
            <select 
                value={searchType} 
                onChange={(e) => setSearchType(e.target.value)} 
                className={styles.searchSelect}
            >
                <option value="title">Cerca per Titolo</option>
                <option value="categoryName">Cerca per Categoria</option>
            </select>
            <input
                type="text"
                placeholder={`Cerca per ${searchType === 'title' ? 'Titolo' : 'Categoria'}`}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className={styles.searchInput}
            />
            <button type="submit" className={styles.searchButton}>Cerca</button>
        </form>
    );
};

export default SearchBar;
