import React from "react";
import "./Auth.scss";
import axios from "axios";
import { useState } from "react";
import { setGuest } from "../../redux/authReducer";
import { useDispatch } from "react-redux";

const Auth = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleRegister = () => {
    if (username === "") {
      alert("Please enter a Username and Password to Register");
    } else {
      axios
        .post("/api/auth/register", { username, password })
        .then((res) => {
          dispatch(setGuest(res.data));
          props.history.push("/welcome");
        })
        .catch((err) => {
          alert(`${err}: An account already exists with these credentials`);
          setUsername("");
          setPassword("");
        });
    }
  };

  const handleLogin = () => {
    if (username === "") {
      alert("Please enter a Username and Password to Login");
    } else {
      axios
        .post("/api/auth/login", { username, password })
        .then((res) => {
          dispatch(setGuest(res.data));
          props.history.push("/welcome");
        })
        .catch((err) => {
          alert(`${err}: Seems like you entered something incorrectly`);
          setUsername("");
          setPassword("");
        });
    }
  };

  return (
    <div className="auth">
      <div></div>
      <h1 className="header">We had a wedding!</h1>
      <div></div>
      <div className="login">
        <h2>And you're invited!</h2>
        <h3>Please login below to attend!</h3>
        <form className="form">
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div>
            <button type="submit" onClick={handleLogin}>
              Login
            </button>
            <button type="submit" onClick={handleRegister}>
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
