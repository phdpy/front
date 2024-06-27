import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/List.css';

const List = () => {
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${(page - 1) * itemsPerPage}&limit=${itemsPerPage}`)
      .then(response => {
        const fetches = response.data.results.map(pokemon =>
          axios.get(pokemon.url).then(res => res.data)
        );

        Promise.all(fetches).then(results => {
          setPokemons(results);
          setTotalPages(Math.ceil(response.data.count / itemsPerPage));
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [page]);

  const nextPage = () => {
    setPage(prevPage => (prevPage < totalPages ? prevPage + 1 : prevPage));
  };

  const prevPage = () => {
    setPage(prevPage => (prevPage > 1 ? prevPage - 1 : 1));
  };

  return (
    <div className="list-container">
      <div className="list-items">
        {pokemons.map(pokemon => (
          <div className="list-item" key={pokemon.name}>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <div>
              <p>{pokemon.name}</p>
              <Link to={`/detail/${pokemon.name}`}>View Details</Link>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={prevPage} disabled={page === 1}>Previous</button>
        <button onClick={nextPage} disabled={page === totalPages}>Next</button>
      </div>
    </div>
  );
};

export default List;
