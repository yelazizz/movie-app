import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./NavBar";
import HomePage from "./pages/home/HomePage";
import Favourites from "./pages/favourites/Favourites";
import WatchLater from "./pages/watch-later/WatchLater";
import List from "./pages/list/List";
import { useEffect, useState } from "react";

function App() {
  //const [watchedMovies, setWatchedMovies] = useState([]);
  const [watchedMovies, setWatchedMovies] = useState(function () {
    const watchedStore = localStorage.getItem("watchedMovies");
    return watchedStore ? JSON.parse(watchedStore) : [];
  });
  const [favouriteMovies, setFavouriteMovies] = useState(function () {
    const favouriteStore = localStorage.getItem("favouriteMovies");
    return favouriteStore ? JSON.parse(favouriteStore) : [];
  });
  const [watchLater, setWatchLater] = useState(function () {
    const laterStore = localStorage.getItem("watchLater");
    return laterStore ? JSON.parse(laterStore) : [];
  });

  useEffect(
    function () {
      localStorage.setItem("watchedMovies", JSON.stringify(watchedMovies));
    },
    [watchedMovies]
  );
  useEffect(
    function () {
      localStorage.setItem("favouriteMovies", JSON.stringify(favouriteMovies));
    },
    [favouriteMovies]
  );
  useEffect(
    function () {
      localStorage.setItem("watchLater", JSON.stringify(watchLater));
    },
    [watchLater]
  );

  return (
    <div className="main-wrapper">
      <BrowserRouter>
        <NavBar></NavBar>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                setWatchedMovies={setWatchedMovies}
                setFavouriteMovies={setFavouriteMovies}
                favouriteMovies={favouriteMovies}
                setWatchLater={setWatchLater}
                watchedMovies={watchedMovies}
                watchLater={watchLater}
              />
            }
          />
          <Route
            path="/favourites"
            element={
              <Favourites
                favouriteMovies={favouriteMovies}
                setFavouriteMovies={setFavouriteMovies}
              />
            }
          />
          <Route
            path="/list"
            element={
              <List
                watchedMovies={watchedMovies}
                setWatchedMovies={setWatchedMovies}
              />
            }
          />
          <Route
            path="/watchlater"
            element={
              <WatchLater
                setWatchedMovies={setWatchedMovies}
                setFavouriteMovies={setFavouriteMovies}
                favouriteMovies={favouriteMovies}
                setWatchLater={setWatchLater}
                watchedMovies={watchedMovies}
                watchLater={watchLater}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function Mmds() {
  return (
    <div className="main-wrapper">
      <NavBar></NavBar>
      <HomePage></HomePage>
    </div>
  );
}

export default App;
