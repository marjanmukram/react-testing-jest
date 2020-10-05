import React from "react";

const GenreList = props => {
  return (
    <ul className='genre-list'>
      {props.genres.map(genre => (
        <li key={genre}> {genre} </li>
      ))}
    </ul>
  );
};

export default GenreList;
