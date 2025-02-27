import React, { useState, useEffect } from 'react';
import api from '../api/axiosInstance';
import '../styles/SearchBar.css';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        if (searchTerm.length > 2) { // Solo buscar si el usuario ha ingresado más de 2 caracteres
            api.get(`/items/search-as-you-type?query=${searchTerm}`)
                .then((response) => {
                    console.log("Resultados de búsqueda:", response.data); // Log para depuración
                    setSearchResults(response.data);
                })
                .catch((error) => {
                    console.error("Error en búsqueda:", error);
                    setSearchResults([]); // En caso de error, limpiar la lista de resultados
                });
        } else {
            setSearchResults([]);
        }
    }, [searchTerm]);

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-bar__input"
            />

            {/* Mostrar resultados de búsqueda si existen */}
            {searchResults.length > 0 && (
                <ul className="search-results">
                    {searchResults.map((product) => (
                        <li key={product.id} className="search-result-item">
                            {product.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;
