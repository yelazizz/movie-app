import "./WatchLater.css";
import { Details, MovieItem } from "../home/HomePage";
import { useState } from "react";
import hearticon from "../home/home-imgs/favourite.png";

function WatchLater({
  setWatchedMovies,
  setFavouriteMovies,
  setWatchLater,
  favouriteMovies,
  watchedMovies,
  watchLater,
}) {
  const [selectedId, setSelectedId] = useState(null);

  function watchedMoviesHandler(movie) {
    setWatchedMovies((watched) => [...watched, movie]);
    console.log(watchedMovies);
  }
  function favouriteMoviesHandler(movie) {
    setFavouriteMovies((watched) => [...watched, movie]);
  }
  function watchLaterHandler(movie) {
    setWatchLater((watched) => [...watched, movie]);
  }
  function selectedIdHandler(id) {
    setSelectedId(id);
    setShowInput(false);
  }
  function closeMovieDetails() {
    setSelectedId(null);
  }

  return (
    <div className="watch-later-section">
      <h1>Watch Later</h1>
      {selectedId ? (
        <Details
          selectedId={selectedId}
          closeMovieDetails={closeMovieDetails}
        />
      ) : (
        <ul className="movies-list">
          {watchLater?.map((movie) => (
            <MovieItem
              selectedIdHandler={selectedIdHandler}
              movie={movie}
              key={movie.imdbID}
              onWatched={watchedMoviesHandler}
              watchedMovies={watchedMovies}
              setWatchedMovies={setWatchedMovies}
              onFavourite={favouriteMoviesHandler}
              favouriteMovies={favouriteMovies}
              setFavouriteMovies={setFavouriteMovies}
              onLater={watchLaterHandler}
              selectedId={selectedId}
              watchLater={watchLater}
              setWatchLater={setWatchLater}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default WatchLater;
