import React, { useContext } from "react";
import Logo from "../img/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleWriteClick = () => {
    if (currentUser) {
      navigate("/write");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="Logo" />
          </Link>
        </div>
        <div className="links">
          <Link className="link" to="/?cat=art">
            <h6>ART</h6>
          </Link>
          <Link className="link" to="/?cat=movie">
            <h6>MOVIE</h6>
          </Link>
          <Link className="link" to="/?cat=news">
            <h6>NEWS</h6>
          </Link>
          <Link className="link" to="/?cat=design">
            <h6>DESIGN</h6>
          </Link>
          <Link className="link" to="/?cat=technology">
            <h6>TECHNOLOGY</h6>
          </Link>
          <Link className="link" to="/?cat=science">
            <h6>SCIENCE</h6>
          </Link>

          {currentUser ? (
            <Link className="link" to={`/user/${currentUser.id}`}>
              <span>{currentUser.username}</span>
            </Link>
          ) : (
            <Link className="link" to="/login">
              Login
            </Link>
          )}
          {currentUser && <span onClick={logout}>Logout</span>}
          <span className="write" onClick={handleWriteClick}>
            Write
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
