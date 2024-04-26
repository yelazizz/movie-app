import { useEffect, useState } from "react";
import "./HomePage.css";
import searchLogo from "./home-imgs/search.png";
import favourite from "./home-imgs/favourite.png";
import back from "./home-imgs/back.png";
import star from "./home-imgs/star.png";
import heartclickedimg from "./home-imgs/heartclicked.png";

function HomePage({
  setWatchedMovies,
  setFavouriteMovies,
  setWatchLater,
  favouriteMovies,
  watchedMovies,
  watchLater,
}) {
  const [showInput, setShowInput] = useState(false);
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  function watchedMoviesHandler(movie) {
    setWatchedMovies((watched) => [...watched, movie]);
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

  function showInputHandler(e) {
    e.preventDefault();
    setShowInput(!showInput);
  }

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setError("");
          setIsLoading(true);
          const res = await fetch(
            `http://www.omdbapi.com/?s=${query}&apikey=ab546fb5`,
            { signal: controller.signal }
          );
          if (!res.ok)
            throw new Error("Something went wrong with loading movies");
          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found");
          setMovies(data.Search);
          setError("");
        } catch (err) {
          if (err.name !== "AbortError") {
            setError(err.message);
            console.error(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      closeMovieDetails();
      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return (
    <div className="results-section">
      <div className="home-top">
        <span className="search-results-text">Search results</span>
        <form className="search-form" action="">
          {showInput && (
            <input
              className="search-input"
              type="text"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          )}

          <button
            onClick={(e) => {
              showInputHandler(e);
            }}
            className="search-btn clicked"
          >
            <img className="search-logo" src={searchLogo} alt="" />
          </button>
        </form>
      </div>
      {selectedId ? (
        <Details
          selectedId={selectedId}
          closeMovieDetails={closeMovieDetails}
        />
      ) : (
        <div>
          {isLoading && <p className="loading">Loading...</p>}
          {!isLoading && !error && (
            <ul className="movies-list">
              {movies?.map((movie) => (
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
          {error && <p className="error">{error}</p>}
        </div>
      )}
    </div>
  );
}

export function MovieItem({
  movie,
  selectedIdHandler,
  onWatched,
  onFavourite,
  onLater,
  favouriteMovies,
  watchedMovies,
  watchLater,
  setFavouriteMovies,
  setWatchedMovies,
  selectedId,
  setWatchLater,
}) {
  const [hover, setHover] = useState(false);
  const [showAddToaster, setShowAddToaster] = useState(false);
  const [movieDetails, setMovieDetails] = useState({});

  const isFavourite = favouriteMovies
    ?.map((movie) => movie.imdbID)
    .includes(movie.imdbID);

  function showToasterHandler() {
    setShowAddToaster(!showAddToaster);
  }
  useEffect(
    function () {
      async function fetchMovieDetails() {
        const res = await fetch(
          `http://www.omdbapi.com/?i=${movie.imdbID}&apikey=ab546fb5`
        );
        const data = await res.json();
        setMovieDetails(data);
      }
      fetchMovieDetails();
    },
    [movie]
  );

  function addHandler(onAdd) {
    const addedMovie = {
      imdbID: movie.imdbID,
      Title: movie.Title,
      Year: movie.Year,
      Poster: movie.Poster,
      imdbRating: movieDetails.imdbRating,
      Runtime: movie.Runtime,
      Type: movieDetails.Type,
      Review: "",
      MyScore: 0,
    };
    onAdd(addedMovie);
  }
  function deleteHandler(id) {
    const newArray = favouriteMovies.filter((movie) => movie.imdbID !== id);
    setFavouriteMovies(newArray);
  }
  function bothFavouriteWatched() {
    addHandler(onFavourite);
    if (watchedMovies.map((movie) => movie.imdbID).includes(movie.imdbID)) {
      return;
    } else {
      addHandler(onWatched);
    }
  }

  return (
    <li
      className="movie-item"
      onMouseEnter={() => setHover(!hover)}
      onMouseLeave={() => {
        setHover(!hover);
        setShowAddToaster(false);
      }}
    >
      <img className="movie-img" src={movie.Poster} alt="" />
      <div
        onClick={() => selectedIdHandler(movie.imdbID)}
        className="short-info"
      >
        <span className="title">{movie.Title}</span>
        <span className="year-genre">{movie.Year}</span>
      </div>
      {hover && (
        <div>
          <button
            onClick={() => {
              isFavourite
                ? deleteHandler(movie.imdbID)
                : bothFavouriteWatched();
            }}
            className="favourite-button"
          >
            <img src={isFavourite ? heartclickedimg : favourite} alt="" />
          </button>
          <button className="add-button" onClick={() => showToasterHandler()}>
            +
          </button>
          {showAddToaster && (
            <AddToaster
              setShowAddToaster={setShowAddToaster}
              onWatched={onWatched}
              addHandler={addHandler}
              movie={movie}
              watchedMovies={watchedMovies}
              setWatchedMovies={setWatchedMovies}
              onLater={onLater}
              watchLater={watchLater}
              setWatchLater={setWatchLater}
            />
          )}
        </div>
      )}
    </li>
  );
}

export function Details({ selectedId, closeMovieDetails }) {
  const [movieDetails, setMovieDetails] = useState({});

  useEffect(
    function () {
      async function fetchMovieDetails() {
        const res = await fetch(
          `http://www.omdbapi.com/?i=${selectedId}&apikey=ab546fb5`
        );
        const data = await res.json();
        setMovieDetails(data);
        console.log(data);
      }
      fetchMovieDetails();
    },
    [selectedId]
  );

  return (
    <div className="details-section">
      <button className="back-button" onClick={() => closeMovieDetails()}>
        <img src={back} />
      </button>
      <div className="movie-details">
        <img className="movie-details-image" src={movieDetails.Poster} alt="" />
        <div className="movie-details-info">
          <h1>{movieDetails.Title}</h1>
          <div className="year-genre-duration">
            <span className="year">{movieDetails.Year}</span>
            <span className="genre">{movieDetails.Genre}</span>
            <span className="duration">{movieDetails.Runtime}</span>
            <span className="rating">
              <img src={star} alt="" /> {movieDetails.imdbRating}
            </span>
          </div>
          <p>{movieDetails.Plot}</p>
        </div>
      </div>
    </div>
  );
}

function AddToaster({
  setShowAddToaster,
  onWatched,
  addHandler,
  movie,
  watchedMovies,
  setWatchedMovies,
  onLater,
  watchLater,
  setWatchLater,
}) {
  const [watchedClicked, setWatchedClicked] = useState(false);
  const [watchLaterClicked, setWatchLaterClicked] = useState(false);
  function watchedClickedHandler() {
    setWatchedClicked(!watchedClicked);
  }
  function watchLaterHandler() {
    setWatchLaterClicked(!watchLaterClicked);
  }

  const isWatched = watchedMovies
    .map((movie) => movie.imdbID)
    .includes(movie.imdbID);

  const isWatchLater = watchLater
    ?.map((movie) => movie.imdbID)
    .includes(movie.imdbID);

  function deleteWatchedHandler(id) {
    const newArray = watchedMovies.filter((movie) => movie.imdbID !== id);
    setWatchedMovies(newArray);
  }
  function deleteWatchLaterHandler(id) {
    const newArray = watchLater.filter((movie) => movie.imdbID !== id);
    setWatchLater(newArray);
  }

  return (
    <div className="add-toaster">
      <button
        onClick={() => {
          isWatched
            ? deleteWatchedHandler(movie.imdbID)
            : addHandler(onWatched);
        }}
        className={isWatched ? `clicked-button` : ``}
        disabled={isWatchLater}
      >
        Watched
      </button>
      <button
        onClick={() => {
          isWatchLater
            ? deleteWatchLaterHandler(movie.imdbID)
            : addHandler(onLater);
        }}
        className={isWatchLater ? `clicked-button` : ``}
        disabled={isWatched}
      >
        Watch later
      </button>
    </div>
  );
}

export default HomePage;
