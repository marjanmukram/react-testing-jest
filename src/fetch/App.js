import React, { useState } from "react";
import { getMetalGenres } from "./services/music-genres";
import GenreList from "./GenreList";

function App() {
  const [genreList, setGenreList] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFetchMetal = async () => {
    try {
      setGenreList(null);
      setIsLoading(true);
      const genres = await getMetalGenres();
      setGenreList(genres);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='App'>
      <h1> Metal Music Genres </h1>
      <div className='btn-container'>
        <button onClick={handleFetchMetal}> Fetch Some Metal Music !!!!</button>
      </div>
      {error ? <span> Error: {error}</span> : null}
      {isLoading ? <span> Loading ... </span> : null}
      {genreList ? <GenreList genres={genreList} /> : null}
    </div>
  );
}

export default App;
