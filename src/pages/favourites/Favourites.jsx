import { Details } from "../home/HomePage";
import "./Favourites.css";
import { useState } from "react";
import hearticon from "../home/home-imgs/heartclicked.png";

function Favourites({ favouriteMovies, setFavouriteMovies }) {
  const [selectedId, setSelectedId] = useState();

  function selectedIdHandler(id) {
    setSelectedId(id);
  }
  function closeMovieDetails() {
    setSelectedId(null);
  }

  function deleteFavouriteMovie(id) {
    setFavouriteMovies((movies) =>
      movies.filter((movie) => movie.imdbID != id)
    );
  }

  return (
    <div className="favourites-section">
      <h1>Favourites</h1>

      {selectedId ? (
        <Details
          selectedId={selectedId}
          closeMovieDetails={closeMovieDetails}
        />
      ) : (
        <ul className="movies-list">
          {favouriteMovies?.map((movie) => (
            <MovieListItem
              movie={movie}
              selectedIdHandler={selectedIdHandler}
              onDelete={deleteFavouriteMovie}
              key={movie.imdbID}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

function MovieListItem({ movie, selectedIdHandler, onDelete }) {
  const [hover, setHover] = useState(false);
  return (
    <li
      className="movie-item"
      onMouseEnter={() => setHover(!hover)}
      onMouseLeave={() => {
        setHover(!hover);
      }}
    >
      <img className="movie-img" src={movie.Poster} alt="" />
      <div
        className="short-info"
        onClick={() => selectedIdHandler(movie.imdbID)}
      >
        <span className="title">{movie.Title}</span>
        <span className="year-genre">{movie.Year}</span>
      </div>
      {hover && (
        <button
          onClick={() => onDelete(movie.imdbID)}
          className="favourite-button"
        >
          <img src={hearticon} alt="" />
        </button>
      )}
    </li>
  );
}

export default Favourites;
