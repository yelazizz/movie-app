import { useEffect, useState } from "react";
import "./List.css";
import { Details } from "../home/HomePage";

import binIcon from "./list-img/bin.png";
import commentIcon from "./list-img/comment.png";
import ReviewModal from "./ReviewModal";

function List({ watchedMovies, setWatchedMovies }) {
  const [selectedId, setSelectedId] = useState();
  const [sortList, setSortList] = useState("");

  function onSortByImdb() {
    setSortList("onSortByRating");
  }

  function onSortByScore() {
    setSortList("onSortByScore");
  }

  // const onlyMovies = watchedMovies.map((movie, index) => {
  //   if (movie.Type === "movie") {
  //     return (
  //       <MyMovieItem
  //         key={movie.imdbID}
  //         movie={movie}
  //         index={index}
  //         selectedIdHandler={selectedIdHandler}
  //         deleteWatchedMovie={deleteWatchedMovie}
  //         watchedMovies={watchedMovies}
  //       ></MyMovieItem>
  //     );
  //   } else {
  //     return;
  //   }
  // });

  const sortByScore = watchedMovies
    .sort((a, b) => (a.MyScore > b.MyScore ? -1 : 1))
    .map((movie, index) => (
      <MyMovieItem
        key={movie.imdbID}
        movie={movie}
        index={index}
        selectedIdHandler={selectedIdHandler}
        deleteWatchedMovie={deleteWatchedMovie}
        watchedMovies={watchedMovies}
      ></MyMovieItem>
    ));

  const sortByImdb = watchedMovies
    .sort((a, b) => (a.imdbRating > b.imdbRating ? -1 : 1))
    .map((movie, index) => (
      <MyMovieItem
        key={movie.imdbID}
        movie={movie}
        index={index}
        selectedIdHandler={selectedIdHandler}
        deleteWatchedMovie={deleteWatchedMovie}
        watchedMovies={watchedMovies}
      ></MyMovieItem>
    ));

  function selectedIdHandler(id) {
    setSelectedId(id);
  }
  function closeMovieDetails() {
    setSelectedId(null);
  }

  function deleteWatchedMovie(id) {
    setWatchedMovies((movies) => movies.filter((movie) => movie.imdbID != id));
  }

  return (
    <>
      <div className="my-list-section">
        <h1>My List</h1>
        {!selectedId && (
          <div className="list-description">
            <div className="position-image">
              <span>#</span>
              <span>Image</span>
              <span className="my-movie-title top-title">Title</span>
            </div>
            <div className="personal-rates">
              <span>Type</span>

              <span className="movie-score" onClick={() => onSortByScore()}>
                Score
              </span>
              <span className="movie-rating" onClick={() => onSortByImdb()}>
                imdbRating
              </span>
              <span>Review</span>
            </div>
          </div>
        )}
        {selectedId ? (
          <Details
            selectedId={selectedId}
            closeMovieDetails={closeMovieDetails}
          />
        ) : (
          <ul className="my-list-of-movies">
            {sortList === "onSortByScore" && sortByScore}
            {sortList === "" && sortByScore}
            {sortList === "onSortByRating" && sortByImdb}
          </ul>
        )}
      </div>
    </>
  );
}

function MyMovieItem({
  movie,
  index,
  selectedIdHandler,
  deleteWatchedMovie,
  watchedMovies,
}) {
  const [selectorShow, setSelectorShow] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  function onModalOpen() {
    setModalOpen(!modalOpen);
  }

  //const [myScore, setMyScore] = useState(0);

  const [myScore, setMyScore] = useState(function () {
    const scoreStore = localStorage.getItem(`${movie.imdbID}`);
    return scoreStore ? JSON.parse(scoreStore) : 0;
  });
  useEffect(
    function () {
      localStorage.setItem(`${movie.imdbID}`, JSON.stringify(myScore));
    },
    [myScore]
  );

  useEffect(
    function () {
      const newArray = watchedMovies.map((item) => {
        if (item.imdbID === movie.imdbID) {
          item["MyScore"] = myScore;
          return item;
        } else return item;
      });
      localStorage.setItem("watchedMovies", JSON.stringify(newArray));
    },
    [myScore]
  );

  return (
    <div>
      {modalOpen && (
        <ReviewModal
          onModalOpen={onModalOpen}
          watchedMovies={watchedMovies}
          movieID={movie.imdbID}
          movieReview={movie.Review}
        />
      )}
      <li className="my-list-item">
        <div className="position-image">
          <span>{index + 1}</span>
          <span>
            <img className="my-movie-list-image" src={movie.Poster} alt="" />
          </span>
          <span
            className="my-movie-title"
            onClick={() => selectedIdHandler(movie.imdbID)}
          >
            {movie.Title}
          </span>
        </div>
        <div className="personal-rates">
          <span>{movie.Type}</span>
          {selectorShow ? (
            <select
              value={myScore}
              onChange={(e) => setMyScore(e.target.value)}
              name=""
              id="selectvalue"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          ) : (
            <span
              className="my-score"
              onClick={() => setSelectorShow(!selectorShow)}
            >
              {movie.MyScore}
            </span>
          )}
          <span>{movie.imdbRating}</span>
          <div className="delete-comment">
            <button onClick={() => setModalOpen(!modalOpen)}>
              <img src={commentIcon} alt="" />
            </button>
            <button
              onClick={() => {
                deleteWatchedMovie(movie.imdbID);
                localStorage.removeItem(`${movie.imdbID}`);
              }}
            >
              <img src={binIcon} alt="" />
            </button>
          </div>
        </div>
      </li>
    </div>
  );
}

export default List;
