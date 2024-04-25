import React, { useContext } from "react";
import "./navbar.css";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../../Context/UserContext";
import PostContext from "../../Context/PostContext";

const navItems = [
  { page: "home", link: "/" },
  { page: "profile", link: "/profile" },
];

function Navbar() {
  const { user } = useContext(UserContext);
  const {logout}=useContext(PostContext)
  return (
    <>
      <nav className="nav-wrapper">
        <h1 className="font1">Blog</h1>
        <ul>
          {navItems.map((ele) => (
            <NavLink key={ele.link} to={ele.link}>
              <li>{ele.page}</li>
            </NavLink>
          ))}
        </ul>
        <div>
          {user ? (
            <div className="dropdown">
              <img
                className="icon"
                src="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"
                alt=""
              />
              <div className="dropdown-content">
                <a href="#" onClick={logout}>Logout</a>
              </div>
            </div>
          ) : (
            <Link to="/login">
              <i className="fa-solid fa-right-to-bracket"></i>
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
