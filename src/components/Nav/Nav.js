import React, { useState, useEffect } from "react";
import "./Nav.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authReducer";
import { setGuest } from "../../redux/authReducer";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import axios from "axios";

const Nav = (props) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { guest } = useSelector((store) => store.authReducer);

  const [showMenu, setShowmenu] = useState(false);

  useEffect(() => {
    axios
      .get("/api/auth/guest")
      .then((res) => {
        dispatch(setGuest(res.data));
      })
      .catch((err) => console.log(err));
  }, [dispatch]);

  const uselogout = () => {
    axios.post("/api/auth/logout").then((_) => {
      dispatch(logout());
      setShowmenu(false);
    });
  };

  return (
    location.pathname !== "/" &&
    location.pathname !== "/logout" && (
      <div className="nav">
        <div>Welcome {guest?.username}!</div>

        <ul className="nav-main">
          {location.pathname !== "/welcome" && (<Link to="/welcome">
            <button className="navbutton">
              <li>Welcome</li>
            </button>
          </Link>)}
          {guest?.is_admin && 
            location.pathname !== "/create_post" &&(
            <Link to="/create_post">
              <button className="navbutton">
                <li>Create Post</li>
              </button>
            </Link>
          )}
          {location.pathname !== "/posts" && (<Link to="/posts">
            <button className="navbutton">
              <li>Posts</li>
            </button>
          </Link>)}
          {location.pathname !== "/guestbook" && (<Link to="/guestbook">
            <button className="navbutton">
              <li>Guest Book</li>
            </button>
          </Link>)}
          {location.pathname !== "/guests" && (<Link to="/guests">
            <button className="navbutton">
              <li>Guest Info</li>
            </button>
          </Link>)}
        </ul>
        <ul className={`nav-drop ${showMenu ? "show" : ""}`}>
        {location.pathname !== "/welcome" && (<Link to="/welcome" onClick={() => setShowmenu(!showMenu)}>
            <li>Welcome</li>
          </Link>)}
          {guest?.is_admin && 
            location.pathname !== "/create_post" && (<Link to="/create_post" onClick={() => setShowmenu(!showMenu)}>
              <li>Create Post</li>
            </Link>)}
          {location.pathname !== "/posts" && (<Link to="/posts" onClick={() => setShowmenu(!showMenu)}>
            <li>Posts</li>
          </Link>)}
          {location.pathname !== "/guestbook" && (<Link to="/guestbook" onClick={() => setShowmenu(!showMenu)}>
            <li>Guest Book</li>
          </Link>)}
          {location.pathname !== "/guests" && (<Link to="/guests" onClick={() => setShowmenu(!showMenu)}>
            <li>Guest Info</li>
          </Link>)}
          {location.pathname !== "/logout" && (<Link to="/logout" onClick={uselogout}>
            <button>
              <FontAwesomeIcon icon="sign-out-alt" />
            </button>
          </Link>)}
        </ul>
        <div className="nav-main">
          Logout: <Link to="/logout" onClick={uselogout}>
            <button>
              <FontAwesomeIcon icon="sign-out-alt" />
            </button>
          </Link>
        </div>
        <button onClick={() => setShowmenu(!showMenu)} className="burger">
          <FontAwesomeIcon icon="bars" />
        </button>
      </div>
    )
  );
};

export default Nav;
