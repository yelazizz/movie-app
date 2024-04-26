import "./NavBar.css";
import logo from "../public/coffee.png";
import film from "../public/film.png";
import heart from "../public/heart.png";
import trending from "../public/trending-up.png";
import calendar from "../public/calendar.png";
import { Link, NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav className="main-nav">
      <span className="logo">
        <img src={logo} alt="" />
        Watch
      </span>
      <ul className="nav-list">
        <li className="nav-item">
          <img src={film} alt="" />
          <NavLink className="nav-link" to="/">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <img src={heart} alt="" />
          <NavLink className="nav-link" to="/favourites">
            Favourites
          </NavLink>
        </li>
        <li className="nav-item">
          <img src={trending} alt="" />
          <NavLink className="nav-link" to="/list">
            My List
          </NavLink>
        </li>
        <li className="nav-item">
          <img src={calendar} alt="" />
          <NavLink className="nav-link" to="/watchlater">
            Watch later
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
