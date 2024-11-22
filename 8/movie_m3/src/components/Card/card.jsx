import React from 'react';
import * as C from './card.style.js';

const Card = ({ movie }) => {
    return (
        <C.Card>
            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
            <h3>{movie.title}</h3>
            <p>{movie.release_date}</p>
        </C.Card>
    );
};

export default Card; 