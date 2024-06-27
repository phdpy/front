import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/Detail.css';

const Detail = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(response => {
        setPokemon(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [name]);

  return (
    <div className="detail-container">
      {pokemon ? (
        <div>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <h1>{pokemon.name}</h1>
          <p>Height: {pokemon.height}</p>
          <p>Weight: {pokemon.weight}</p>
          <p>Base Experience: {pokemon.base_experience}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Detail;

